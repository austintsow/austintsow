import React from 'react';
import { render, screen, waitFor, act } from '@testing-library/react';
import Ticker from './Ticker';

// ─── Mock Helpers ────────────────────────────────────────────────────────────

const MOCK_CRYPTO = {
    bitcoin:  { usd: 65000.00, usd_24h_change:  2.50 },
    ethereum: { usd:  3200.00, usd_24h_change: -1.50 },
    solana:   { usd:   150.00, usd_24h_change:  0.00 },
};

function mockYahooContents(price, previousClose) {
    return JSON.stringify({
        chart: {
            result: [{ meta: { regularMarketPrice: price, chartPreviousClose: previousClose } }]
        }
    });
}

function setupFetchMock({ cryptoOk = true, stockOk = true } = {}) {
    return jest.spyOn(global, 'fetch').mockImplementation((url) => {
        if (url.includes('coingecko.com')) {
            if (!cryptoOk) return Promise.reject(new Error('CoinGecko down'));
            return Promise.resolve({ ok: true, json: () => Promise.resolve(MOCK_CRYPTO) });
        }
        if (url.includes('allorigins.win')) {
            if (!stockOk) return Promise.reject(new Error('Proxy down'));
            return Promise.resolve({
                ok: true,
                json: () => Promise.resolve({ contents: mockYahooContents(200.00, 190.00) })
            });
        }
        return Promise.reject(new Error(`Unexpected URL: ${url}`));
    });
}

// Advance fake timers in 300ms steps, flushing microtasks between each tick.
// This mirrors the 300ms stagger delay between each stock request.
async function drainTimers(steps = 15) {
    for (let i = 0; i < steps; i++) {
        jest.advanceTimersByTime(300);
        await act(async () => {});
    }
}

// ─── Setup / Teardown ────────────────────────────────────────────────────────

beforeEach(() => jest.useFakeTimers());
afterEach(() => {
    jest.useRealTimers();
    jest.restoreAllMocks();
});

// ─── Tests ───────────────────────────────────────────────────────────────────

describe('Ticker — initial render', () => {
    test('renders all crypto symbols', () => {
        setupFetchMock();
        render(<Ticker />);
        expect(screen.getAllByText('BTC').length).toBeGreaterThan(0);
        expect(screen.getAllByText('ETH').length).toBeGreaterThan(0);
        expect(screen.getAllByText('SOL').length).toBeGreaterThan(0);
    });

    test('renders all stock symbols', () => {
        setupFetchMock();
        render(<Ticker />);
        ['COIN', 'MSTR', 'MSFT', 'NVDA', 'SHOP', 'TSLA', 'AAPL', 'V', 'VOO', 'QQQ'].forEach(sym => {
            expect(screen.getAllByText(sym).length).toBeGreaterThan(0);
        });
    });

    test('shows N/A for prices before data loads', () => {
        // fetch never resolves — simulates slow network
        jest.spyOn(global, 'fetch').mockImplementation(() => new Promise(() => {}));
        render(<Ticker />);
        const naItems = screen.getAllByText('N/A');
        // 13 symbols × 4 duplicates = 52 price placeholders + 52 change placeholders
        expect(naItems.length).toBeGreaterThanOrEqual(13);
    });
});

describe('Ticker — fetch behaviour', () => {
    test('calls fetch immediately on mount', () => {
        const fetchMock = setupFetchMock();
        render(<Ticker />);
        expect(fetchMock).toHaveBeenCalled();
    });

    test('fetches CoinGecko endpoint for crypto data', () => {
        const fetchMock = setupFetchMock();
        render(<Ticker />);
        const coingeckoCalls = fetchMock.mock.calls.filter(([url]) =>
            url.includes('coingecko.com')
        );
        expect(coingeckoCalls.length).toBeGreaterThan(0);
    });

    test('fetches Yahoo Finance via allorigins proxy for stock data', () => {
        const fetchMock = setupFetchMock();
        render(<Ticker />);
        const proxyCalls = fetchMock.mock.calls.filter(([url]) =>
            url.includes('allorigins.win')
        );
        expect(proxyCalls.length).toBeGreaterThan(0);
    });

    test('refetches all prices after 60 seconds', async () => {
        const fetchMock = setupFetchMock();
        render(<Ticker />);

        const initialCalls = fetchMock.mock.calls.length;

        // drain initial load, then trigger the 60-second interval
        await drainTimers(15);
        jest.advanceTimersByTime(60000);
        await act(async () => {});

        expect(fetchMock.mock.calls.length).toBeGreaterThan(initialCalls);
    });
});

describe('Ticker — data display', () => {
    test('displays formatted crypto price after load', async () => {
        setupFetchMock();
        render(<Ticker />);
        await drainTimers();

        await waitFor(() => {
            expect(screen.getAllByText('$65000.00').length).toBeGreaterThan(0);
        });
    });

    test('displays formatted stock price after load', async () => {
        setupFetchMock();
        render(<Ticker />);
        await drainTimers();

        await waitFor(() => {
            expect(screen.getAllByText('$200.00').length).toBeGreaterThan(0);
        });
    });

    test('shows positive change with + prefix', async () => {
        setupFetchMock();
        render(<Ticker />);
        await drainTimers();

        await waitFor(() => {
            // BTC has +2.50% change from mock data
            expect(screen.getAllByText('+2.50%').length).toBeGreaterThan(0);
        });
    });

    test('shows negative change with - prefix', async () => {
        setupFetchMock();
        render(<Ticker />);
        await drainTimers();

        await waitFor(() => {
            // ETH has -1.50% change from mock data
            expect(screen.getAllByText('-1.50%').length).toBeGreaterThan(0);
        });
    });

    test('applies .positive class for gains', async () => {
        setupFetchMock();
        render(<Ticker />);
        await drainTimers();

        await waitFor(() => {
            expect(document.querySelectorAll('.ticker-change.positive').length).toBeGreaterThan(0);
        });
    });

    test('applies .negative class for losses', async () => {
        setupFetchMock();
        render(<Ticker />);
        await drainTimers();

        await waitFor(() => {
            expect(document.querySelectorAll('.ticker-change.negative').length).toBeGreaterThan(0);
        });
    });

    test('applies .neutral class before data loads', () => {
        jest.spyOn(global, 'fetch').mockImplementation(() => new Promise(() => {}));
        render(<Ticker />);
        expect(document.querySelectorAll('.ticker-change.neutral').length).toBeGreaterThan(0);
    });
});

describe('Ticker — resilience', () => {
    test('keeps N/A display when all fetches fail', async () => {
        setupFetchMock({ cryptoOk: false, stockOk: false });
        render(<Ticker />);
        await drainTimers();

        await waitFor(() => {
            expect(screen.getAllByText('N/A').length).toBeGreaterThan(0);
        });
    });

    test('still renders when only crypto fetch fails', async () => {
        setupFetchMock({ cryptoOk: false, stockOk: true });
        render(<Ticker />);
        await drainTimers();

        await waitFor(() => {
            // Stock prices should load fine
            expect(screen.getAllByText('$200.00').length).toBeGreaterThan(0);
        });
    });
});
