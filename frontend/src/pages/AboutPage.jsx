import { useNavigate } from "react-router-dom";
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  Avatar,
} from "@mui/material";

import PersonIcon from "@mui/icons-material/Person";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Autoplay } from "swiper/modules";
import CountUp from "react-countup";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import ParkIcon from "@mui/icons-material/Park";
import ApartmentIcon from "@mui/icons-material/Apartment";

import PublicIcon from "@mui/icons-material/Public";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import BeachAccessIcon from "@mui/icons-material/BeachAccess";
import FavoriteIcon from "@mui/icons-material/Favorite";
import Rating from "@mui/material/Rating";

const stats = [
  {
    number: 10000,
    label: "Happy Customers",
    icon: <PublicIcon sx={{ fontSize: 45 }} />,
  },
  {
    number: 500,
    label: "Successful Tours Completed",
    icon: <LocationOnIcon sx={{ fontSize: 45 }} />,
  },
  {
    number: 8,
    label: "Years of Trusted Experience",
    icon: <FavoriteIcon sx={{ fontSize: 45 }} />,
  },
  {
    number: 100,
    label: "Exciting Destinations",
    icon: <BeachAccessIcon sx={{ fontSize: 45 }} />,
  },
];
const whyChoose = [
  {
    icon: <PublicIcon sx={{ fontSize: 40, color: "#0d47a1" }} />,
    title: "Many Destinations",
    desc: "We offer a wide range of domestic and international tour packages.",
  },
  {
    icon: <MonetizationOnIcon sx={{ fontSize: 40, color: "#0d47a1" }} />,
    title: "Best Value for Money",
    desc: "Get the best prices with quality service and no hidden costs.",
  },
  {
    icon: <BeachAccessIcon sx={{ fontSize: 40, color: "#0d47a1" }} />,
    title: "Beautiful Places",
    desc: "We take you to the most beautiful and popular tourist destinations.",
  },
  {
    icon: <FavoriteIcon sx={{ fontSize: 40, color: "#0d47a1" }} />,
    title: "Passion for Travel",
    desc: "We love travel and work hard to give you the best holiday experience.",
  },
];
 const team = [
    {
      name: "Prashant Birare",
      role: "Founder/Owner"
    },
    {
      name: "Komal Jadhav",
      role: "Operations Head"
    }
  ];

