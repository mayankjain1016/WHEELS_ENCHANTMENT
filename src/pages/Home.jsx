import {
  Box,
  Container,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  Avatar,
  useTheme,
  alpha,
  Stack,
  Chip,
} from "@mui/material";
import { Link } from "react-router-dom";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import SchoolIcon from "@mui/icons-material/School";
import SecurityIcon from "@mui/icons-material/Security";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import VerifiedIcon from "@mui/icons-material/Verified";
import GroupsIcon from "@mui/icons-material/Groups";
import backgroundImg from "../assets/Background_imgs/backgroundimg.jpeg";
import backgroundImg2 from "../assets/Background_imgs/backgroundimg2.jpeg";
import backgroundImg3 from "../assets/Background_imgs/backgroundimg3.jpeg";

const Home = () => {
  const theme = useTheme();

  const programs = [
    {
      title: "Beginner Training",
      description:
        "A safe and encouraging start for young learners with a focus on balance, posture, and confidence.",
      icon: <SchoolIcon fontSize="large" />,
    },
    {
      title: "Intermediate Level",
      description:
        "Build speed, control, and rhythm through guided practice and structured skating drills.",
      icon: <EmojiEventsIcon fontSize="large" />,
    },
    {
      title: "Advanced Training",
      description:
        "Performance-oriented coaching for students ready to master advanced techniques and competitive skills.",
      icon: <VerifiedIcon fontSize="large" />,
    },
    {
      title: "Safety Practice",
      description:
        "Dedicated sessions for protective movement, falling techniques, awareness, and safe skating habits.",
      icon: <SecurityIcon fontSize="large" />,
    },
  ];

  const coaches = [
    {
      name: "Sarah Mitchell",
      role: "Head Coach",
      exp: "12+ Years",
      specialty: "Youth Skating Specialist",
      img: "https://i.pravatar.cc/300?img=1",
    },
    {
      name: "Michael Chen",
      role: "Senior Coach",
      exp: "10+ Years",
      specialty: "Speed & Technique Training",
      img: "https://i.pravatar.cc/300?img=13",
    },
    {
      name: "Emily Rodriguez",
      role: "Safety Coach",
      exp: "8+ Years",
      specialty: "Balance, Form & Safety",
      img: "https://i.pravatar.cc/300?img=5",
    },
  ];

  const highlights = [];

  return (
    <Box sx={{ bgcolor: "background.default", overflow: "hidden" }}>
      {/* HERO SECTION */}
      <Box
        sx={{
          position: "relative",
          minHeight: { xs: "88vh", md: "95vh" },
          display: "flex",
          alignItems: "center",
          backgroundImage:
            `url(${backgroundImg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          animation: "heroZoom 18s ease-in-out infinite alternate",
          "@keyframes heroZoom": {
            from: {
              backgroundSize: "100%",
            },
            to: {
              backgroundSize: "108%",
            },
          },
          "&::before": {
            content: '""',
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(to right, rgba(7,16,33,0.82), rgba(7,16,33,0.48))",
            zIndex: 1,
          },
        }}
      >
        <Container maxWidth="lg" sx={{ position: "relative", zIndex: 2 }}>
          <Grid container alignItems="center">
            <Grid item xs={12} md={8} lg={7}>
              <Typography
                variant="h1"
                sx={{
                  color: "white",
                  fontWeight: 900,
                  lineHeight: 1.05,
                  letterSpacing: "-0.04em",
                  fontSize: {
                    xs: "2rem",
                    sm: "2.6rem",
                    md: "3.3rem",
                    lg: "3.8rem",
                  },
                  mb: 3,
                }}
              >
                Where Young Skaters Build{" "}
                <Box component="span" sx={{ color: "secondary.main" }}>
                  Confidence,
                </Box>{" "}
                Skill & Joy
              </Typography>

              <Typography
                variant="h6"
                sx={{
                  color: alpha("#fff", 0.88),
                  fontWeight: 400,
                  lineHeight: 1.8,
                  maxWidth: "680px",
                  mb: 4.5,
                  fontSize: { xs: "1rem", md: "1.15rem" },
                }}
              >
                A premium skating academy where children learn with expert
                coaching, safe training practices, and a motivating environment
                designed for real growth.
              </Typography>

              <Stack
                direction={{ xs: "column", sm: "row" }}
                spacing={2.5}
                alignItems={{ xs: "stretch", sm: "center" }}
              >
                <Button
                  variant="contained"
                  color="secondary"
                  size="large"
                  component={Link}
                  to="/admission"
                  endIcon={<ArrowForwardIcon />}
                  sx={{
                    px: 4.5,
                    py: 1.8,
                    borderRadius: "999px",
                    fontWeight: 800,
                    fontSize: "1rem",
                    textTransform: "none",
                    boxShadow: `0 18px 35px ${alpha(
                      theme.palette.secondary.main,
                      0.28
                    )}`,
                    transition: "all 0.3s ease",
                    "&:hover": {
                      transform: "translateY(-3px)",
                      boxShadow: `0 24px 42px ${alpha(
                        theme.palette.secondary.main,
                        0.35
                      )}`,
                    },
                  }}
                >
                  Join the Academy
                </Button>

                <Button
                  variant="outlined"
                  size="large"
                  component={Link}
                  to="/about"
                  sx={{
                    px: 4.5,
                    py: 1.8,
                    borderRadius: "999px",
                    fontWeight: 700,
                    fontSize: "1rem",
                    textTransform: "none",
                    color: "white",
                    borderColor: alpha("#fff", 0.75),
                    borderWidth: 1.6,
                    transition: "all 0.3s ease",
                    "&:hover": {
                      borderColor: "secondary.main",
                      color: "secondary.main",
                      bgcolor: alpha("#fff", 0.04),
                    },
                  }}
                >
                  Explore Programs
                </Button>
              </Stack>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* OVERVIEW SECTION */}
      <Container maxWidth="lg" sx={{ py: { xs: 10, md: 16 } }}>
        <Grid container spacing={{ xs: 6, md: 8 }} alignItems="center">
          <Grid item xs={12} md={6}>
            <Typography
              variant="overline"
              sx={{
                color: "secondary.main",
                fontWeight: 800,
                letterSpacing: 3,
              }}
            >
              WHEELS ENCHANTMENT
            </Typography>

            <Typography
              variant="h2"
              sx={{
                fontWeight: 900,
                mt: 1,
                mb: 3,
                lineHeight: 1.15,
                fontSize: { xs: "2.2rem", md: "3.2rem" },
              }}
            >
              A premium academy where children learn skating the right way
            </Typography>

            <Typography
              variant="body1"
              sx={{
                color: "text.secondary",
                fontSize: "1.08rem",
                lineHeight: 1.95,
                mb: 4,
                maxWidth: "95%",
              }}
            >
              At Wheels Enchantment, we combine skilled coaching, structured
              learning, safety-focused practice, and a motivating environment so
              every child can enjoy skating while building confidence and strong
              fundamentals.
            </Typography>

            <Button
              component={Link}
              to="/about"
              color="primary"
              endIcon={<ArrowForwardIcon />}
              sx={{
                fontWeight: 800,
                textTransform: "none",
                px: 0,
                "&:hover": {
                  bgcolor: "transparent",
                },
              }}
            >
              Learn More About Us
            </Button>
          </Grid>

          <Grid item xs={12} md={6}>
            <Box sx={{ position: "relative" }}>
              <Box
                component="img"
                src={backgroundImg2}
                alt="Kids skating practice"
                sx={{
                  width: "100%",
                  height: { xs: 360, md: 500 },
                  objectFit: "cover",
                  borderRadius: "28px",
                  boxShadow: "0 30px 60px rgba(0,0,0,0.14)",
                }}
              />

              <Box
                sx={{
                  position: "absolute",
                  bottom: { xs: -25, md: -35 },
                  left: { xs: 20, md: -35 },
                  display: "flex",
                  alignItems: "stretch",
                  bgcolor: "background.paper",
                  borderRadius: "22px",
                  overflow: "hidden",
                  boxShadow: "0 20px 45px rgba(0,0,0,0.16)",
                  maxWidth: 310,
                  border: `1px solid ${alpha(theme.palette.divider, 0.08)}`,
                }}
              >
                <Box
                  component="img"
                  src={backgroundImg3}
                  alt="Coach teaching students skating"
                  sx={{
                    width: 110,
                    minHeight: 120,
                    objectFit: "cover",
                  }}
                />

                <Box sx={{ p: 2.2 }}>
                  <Typography
                    variant="h4"
                    sx={{
                      fontWeight: 900,
                      lineHeight: 1,
                      color: "primary.main",
                    }}
                  >
                    150+
                  </Typography>
                  <Typography
                    variant="subtitle1"
                    sx={{
                      fontWeight: 700,
                      mt: 0.7,
                    }}
                  >
                    Active Students
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      color: "text.secondary",
                      mt: 0.8,
                      lineHeight: 1.6,
                    }}
                  >
                    Growing under expert guidance in a safe and inspiring
                    skating environment.
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Container>

      {/* PROGRAMS */}
      <Box
        sx={{
          py: { xs: 10, md: 14 },
          bgcolor: alpha(theme.palette.primary.main, 0.03),
        }}
      >
        <Container maxWidth="lg">
          <Box sx={{ textAlign: "center", mb: 8 }}>
            <Typography
              variant="overline"
              sx={{
                color: "secondary.main",
                fontWeight: 800,
                letterSpacing: 3,
              }}
            >
              OUR PROGRAMS
            </Typography>
            <Typography
              variant="h2"
              sx={{
                fontWeight: 900,
                mt: 1,
                fontSize: { xs: "2rem", md: "2.9rem" },
              }}
            >
              Structured learning for every skating level
            </Typography>
            <Typography
              variant="body1"
              sx={{
                color: "text.secondary",
                mt: 2,
                maxWidth: 680,
                mx: "auto",
                lineHeight: 1.8,
              }}
            >
              Each program is designed to help children progress comfortably,
              safely, and confidently with the right level of support.
            </Typography>
          </Box>

          <Grid container spacing={4}>
            {programs.map((program, i) => (
              <Grid item xs={12} sm={6} md={3} key={i}>
                <Card
                  elevation={0}
                  sx={{
                    height: "100%",
                    p: 3.2,
                    borderRadius: "24px",
                    textAlign: "center",
                    background: "rgba(255,255,255,0.72)",
                    backdropFilter: "blur(12px)",
                    border: `1px solid ${alpha(theme.palette.divider, 0.08)}`,
                    transition: "all 0.35s ease",
                    "&:hover": {
                      transform: "translateY(-10px)",
                      boxShadow: "0 20px 45px rgba(0,0,0,0.08)",
                      bgcolor: "white",
                    },
                  }}
                >
                  <Box
                    sx={{
                      color: "secondary.main",
                      mb: 2,
                      width: 72,
                      height: 72,
                      borderRadius: "20px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      mx: "auto",
                      bgcolor: alpha(theme.palette.secondary.main, 0.1),
                    }}
                  >
                    {program.icon}
                  </Box>

                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: 800,
                      mb: 1.5,
                    }}
                  >
                    {program.title}
                  </Typography>

                  <Typography
                    variant="body2"
                    sx={{
                      color: "text.secondary",
                      lineHeight: 1.75,
                    }}
                  >
                    {program.description}
                  </Typography>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* COACHES */}
      <Container maxWidth="lg" sx={{ py: { xs: 10, md: 14 } }}>
        <Box sx={{ textAlign: "center", mb: 8 }}>
          <Typography
            variant="overline"
            sx={{
              color: "secondary.main",
              fontWeight: 800,
              letterSpacing: 3,
            }}
          >
            OUR COACHES
          </Typography>

          <Typography
            variant="h2"
            sx={{
              fontWeight: 900,
              mt: 1,
              fontSize: { xs: "2rem", md: "2.9rem" },
            }}
          >
            Expert guidance from experienced coaches
          </Typography>

          <Typography
            variant="body1"
            sx={{
              color: "text.secondary",
              mt: 2,
              maxWidth: 700,
              mx: "auto",
              lineHeight: 1.8,
            }}
          >
            Our coaching team is focused on helping every child learn with the
            right mix of discipline, encouragement, technique, and safety.
          </Typography>
        </Box>

        <Grid container spacing={4}>
          {coaches.map((coach, i) => (
            <Grid item xs={12} md={4} key={i}>
              <Card
                elevation={0}
                sx={{
                  height: "100%",
                  p: 4,
                  borderRadius: "28px",
                  textAlign: "center",
                  border: `1px solid ${alpha(theme.palette.divider, 0.08)}`,
                  boxShadow: "0 18px 40px rgba(0,0,0,0.05)",
                  transition: "all 0.35s ease",
                  "&:hover": {
                    transform: "translateY(-8px)",
                    boxShadow: "0 26px 50px rgba(0,0,0,0.08)",
                  },
                }}
              >
                <Avatar
                  src={coach.img}
                  alt={coach.name}
                  sx={{
                    width: 160,
                    height: 160,
                    mx: "auto",
                    mb: 3,
                    border: "6px solid white",
                    boxShadow: "0 15px 35px rgba(0,0,0,0.14)",
                  }}
                />

                <Typography variant="h5" sx={{ fontWeight: 800 }}>
                  {coach.name}
                </Typography>

                <Typography
                  variant="subtitle1"
                  sx={{
                    color: "secondary.main",
                    fontWeight: 700,
                    mt: 0.8,
                  }}
                >
                  {coach.role}
                </Typography>

                <Typography
                  variant="body2"
                  sx={{
                    mt: 1.3,
                    fontWeight: 800,
                    color: "primary.main",
                  }}
                >
                  {coach.exp} Experience
                </Typography>

                <Typography
                  variant="body2"
                  sx={{
                    color: "text.secondary",
                    mt: 1,
                    lineHeight: 1.7,
                  }}
                >
                  Specialization: {coach.specialty}
                </Typography>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* FINAL CTA */}
      <Box
        sx={{
          py: { xs: 9, md: 12 },
          bgcolor: "primary.main",
          color: "white",
        }}
      >
        <Container maxWidth="md" sx={{ textAlign: "center" }}>
          <Typography
            variant="h3"
            sx={{
              fontWeight: 900,
              mb: 2,
              fontSize: { xs: "2rem", md: "3rem" },
            }}
          >
            Give your child a confident start on wheels
          </Typography>

          <Typography
            variant="body1"
            sx={{
              color: alpha("#fff", 0.82),
              maxWidth: 700,
              mx: "auto",
              lineHeight: 1.8,
              mb: 4,
            }}
          >
            Join a skating academy that combines expert coaching, a child-safe
            environment, and a premium learning experience.
          </Typography>

          <Button
            variant="contained"
            color="secondary"
            component={Link}
            to="/admission"
            endIcon={<ArrowForwardIcon />}
            sx={{
              px: 4.5,
              py: 1.7,
              borderRadius: "999px",
              fontWeight: 800,
              textTransform: "none",
              boxShadow: `0 16px 35px ${alpha(
                theme.palette.secondary.main,
                0.28
              )}`,
              transition: "all 0.3s ease",
              "&:hover": {
                transform: "translateY(-3px)",
              },
            }}
          >
            Apply for Admission
          </Button>
        </Container>
      </Box>
    </Box>
  );
};

export default Home;