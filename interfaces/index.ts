export interface ITicker {
  symbol: string,
  priceChange: string,
  priceChangePercent: string,
  lastPrice: number,
  volume: string,
  highPrice: number,
  lowPrice: number,
}

export interface ISymbol {
  symbol: string,
  name: string,
  fullName: string,
  logo: string,
  price: number,
  volume: string,
  rank: number,
  tags: string[],
}

export interface IToken extends ISymbol {
  priceChangePercent: string,
  highPrice: number,
  lowPrice: number,
}

export interface ITag {
  name: string,
  tag: string,
  icon: 'star' | 'bank' | 'deviantart' | 'gamepad' | 'lightbulb-o' | 'users' | 'inbox' | 'globe' | 'certificate'
}

export interface IModalData {
  key: string,
  text: string
}
