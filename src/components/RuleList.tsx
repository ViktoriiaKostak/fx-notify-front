import { FC } from 'react';
import { List, ListItem, ListItemText, IconButton, Typography, Box } from '@mui/material';
import ToggleOffIcon from '@mui/icons-material/ToggleOff';
import ToggleOnIcon from '@mui/icons-material/ToggleOn';
import { Rule } from "../types/rule.interface.ts";

interface RuleListProps {
    rules: Rule[];
    onRulesChange: () => void;
    setRules: React.Dispatch<React.SetStateAction<Rule[]>>;
}

const RuleList: FC<RuleListProps> = ({ rules, onRulesChange, setRules }) => {
    const toggleRuleActive = (rule: Rule) => {
        setRules(prevRules =>
            prevRules.map(r =>
                r.id === rule.id
                    ? { ...r, isActive: !r.isActive }
                    : r
            )
        );
        onRulesChange();
    };

    return (
        <Box>
            <Typography variant="h5" gutterBottom>
                Your Rules
            </Typography>
            <List sx={{ mt: 2 }}>
                {rules.map((rule) => (
                    <ListItem
                        key={rule.id}
                        sx={{
                            mb: 2,
                            px: 2,
                            py: 1,
                            borderRadius: '8px',
                            bgcolor: '#f4f6f8',
                            boxShadow: 1,
                        }}
                    >
                        <ListItemText
                            primary={`${rule.baseCurrency.name} → ${rule.targetCurrency.name}`}
                            secondary={`Change: ${rule.percentage}% | Status: ${
                                rule.isActive ? 'Active' : 'Inactive'
                            }`}
                        />
                        <IconButton
                            color={rule.isActive ? 'success' : 'warning'}
                            onClick={() => toggleRuleActive(rule)}
                        >
                            {rule.isActive ? <ToggleOnIcon /> : <ToggleOffIcon />}
                        </IconButton>
                    </ListItem>
                ))}
            </List>
        </Box>
    );
};

export default RuleList;