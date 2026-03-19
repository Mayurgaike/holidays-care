import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardMedia
} from "@mui/material";

import { useEffect, useRef } from "react";

export default function GalleryPage() {

  const images = [
    "/memory1.jpeg",
    "/memory2.jpeg",
    "/memory3.jpeg",
    "/memory4.jpeg",
    "/memory5.jpeg",
    "/memory6.jpeg",
    "/memory7.jpeg",
    "/memory8.jpeg",
    "/memory9.jpeg"
  ];

  const cardsRef = useRef([]);

  useEffect(() => {

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.style.opacity = "1";
            entry.target.style.transform = "translateY(0)";
          }
        });
      },
      { threshold: 0.2 }
    );

    cardsRef.current.forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();

  }, []);

  return (
    <Box sx={{ py: 10, bgcolor: "#f8f9fb" }}>

      <Container sx={{ px: { xs: 2, sm: 3 } }}>

        {/* HEADER */}

        <Typography
          variant="h3"
          align="center"
          fontWeight={700}
          sx={{ mb: 2 }}
          color="#0d47a1"
        >
          We take care of your Memories!
        </Typography>

        <Typography
          align="center"
          sx={{
            mb: 7,
            color: "text.secondary",
            maxWidth: 650,
            mx: "auto",
            fontSize: "1.05rem"
          }}
        >
          A collection of unforgettable moments captured during our journeys.
          Every photograph tells a story of adventure, happiness, and memories
          created with our travelers around the world.
        </Typography>

        {/* GALLERY */}

        <Grid container spacing={4} justifyContent="center">
          {images.map((img, index) => (

               <Grid
                    item
                    xs={12}
                    sm={6}
                    md={4}
                    key={index}
                    sx={{
                        display: "flex",
                        justifyContent: "center"
                    }}
                    >

              <Card
                ref={(el) => (cardsRef.current[index] = el)}
                sx={{
                  borderRadius: 1,
                  overflow: "hidden",
                  boxShadow: 1,
                   width: { xs: "92%", sm: "100%" },
                     maxWidth: 380, 

                  opacity: 0,
                  transform: "translateY(40px)",
                  transition: "all 0.7s ease",

                  "&:hover img": {
                    transform: "scale(1.08)"
                  }
                }}
              >

                <CardMedia
                  component="img"
                  image={img}
                  alt="travel memory"
                  sx={{
                    height: 260,
                    objectFit: "cover",
                    transition: "0.6s"
                  }}
                />

              </Card>

            </Grid>

          ))}

        </Grid>

      </Container>

    </Box>
  );
}