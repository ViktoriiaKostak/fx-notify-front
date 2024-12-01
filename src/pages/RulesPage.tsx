import { FC } from 'react';
import { Typography, Box, CircularProgress, Alert } from '@mui/material';
import { useQuery } from 'react-query';
import RuleList from '../components/RuleList';
import RuleForm from '../components/RuleForm';
import {Rule} from "../types/rule.interface.ts";

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

const fetchRules = async (userId: string): Promise<Rule[]> => {
    const response = await fetch(`http://localhost:6969/rules?userId=${userId}`);
    if (!response.ok) throw new Error('Failed to fetch rules');
    return response.json();
};

const RulesPage: FC<RulesPageProps> = ({ telegramUser }) => {
    const { id: telegramId } = telegramUser;

    const {
        data: rules = [],
        isLoading,
        error,
        refetch,
    } = useQuery<Rule[], Error>(
        ['rules', telegramId],
        () => fetchRules(telegramId),
        {
            enabled: !!telegramId,
        }
    );

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

            {isLoading && (
                <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
                    <CircularProgress />
                </Box>
            )}
            {error && (
                <Alert severity="error">
                    {error.message || 'An unknown error occurred'}
                </Alert>
            )}

            {!isLoading && !error && (
                <>
                    <RuleList rules={rules} onRulesChange={refetch} />
                    <RuleForm onRuleAdded={refetch} email={telegramUser.username || ''} />
                </>
            )}
        </Box>
    );
};

export default RulesPage;
