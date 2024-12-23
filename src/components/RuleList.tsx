import {FC} from 'react';
import {List, ListItem, ListItemText, IconButton, Typography, Box} from '@mui/material';
import axios from 'axios';
import ToggleOffIcon from '@mui/icons-material/ToggleOff';
import ToggleOnIcon from '@mui/icons-material/ToggleOn';
import {Rule} from "../types/rule.interface.ts";


interface RuleListProps {
    rules: Rule[];
    onRulesChange: () => void;
}

const RuleList: FC<RuleListProps> = ({rules, onRulesChange}) => {

    const toggleRuleActive = async (rule: Rule) => {
        try {
            await axios.patch(`https://fx-back-7e5e55f131eb.herokuapp.com/rules/${rule.id}`, {
                isActive: !rule.isActive,
            });
            onRulesChange();
        } catch (error) {
            console.error('Error toggling rule status:', error);
        }
    };

    return (
        <Box>
            <Typography variant="h6" gutterBottom>
                Your Rules
            </Typography>

            <List sx={{mt: 2}}>
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
                            secondary={`Change: ${rule.percentage}% | Status: ${rule.isActive ? 'Active' : 'Inactive'}`}
                        />
                        <IconButton
                            color={rule.isActive ? 'success' : 'warning'}
                            onClick={() => toggleRuleActive(rule)}
                        >
                            {rule.isActive ? <ToggleOffIcon/> : <ToggleOnIcon/>}
                        </IconButton>
                    </ListItem>
                ))}
            </List>

        </Box>
    );
};

export default RuleList;