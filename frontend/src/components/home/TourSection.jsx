import { Box, Container } from "@mui/material";
import SectionHeader from "./SectionHeader";
import TourCarousel from "./TourCarousel";

export default function TourSection({
  bg,
  icon,
  label,
  title,
  subtitle,
  tours
}) {
  return (
   <Box
  sx={{
    py: 10,
    background: bg || "transparent",
    color: bg ? "#fff" : "inherit",
  }}
>
      <Container>
        <SectionHeader
          icon={icon}
          label={label}
          title={title}
          subtitle={subtitle}
        />
        <TourCarousel tours={tours} />
      </Container>
    </Box>
  );
}