import { FC, useState, useEffect } from 'react';
import RuleList from "../components/RuleList.tsx";
import RuleForm from "../components/RuleForm.tsx";

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
    email: string;
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
        type: 'INCREASE',
        email: 'user@example.com'
    },
    {
        id: '2',
        baseCurrency: mockCurrencies['GBP'],
        targetCurrency: mockCurrencies['JPY'],
        percentage: 3,
        isActive: false,
        type: 'DECREASE',
        email: 'user@example.com'
    }
];

const RulesPage: FC = () => {
    const [email] = useState(localStorage.getItem('userEmail'));
    const [rules, setRules] = useState<Rule[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const loadRules = () => {
            setTimeout(() => {
                setRules(mockRules.filter(rule => rule.email === email));
                setIsLoading(false);
            }, 500);
        };

        if (email) {
            loadRules();
        } else {
            setIsLoading(false);
        }
    }, [email]);

    const handleRulesChange = () => {
        console.log('Rules updated');
    };

    if (!email) {
        return (
            <div>
                <h2>Please login first to manage your rules.</h2>
            </div>
        );
    }

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h1>Manage Your Rules</h1>
            {rules.length === 0 ? (
                <p>No rules found. Create your first rule!</p>
            ) : (
                <RuleList
                    rules={rules}
                    onRulesChange={handleRulesChange}
                />
            )}
            <RuleForm
                onRuleAdded={handleRulesChange}
                email={email}
            />
        </div>
    );
};

export default RulesPage;