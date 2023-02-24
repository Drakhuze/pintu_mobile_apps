export const API = {
  symbolList: 'https://www.binance.com/bapi/composite/v1/public/marketing/symbol/list',
  ticker: 'https://api.binance.com/api/v3/ticker/24hr',
};

export const TAGS = [
  { tag: '', name: 'All', icon: 'star' },
  { tag: 'defi', name: 'DeFi', icon: 'bank' },
  { tag: 'NFT', name: 'NFT', icon: 'deviantart' },
  { tag: 'Gaming', name: 'Gaming', icon: 'gamepad' },
  { tag: 'innovation-zone', name: 'Innovation', icon: 'lightbulb-o' },
  { tag: 'fan_token', name: 'Fan Token', icon: 'users' },
  { tag: 'storage-zone', name: 'Storage', icon: 'inbox' },
  { tag: 'pos', name: 'POS', icon: 'globe' },
  { tag: 'pow', name: 'POW', icon: 'certificate' },
];

export const SORT_OPTION = [
  { key: 'default', label: 'Default' },
  { key: 'gainer', label: 'Gainers' },
  { key: 'price', label: 'Price' },
  { key: 'volume', label: 'Volume' },
];

export const USD_TO_IDR_DEFAULT = 15197.10; // Based on USD in 22/02/2023 19:00
export const REFETCH_INTERVAL = 5000;
