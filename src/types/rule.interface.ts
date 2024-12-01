interface Currency {
    id: string;
    name: string;
    symbol: string;
}

export interface Rule {
    id: string;
    baseCurrency: Currency;
    targetCurrency: Currency;
    percentage: number;
    isActive: boolean;
    type: string;
}