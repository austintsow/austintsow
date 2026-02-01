import React, { useState, useEffect } from 'react';
import './Ticker.css';

// Crypto symbols — fetched via CoinGecko (free, native CORS)
const cryptoSymbols = [
    { id: 'bitcoin', display: 'BTC' },
    { id: 'ethereum', display: 'ETH' },
    { id: 'solana', display: 'SOL' },
];

// Stock/ETF symbols — fetched via Yahoo Finance through allorigins proxy
const stockSymbols = [
    { symbol: 'COIN', name: 'Coinbase' },
    { symbol: 'MSTR', name: 'MicroStrategy' },
    { symbol: 'MSFT', name: 'Microsoft' },
    { symbol: 'NVDA', name: 'NVIDIA' },
    { symbol: 'SHOP', name: 'Shopify' },
    { symbol: 'TSLA', name: 'Tesla' },
    { symbol: 'AAPL', name: 'Apple' },
    { symbol: 'V', name: 'Visa' },
    { symbol: 'VOO', name: 'Vanguard S&P 500' },
    { symbol: 'QQQ', name: 'Nasdaq 100' }
];

const allDisplaySymbols = [
    ...cryptoSymbols.map(c => c.display),
    ...stockSymbols.map(s => s.symbol),
];

// Fetch crypto prices from CoinGecko (single request, native CORS)
async function fetchCryptoPrices() {
    const ids = cryptoSymbols.map(c => c.id).join(',');
    const url = `https://api.coingecko.com/api/v3/simple/price?ids=${ids}&vs_currencies=usd&include_24hr_change=true`;
    const response = await fetch(url);
    if (!response.ok) throw new Error(`CoinGecko HTTP ${response.status}`);
    const data = await response.json();

    return cryptoSymbols.map(({ id, display }) => {
        const coin = data[id];
        if (coin) {
            return {
                displaySymbol: display,
                price: coin.usd,
                change: coin.usd_24h_change || 0,
            };
        }
        return null;
    });
}

// Fetch a single stock price from Yahoo Finance via allorigins proxy (with retry)
async function fetchStockPrice(symbol) {
    const yahooUrl = `https://query1.finance.yahoo.com/v8/finance/chart/${symbol}?range=1d&interval=1d`;
    for (let attempt = 0; attempt < 3; attempt++) {
        try {
            const proxyUrl = `https://api.allorigins.win/get?url=${encodeURIComponent(yahooUrl)}`;
            const response = await fetch(proxyUrl);
            if (!response.ok) throw new Error(`Proxy HTTP ${response.status}`);
            const wrapper = await response.json();
            const data = JSON.parse(wrapper.contents);

            const meta = data?.chart?.result?.[0]?.meta;
            if (meta && meta.regularMarketPrice) {
                const price = meta.regularMarketPrice;
                const previousClose = meta.chartPreviousClose;
                const change = previousClose
                    ? ((price - previousClose) / previousClose) * 100
                    : 0;
                return { displaySymbol: symbol, price, change };
            }
            return null;
        } catch (err) {
            if (attempt < 2) {
                console.warn(`Retry ${attempt + 1} for ${symbol}: ${err.message}`);
                await new Promise(r => setTimeout(r, 300 * (attempt + 1)));
            } else {
                throw err;
            }
        }
    }
}

// Fetch all stock prices with staggered requests to avoid proxy rate limits
async function fetchAllStockPrices() {
    const results = [];
    for (const { symbol } of stockSymbols) {
        try {
            const result = await fetchStockPrice(symbol);
            results.push(result);
        } catch (err) {
            console.warn(`Failed to fetch ${symbol}:`, err.message);
            results.push(null);
        }
        // Delay between requests to avoid proxy rate limiting
        await new Promise(r => setTimeout(r, 300));
    }
    return results;
}

function Ticker() {
    const initialData = allDisplaySymbols.map(sym => ({
        displaySymbol: sym,
        price: null,
        change: null,
    }));

    const [stockData, setStockData] = useState(initialData);

    const fetchAllPrices = async () => {
        try {
            // Fetch crypto and stocks in parallel
            const [cryptoResults, stockResults] = await Promise.all([
                fetchCryptoPrices().catch(err => {
                    console.error('CoinGecko error:', err.message);
                    return cryptoSymbols.map(() => null);
                }),
                fetchAllStockPrices(),
            ]);

            const allResults = [...cryptoResults, ...stockResults];
            const successCount = allResults.filter(r => r !== null).length;
            console.log(`Successfully fetched ${successCount}/${allDisplaySymbols.length} prices`);

            setStockData(prev =>
                prev.map((stock, i) => (allResults[i] !== null ? allResults[i] : stock))
            );
        } catch (error) {
            console.error('Error fetching prices:', error);
        }
    };

    useEffect(() => {
        fetchAllPrices();
        const interval = setInterval(fetchAllPrices, 60000);
        return () => clearInterval(interval);
    }, []);

    const formatPrice = (price) => {
        return price !== null ? `$${price.toFixed(2)}` : 'N/A';
    };

    const formatChange = (change) => {
        if (change === null) return 'N/A';
        const sign = change >= 0 ? '+' : '';
        return `${sign}${change.toFixed(2)}%`;
    };

    return (
        <div className="ticker-container">
            {/* Stock Ticker - Fast */}
            <div className="ticker-wrapper ticker-fast">
                <div className="ticker-track">
                    {[...stockData, ...stockData, ...stockData, ...stockData].map((stock, index) => (
                        <div key={`stock-${index}`} className="ticker-item stock-item">
                            <span className="ticker-symbol">{stock.displaySymbol}</span>
                            <span className="ticker-price">{formatPrice(stock.price)}</span>
                            <span className={`ticker-change ${
                                stock.change === null ? 'neutral' :
                                stock.change >= 0 ? 'positive' : 'negative'
                            }`}>
                                {formatChange(stock.change)}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Ticker;