const AboutPage = () => {
  const navigate = useNavigate();

  return (
    <Box sx={{ overflowX: "hidden" }}>
      {/* ABOUT US SECTION */}
      <Box sx={{ py: 12, background: "#f8f9fb" }}>
        <Container>
          {/* SECTION HEADING */}
          <Typography
            variant="h3"
            sx={{
              textAlign: "center",
              fontWeight: 700,
              color: "#0d47a1",
              mb: 6,
            }}
          >
            About Holidays Care
          </Typography>

          {/* CONTENT ROW */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              flexDirection: { xs: "column", md: "row" },
            }}
          >
            {/* LEFT IMAGE */}
            <Box sx={{ flex: 1, display: "flex", justifyContent: "center" }}>
              <Box
                component="img"
                src="/aboutUs.jpeg"
                alt="Travel"
                sx={{
                  width: "100%",
                  maxWidth: 520,
                  height: "auto",
                  objectFit: "contain",
                  borderRadius: 1,
                  boxShadow: "0 10px 25px rgba(0,0,0,0.15)",
                }}
              />
            </Box>

            {/* RIGHT TEXT */}
            <Box sx={{ flex: 1 }}>
              <Typography sx={{ mb: 3, lineHeight: 1.8 }}>
                Holidays Care is a travel agency dedicated to creating
                unforgettable travel experiences for individuals, families, and
                corporate groups. We specialize in organizing domestic and
                international holiday packages tailored to each traveler’s
                preferences and budget.
              </Typography>

              <Typography sx={{ mb: 3, lineHeight: 1.8 }}>
                Our expert team carefully plans every aspect of your trip — from
                flight reservations and hotel accommodations to customized
                itineraries and documentation assistance.
              </Typography>

              <Typography sx={{ fontWeight: 600, mb: 1 }}>
                Our services include:
              </Typography>

              <Box component="ul" sx={{ pl: 3, lineHeight: 2 }}>
                <li>Flight reservations with competitive pricing</li>
                <li>Hand-picked hotel accommodations</li>
                <li>Group and corporate tour planning</li>
                <li>Passport and visa documentation support</li>
                <li>Customized domestic & international packages</li>
              </Box>
            </Box>
          </Box>
        </Container>
      </Box>

      {/* STATS SECTION */}
      {/* STATS SECTION */}
      <Box
        sx={{
          py: { xs: 8, md: 14 },
          position: "relative",
          color: "white",
          textAlign: "center",
          backgroundImage: "url('/statsimage.jpeg')",
          backgroundSize: "cover",
          backgroundPosition: "center",

          // Important for mobile compatibility
          backgroundAttachment: { xs: "scroll", md: "fixed" },
        }}
      >
        {/* Overlay */}
        <Box
          sx={{
            position: "absolute",
            inset: 0,
            background: "rgba(0,0,0,0.45)",
          }}
        />

        <Container sx={{ position: "relative", zIndex: 2 }}>
          <Grid container spacing={{ xs: 4, md: 6 }} justifyContent="center">
            {stats.map((item, index) => (
              <Grid item xs={6} sm={6} md={3} key={index}>
                <Box>
                  {/* ICON */}
                  <Box
                    sx={{
                      mb: 2,
                      fontSize: { xs: 35, md: 45 },
                    }}
                  >
                    {item.icon}
                  </Box>

                  {/* COUNTER */}
                  <Typography
                    sx={{
                      fontWeight: 800,
                      fontSize: { xs: "28px", md: "42px" },
                    }}
                  >
                    <CountUp end={item.number} duration={5} separator="," />+
                  </Typography>

                  {/* LABEL */}
                  <Typography
                    sx={{
                      mt: 1,
                      letterSpacing: 1,
                      opacity: 0.9,
                      fontSize: { xs: "13px", md: "16px" },
                    }}
                  >
                    {item.label}
                  </Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* WHY CHOOSE US */}
      <Box sx={{ bgcolor: "#f4f8fc", py: 10 }}>
        <Container>
          <Typography
            variant="h3"
            align="center"
            sx={{ fontWeight: 700, mb: 8, color: "#0d47a1" }}
          >
            WHY CHOOSE US?
          </Typography>

          <Box
  sx={{
    display: "grid",
    gridTemplateColumns: {
      xs: "1fr",
      sm: "1fr 1fr",
      md: "1fr 1fr",
    },
    gap: 4,
  }}
>
  {whyChoose.map((item, index) => (
    <Card
      key={index}
      sx={{
        p: 3,
        textAlign: "center",
        borderRadius: 4,
        height: "70%",
        minHeight: 200,   // ⭐ forces equal size
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        transition: "0.1s",
        "&:hover": { transform: "translateY(-1px)", boxShadow: 6, },
       
      }}
    >
      {item.icon}

      <Typography variant="h6" sx={{ mt: 2, mb: 2 }}>
        {item.title}
      </Typography>

      <Typography color="text.secondary">
        {item.desc}
      </Typography>
    </Card>
  ))}
</Box>
        </Container>
      </Box>

      <Box
        sx={{
          position: "relative",
          py: 16,
          color: "white",
          textAlign: "center",

          backgroundImage: "url('bg.jpg')",

          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed", // ⭐ parallax
        }}
      >
        <Container>
          <Typography variant="h3" sx={{ fontWeight: 700, mb: 8 }}>
            What Our Travelers Say
          </Typography>

          <Swiper
            modules={[Autoplay]}
            autoplay={{ delay: 4000 }}
            loop
            slidesPerView={1}
          >
            <SwiperSlide>
              <Box
                sx={{
                  maxWidth: 750,
                  mx: "auto",
                  p: 5,
                  borderRadius: 4,
                  background: "rgba(0,0,0,0.45)",
                  backdropFilter: "blur(8px)",
                }}
              >
                <Rating value={5} readOnly sx={{ mb: 2, color: "#FFD700" }} />

                <Typography sx={{ fontStyle: "italic", mb: 3 }}>
                  "Professional, responsive, and extremely well-organized. Our
                  family vacation was stress-free and beautiful."
                </Typography>

                <Typography sx={{ fontWeight: 600 }}>Rohan Mehta</Typography>

                <Typography variant="body2">Business Owner</Typography>
              </Box>
            </SwiperSlide>

            <SwiperSlide>
              <Box
                sx={{
                  maxWidth: 750,
                  mx: "auto",
                  p: 5,
                  borderRadius: 4,
                  background: "rgba(0,0,0,0.45)",
                  backdropFilter: "blur(8px)",
                }}
              >
                <Rating value={5} readOnly sx={{ mb: 2, color: "#FFD700" }} />

                <Typography sx={{ fontStyle: "italic", mb: 3 }}>
                  "Everything was perfectly arranged — hotels, flights and local
                  support. Highly recommended!"
                </Typography>

                <Typography sx={{ fontWeight: 600 }}>Priya Sharma</Typography>

                <Typography variant="body2">Entrepreneur</Typography>
              </Box>
            </SwiperSlide>

            <SwiperSlide>
              <Box
                sx={{
                  maxWidth: 750,
                  mx: "auto",
                  p: 5,
                  borderRadius: 4,
                  background: "rgba(0,0,0,0.45)",
                  backdropFilter: "blur(8px)",
                }}
              >
                <Rating value={5} readOnly sx={{ mb: 2, color: "#FFD700" }} />

                <Typography sx={{ fontStyle: "italic", mb: 3 }}>
                  "Best travel planning experience. Transparent pricing and
                  amazing service quality."
                </Typography>

                <Typography sx={{ fontWeight: 600 }}>Amit Kulkarni</Typography>

                <Typography variant="body2">Corporate Manager</Typography>
              </Box>
            </SwiperSlide>
          </Swiper>
        </Container>
      </Box>

       
    <Box sx={{ py: 10 }}>
      <Container>

        {/* Heading */}
        <Typography
          variant="h3"
          align="center"
          fontWeight={700}
          sx={{ mb: 2 }}
        >
          Meet Our Team
        </Typography>

        <Typography
          align="center"
          sx={{
            mb: 6,
            color: "text.secondary",
            maxWidth: 600,
            mx: "auto"
          }}
        >
          The passionate people behind Holidays Care who make every journey
          memorable and seamless for our travelers.
        </Typography>

        <Grid container spacing={4} justifyContent="center">

          {team.map((member, index) => (

            <Grid
              item
              xs={12}
              sm={6}
              md={3}
              sx={{
                display: "flex",
                justifyContent: "center"
              }}
            >

              <Card
                sx={{
                    width: 240,         
                    height: 240, 
                  textAlign: "center",
                  borderRadius: 1,
                  boxShadow: 3,
                  py: 4,
                 
                }}
              >

                <Avatar
                  sx={{
                    width: 80,
                    height: 80,
                    bgcolor: "#1976d2",
                    mx: "auto",
                    mb: 2
                  }}
                >
                  <PersonIcon fontSize="large" />
                </Avatar>

                <CardContent>

                  <Typography variant="h6" fontWeight={700}>
                    {member.name}
                  </Typography>

                  <Typography
                    variant="body2"
                    color="text.secondary"
                  >
                    {member.role}
                  </Typography>

                </CardContent>

              </Card>

            </Grid>

          ))}

        </Grid>

      </Container>
    </Box>
      {/* FINAL CTA SECTION */}
      {/* FINAL CTA SECTION */}
      <Box
        sx={{
          bgcolor: "#f4f8fc",
          py: { xs: 10, md: 14 },
          textAlign: "center",
          color: "#333",
        }}
      >
        <Container maxWidth="md">
          {/* Subtitle */}
          <Typography
            sx={{
              color: "#1976d2",
              fontWeight: 600,
              mb: 1,
              letterSpacing: 1,
              fontSize: "0.9rem",
            }}
          >
            START YOUR JOURNEY
          </Typography>

          {/* Heading */}
          <Typography
            variant="h3"
            sx={{
              fontWeight: 700,
              mb: 3,
              color: "#0d47a1",
            }}
          >
            Ready To Explore The World?
          </Typography>

          {/* Description */}
          <Typography
            sx={{
              maxWidth: 650,
              mx: "auto",
              mb: 6,
              opacity: 0.9,
              fontSize: "1.1rem",
              lineHeight: 1.7,
            }}
          >
            Let Holidays Care plan your perfect journey. From beautiful
            destinations to seamless travel arrangements, we make every trip
            comfortable, memorable, and completely hassle-free.
          </Typography>

          {/* Buttons */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              gap: 3,
              flexWrap: "wrap",
            }}
          >
            <Button
              variant="contained"
              size="large"
              onClick={() => navigate("/tours")}
              sx={{
                bgcolor: "#1976d2",
                px: 5,
                py: 1.5,
                fontWeight: 600,
                borderRadius: 2,
                "&:hover": {
                  bgcolor: "#1565c0",
                },
              }}
            >
              Explore Tours
            </Button>

            <Button
              variant="outlined"
              size="large"
              onClick={() => navigate("/contact")}
              sx={{
                borderColor: "#1976d2",
                color: "#1976d2",
                px: 5,
                py: 1.5,
                fontWeight: 600,
                borderRadius: 2,
                "&:hover": {
                  borderColor: "#1565c0",
                  bgcolor: "rgba(25,118,210,0.08)",
                },
              }}
            >
              Contact Us
            </Button>
          </Box>
        </Container>
      </Box>
    </Box>
  );
};

export default AboutPage;
