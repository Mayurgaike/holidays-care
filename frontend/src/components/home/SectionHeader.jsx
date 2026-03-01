import { Box, Stack, Typography } from "@mui/material";

export default function SectionHeader({ icon, label, title, subtitle }) {
  return (
    <Box mb={4}>
      <Stack direction="row" spacing={1} alignItems="center" color="primary.main" mb={1}>
        {icon}
        <Typography variant="button" fontWeight={700}>
          {label}
        </Typography>
      </Stack>

      <Typography variant="h4" fontWeight={800}>
        {title}
      </Typography>

      <Typography color="text.secondary">
        {subtitle}
      </Typography>
    </Box>
  );
}