import { Box, CircularProgress, Typography } from '@mui/material';

const LoadingPage = () => (
    <Box textAlign="center" sx={{ marginTop: '20%' }}>
        <CircularProgress />
        <Typography variant="h6" mt={2}>
            Loading...
        </Typography>
    </Box>
);

export default LoadingPage;
