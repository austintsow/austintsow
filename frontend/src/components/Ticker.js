import React, { useState, useEffect } from 'react';
import './Ticker.css';

// Ticker symbols to track
const symbols = [
    { symbol: 'BTC-USD', name: 'Bitcoin', display: 'BTC' },
    { symbol: 'ETH-USD', name: 'Ethereum', display: 'ETH' },
    { symbol: 'SOL-USD', name: 'Solana', display: 'SOL' },
    { symbol: 'COIN', name: 'Coinbase' },
    { symbol: 'MSTR', name: 'MicroStrategy' },
    { symbol: 'MSFT', name: 'Microsoft' },
    { symbol: 'NVDA', name: 'NVIDIA' },
    { symbol: 'SHOP', name: 'Shopify' },
    { symbol: 'TSLA', name: 'Tesla' },
    { symbol: 'AAPL', name: 'Apple' },
    { symbol: 'VOO', name: 'Vanguard S&P 500' },
    { symbol: 'QQQ', name: 'Nasdaq 100' }
];

function Ticker() {
    // Initialize with N/A placeholders
    const initialData = symbols.map(({ symbol, display }) => ({
        symbol: symbol,
        displaySymbol: display || symbol,
        price: null,
        change: null
    }));
    
    const [stockData, setStockData] = useState(initialData);

    // Fetch real stock prices
    const fetchStockPrices = async () => {
        try {
            const promises = symbols.map(async ({ symbol, display }) => {
                try {
                    // Using Yahoo Finance API with CORS proxy
                    const response = await fetch(
                        `https://corsproxy.io/?https://query1.finance.yahoo.com/v8/finance/chart/${symbol}?interval=1d&range=1d`
                    );
                    const data = await response.json();
                    
                    if (data.chart.result && data.chart.result[0]) {
                        const quote = data.chart.result[0];
                        const meta = quote.meta;
                        const price = meta.regularMarketPrice;
                        const prevClose = meta.chartPreviousClose || meta.previousClose;
                        const change = prevClose ? ((price - prevClose) / prevClose) * 100 : 0;
                        
                        return {
                            symbol: symbol,
                            displaySymbol: display || symbol,
                            price: price,
                            change: change
                        };
                    }
                    return null;
                } catch (err) {
                    console.error(`Error fetching ${symbol}:`, err.message);
                    return null;
                }
            });

            const results = await Promise.all(promises);
            const successCount = results.filter(r => r !== null).length;
            console.log(`Successfully fetched ${successCount}/${symbols.length} stock prices`);
            
            // Merge results with existing data, keeping N/A for failed fetches
            setStockData(prevData => 
                prevData.map((stock, index) => {
                    const result = results[index];
                    return result !== null ? result : stock;
                })
            );
        } catch (error) {
            console.error('Error fetching stock data:', error);
            // Keep existing data on error
        }
    };

    useEffect(() => {
        fetchStockPrices();
        
        // Refresh prices every 60 seconds
        const interval = setInterval(() => {
            fetchStockPrices();
        }, 60000);

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
