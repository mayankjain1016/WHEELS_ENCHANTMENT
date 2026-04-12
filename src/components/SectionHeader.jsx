import { Box, Typography } from '@mui/material';

const SectionHeader = ({ title, subtitle }) => {
  return (
    <Box sx={{ textAlign: 'center', mb: 6 }}>
      <Typography variant="h2" sx={{ fontWeight: 700, mb: 2 }}>
        {title}
      </Typography>
      {subtitle && (
        <Typography variant="h6" color="text.secondary" sx={{ maxWidth: 600, mx: 'auto' }}>
          {subtitle}
        </Typography>
      )}
    </Box>
  );
};

export default SectionHeader;
