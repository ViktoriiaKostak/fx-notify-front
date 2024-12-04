// @ts-ignore
import React, { FC } from 'react';
import { Typography, Box, CircularProgress, Alert, Button } from '@mui/material';
import { useQuery } from 'react-query';
import RuleList from '../components/RuleList';
import RuleForm from '../components/RuleForm';
import { Rule } from '../types/rule.interface';
import { useNavigate } from 'react-router-dom';

const fetchRules = async (email: string): Promise<Rule[]> => {
    const response = await fetch(`https://fx-back-7e5e55f131eb.herokuapp.com/rules?email=${email}`);
    if (!response.ok) throw new Error('Failed to fetch rules');
    return response.json();
};

const RulesPage: FC = () => {
    const email = localStorage.getItem('userEmail');
    const navigate = useNavigate();

    const {
        data: rules = [],
        isLoading,
        error,
        refetch,
    } = useQuery<Rule[], Error>(
        ['rules', email],
        () => fetchRules(email as string),
        {
            enabled: !!email,
            placeholderData: [],
        }
    );

    if (!email) {
        return (
            <Box sx={{ mt: 4, px: 2, textAlign: 'center' }}>
                <Typography variant="h6" color="error">
                    Please log in first to manage your rules.
                </Typography>
            </Box>
        );
    }

    return (
        <Box
            sx={{
                mt: 4,
                px: 3,
                width: '100%',
                maxWidth: '600px',
                mx: 'auto',
                display: 'flex',
                flexDirection: 'column',
                gap: 3,
                bgcolor: '#ffffff',
                borderRadius: '12px',
                boxShadow: 3,
                padding: '24px',
            }}
        >
            <Typography variant="h4" fontWeight="bold" gutterBottom textAlign="center">
                Manage Your Rules
            </Typography>

            <Button
                variant="outlined"
                color="primary"
                onClick={() => navigate('/login')}
                sx={{ alignSelf: 'flex-end' }}
            >
                Change Email
            </Button>

            {isLoading && (
                <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
                    <CircularProgress />
                </Box>
            )}
            {error && (
                <Alert severity="error" sx={{ mt: 2 }}>
                    {error instanceof Error ? error.message : 'An unknown error occurred'}
                </Alert>
            )}
            {!isLoading && !error && (
                <>
                    <RuleList rules={rules} onRulesChange={refetch} />
                    <RuleForm onRuleAdded={refetch} email={email} />
                </>
            )}
        </Box>
    );
};

export default RulesPage;
