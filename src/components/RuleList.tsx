import { FC, useState } from 'react';

interface Currency {
    id: string;
    name: string;
    symbol: string;
}

interface Rule {
    id: string;
    baseCurrency: Currency;
    targetCurrency: Currency;
    percentage: number;
    isActive: boolean;
    type: string;
}

interface RuleListProps {
    rules: Rule[];
    onRulesChange: () => void;
}

const mockCurrencies = {
    'USD': { id: '1', name: 'US Dollar', symbol: '$' },
    'EUR': { id: '2', name: 'Euro', symbol: '€' },
    'GBP': { id: '3', name: 'British Pound', symbol: '£' },
    'JPY': { id: '4', name: 'Japanese Yen', symbol: '¥' },
};

const mockRules: Rule[] = [
    {
        id: '1',
        baseCurrency: mockCurrencies['USD'],
        targetCurrency: mockCurrencies['EUR'],
        percentage: 5,
        isActive: true,
        type: 'INCREASE'
    },
    {
        id: '2',
        baseCurrency: mockCurrencies['GBP'],
        targetCurrency: mockCurrencies['JPY'],
        percentage: 3,
        isActive: false,
        type: 'DECREASE'
    }
];

const RuleList: FC<RuleListProps> = ({ onRulesChange }) => {
    const [rules, setRules] = useState<Rule[]>(mockRules);

    const toggleRuleActive = (ruleId: string) => {
        const updatedRules = rules.map(rule =>
            rule.id === ruleId
                ? { ...rule, isActive: !rule.isActive }
                : rule
        );

        setRules(updatedRules);
        onRulesChange();
    };

    return (
        <div>
            <h2>Your Rules</h2>
            {rules.map((rule) => (
                <div key={rule.id}>
                    <p>
                        {rule.baseCurrency.name} → {rule.targetCurrency.name}
                        Change: {rule.percentage}% |
                        Status: {rule.isActive ? 'Active' : 'Inactive'}
                        <button onClick={() => toggleRuleActive(rule.id)}>
                            Toggle
                        </button>
                    </p>
                </div>
            ))}
        </div>
    );
};

export default RuleList;