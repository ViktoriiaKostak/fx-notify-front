import {FC, useState} from 'react';
import { Typography, Box } from '@mui/material';
import RuleList from '../components/RuleList';
import RuleForm from '../components/RuleForm';
import { Rule } from "../types/rule.interface.ts";

const MOCK_CURRENCIES = ['USD', 'EUR', 'BTC', 'ETH', 'JPY', 'GBP'];

const MOCK_RULES: Rule[] = [
    {
        id: '1',
        baseCurrency: { id: 'USD', name: 'US Dollar', symbol: '$' },
        targetCurrency: { id: 'EUR', name: 'Euro', symbol: '€' },
        percentage: 5,
        isActive: true,
        type: 'INCREASE'
    },
    {
        id: '2',
        baseCurrency: { id: 'BTC', name: 'Bitcoin', symbol: '₿' },
        targetCurrency: { id: 'USD', name: 'US Dollar', symbol: '$' },
        percentage: 3,
        isActive: false,
        type: 'DECREASE'
    }
];

interface WebAppUser {
    id: string;
    first_name?: string;
    last_name?: string;
    username?: string;
    language_code?: string;
}

interface RulesPageProps {
    telegramUser: WebAppUser;
}

const RulesPage: FC<RulesPageProps> = ({ telegramUser }) => {
    const [rules, setRules] = useState(MOCK_RULES);

    const refetch = () => {
        // In a mock scenario, this would just reset to initial mock data
        setRules(MOCK_RULES);
    };

    return (
        <Box
            sx={{
                mt: 4,
                px: 2,
                width: '100%',
                maxWidth: '600px',
                mx: 'auto',
                textAlign: 'center',
                display: 'flex',
                flexDirection: 'column',
                gap: 2,
            }}
        >
            <Typography variant="h5" gutterBottom>
                Manage Your Rules
            </Typography>

            <RuleList
                rules={rules}
                onRulesChange={() => refetch()}
                setRules={setRules}
            />
            <RuleForm
                onRuleAdded={refetch}
                email={telegramUser.username || ''}
                currencies={MOCK_CURRENCIES}
                setRules={setRules}
            />
        </Box>
    );
};

export default RulesPage;