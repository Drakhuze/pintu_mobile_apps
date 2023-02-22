export const API = {
  symbolList: 'https://www.binance.com/bapi/composite/v1/public/marketing/symbol/list',
  ticker: 'https://api.binance.com/api/v3/ticker/24hr',
};

export const TAGS = [
  { tag: '', name: 'Terbaru' },
  { tag: 'defi', name: 'DeFi' },
  { tag: 'NFT', name: 'NFT' },
  { tag: 'Gaming', name: 'Gaming' },
  { tag: 'innovation-zone', name: 'Innovation' },
  { tag: 'fan_token', name: 'Fan Token' },
  { tag: 'storage-zone', name: 'Storage' },
  { tag: 'Polkadot', name: 'Polkadot' },
  { tag: 'pos', name: 'POS' },
  { tag: 'pow', name: 'POW' },
  { tag: 'Launchpad', name: 'Launchpad' },
  { tag: 'Launchpool', name: 'Launchpool' },
  { tag: 'BSC', name: 'BSC' },
  { tag: 'ETF', name: 'ETF' },
];

export const USD_TO_IDR_DEFAULT = 15197.10; // Based on USD in 22/02/2023 19:00
export const REFETCH_INTERVAL = 3000;
