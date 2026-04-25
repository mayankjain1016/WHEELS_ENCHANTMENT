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
import { useState, useEffect } from "react";
import { ArrowRight, Award, Star, MapPin, School, Users, Calendar, Target, Zap, Shield } from 'lucide-react';
import coachImg1 from "../assets/Coachs/Coach1.jpeg";
import coachImg2 from "../assets/Coachs/Coach2.jpeg";
import coachImg3 from "../assets/Coachs/Coach3.jpeg";
import coachImg4 from "../assets/Coachs/Coach4.jpeg";
import backgroundImg from "../assets/Background_imgs/backgroundimg.jpeg";
import backgroundImg_2 from "../assets/Background_imgs/backgroundimg_2.jpeg";
import backgroundImg_3 from "../assets/Background_imgs/backgroundimg_3.jpeg";
import backgroundImg_4 from "../assets/Background_imgs/backgroundimg_4.jpeg";
import backgroundImg_4_4 from "../assets/Background_imgs/backgroundimg4_4.jpeg";
import backgroundImg_5 from "../assets/Background_imgs/backgroundimg_5.jpeg";
import backgroundImg2 from "../assets/Background_imgs/backgroundimg2.jpeg";
import backgroundImg3 from "../assets/Background_imgs/backgroundimg3.jpeg";
import backgroundImg4 from "../assets/Background_imgs/backgroundimg4.jpeg";
import backgroundImg5 from "../assets/Background_imgs/backgroundimg5.jpeg";

const Home = () => {
  const theme = useTheme();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const heroImages = [
    backgroundImg,
    backgroundImg_2,
    backgroundImg_3,
    backgroundImg_4,
    backgroundImg_4_4,
    backgroundImg_5,
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % heroImages.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [heroImages.length]);

  const programs = [
    {
      title: "Beginner Training",
      description:
        "A safe and encouraging start for young learners with a focus on balance, posture, and confidence.",
      icon: <Target size={36} strokeWidth={2} />,
    },
    {
      title: "Intermediate Level",
      description:
        "Build speed, control, and rhythm through guided practice and structured skating drills.",
      icon: <Zap size={36} strokeWidth={2} />,
    },
    {
      title: "Advanced Training",
      description:
        "Performance-oriented coaching for students ready to master advanced techniques and competitive skills.",
      icon: <Award size={36} strokeWidth={2} />,
    },
    {
      title: "Safety Practice",
      description:
        "Dedicated sessions for protective movement, falling techniques, awareness, and safe skating habits.",
      icon: <Shield size={36} strokeWidth={2} />,
    },
  ];
  const coaches = [
    {
      name: "Suraj Das",
      role: "",
      exp: "10+ Years",
      specialty: "",
      img: coachImg4,
    },
    {
      name: "Md Irshad Khan",
      role: "",
      exp: "8+ Years",
      specialty: "",
      img: coachImg3,
    },
    {
      name: "Riya Majumder",
      role: "",
      exp: "3+ Years",
      specialty: "",
      img: coachImg1,
    },
    {
      name: "Suankit China",
      role: "",
      exp: "2+ Years",
      specialty: "",
      img: coachImg2,
    },
  ];

  const highlights = [];

  const locationAreas = [
    "East Kolkata",
    "North Kolkata",
    "South Kolkata",
    "Central Kolkata",
    "Howrah",
  ];

  return (
    <Box sx={{ bgcolor: "background.default", overflow: "hidden" }}>
      {/* HERO SECTION */}
      <Box
        sx={{
          position: "relative",
          minHeight: { xs: "70vh", sm: "80vh", md: "95vh" },
          display: "flex",
          alignItems: "center",
          overflow: "hidden",
          "&::before": {
            content: '""',
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(to right, rgba(7,16,33,0.82), rgba(7,16,33,0.48))",
            zIndex: 2,
          },
        }}
      >
        {/* Background Image Slider */}
        {heroImages.map((image, index) => (
          <Box
            key={index}
            sx={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              backgroundImage: `url(${image})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              opacity: currentImageIndex === index ? 1 : 0,
              transition: "opacity 2s ease-in-out",
              zIndex: 1,
            }}
          />
        ))}
        <Container maxWidth="lg" sx={{ position: "relative", zIndex: 3, mt: { xs: 8, md: 14 } }}>
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
                  endIcon={<ArrowRight size={20} strokeWidth={2.5} />}
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
              </Stack>

              {/* COMPACT LOCATIONS BAR */}
              <Box
                sx={{
                  mt: 11,
                  p: { xs: 2, md: 2.5 },
                  display: { xs: 'block', md: 'none' },
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    gap: { xs: 0.75, md: 1 },
                    alignItems: "center",
                    justifyContent: "flex-start",
                    overflowX: { xs: "auto", md: "visible" },
                    overflowY: "hidden",
                    flexWrap: "nowrap",
                    pb: { xs: 1, md: 0 },
                    '&::-webkit-scrollbar': {
                      height: { xs: '4px', md: '0px' },
                    },
                    '&::-webkit-scrollbar-track': {
                      background: 'transparent',
                    },
                    '&::-webkit-scrollbar-thumb': {
                      background: alpha('#fff', 0.3),
                      borderRadius: '4px',
                    },
                  }}
                >
                  {locationAreas.map((area, i) => (
                    <Chip
                      key={i}
                      icon={
                        <MapPin 
                          size={14} 
                          strokeWidth={2.5} 
                          style={{ 
                            color: 'white',
                            filter: 'drop-shadow(0 1px 3px rgba(0,0,0,0.3))'
                          }} 
                        />
                      }
                      label={area}
                      size="small"
                      sx={{
                        bgcolor: "transparent",
                        color: "white",
                        fontWeight: 600,
                        fontSize: { xs: "0.75rem", md: "0.8rem" },
                        border: `1.5px solid ${alpha("#fff", 0.3)}`,
                        backdropFilter: "blur(4px)",
                        textShadow: '0 1px 4px rgba(0,0,0,0.3)',
                        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                        whiteSpace: 'nowrap',
                        borderRadius: '999px',
                        py: { xs: 0.5, md: 0.5 },
                        px: { xs: 1.25, md: 1 },
                        height: { xs: '28px', md: 'auto' },
                        flexShrink: 0,
                        '& .MuiChip-icon': {
                          marginLeft: { xs: '2px', md: '8px' },
                          marginRight: { xs: '-2px', md: '-4px' },
                        },
                        '& .MuiChip-label': {
                          px: { xs: 0.5, md: 0.5 },
                        },
                        "&:hover": {
                          bgcolor: alpha("#fff", 0.15),
                          borderColor: theme.palette.secondary.main,
                          transform: 'scale(1.05)',
                          boxShadow: `0 4px 12px ${alpha(theme.palette.secondary.main, 0.3)}`,
                        },
                      }}
                    />
                  ))}
                  <Chip
                    component={Link}
                    to="/about#locations"
                    label="View More"
                    size="small"
                    clickable
                    sx={{
                      bgcolor: alpha(theme.palette.secondary.main, 0.15),
                      color: "white",
                      fontWeight: 700,
                      fontSize: { xs: "0.75rem", md: "0.8rem" },
                      border: `1.5px solid ${theme.palette.secondary.main}`,
                      backdropFilter: "blur(4px)",
                      textShadow: '0 1px 4px rgba(0,0,0,0.3)',
                      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                      cursor: 'pointer',
                      whiteSpace: 'nowrap',
                      borderRadius: '999px',
                      py: { xs: 0.5, md: 0.5 },
                      px: { xs: 1.5, md: 1 },
                      height: { xs: '28px', md: 'auto' },
                      flexShrink: 0,
                      "&:hover": {
                        bgcolor: theme.palette.secondary.main,
                        transform: 'scale(1.08)',
                        boxShadow: `0 6px 16px ${alpha(theme.palette.secondary.main, 0.4)}`,
                      },
                    }}
                  />
                </Box>
              </Box>
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
              WHEELS ENCHNTMENT
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
              At Wheels Enchntment, we combine skilled coaching, structured
              learning, safety-focused practice, and a motivating environment so
              every child can enjoy skating while building confidence and strong
              fundamentals.
            </Typography>

            <Button
              component={Link}
              to="/about"
              color="primary"
              endIcon={<ArrowRight size={18} strokeWidth={2.5} />}
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
            <Box sx={{ position: "relative", mb: { xs: 8, md: 0 } }}>
              <Box
                component="img"
                src={backgroundImg4}
                alt="Kids skating practice"
                sx={{
                  width: "100%",
                  height: { xs: 280, sm: 350, md: 500 },
                  objectFit: "cover",
                  borderRadius: "28px",
                  boxShadow: "0 30px 60px rgba(0,0,0,0.14)",
                }}
              />

              <Box
                sx={{
                  position: "absolute",
                  bottom: { xs: -60, sm: -70, md: -35 },
                  left: { xs: "50%", md: -35 },
                  transform: { xs: "translateX(-50%)", md: "none" },
                  display: "flex",
                  alignItems: "stretch",
                  bgcolor: "background.paper",
                  borderRadius: "22px",
                  overflow: "hidden",
                  boxShadow: "0 20px 45px rgba(0,0,0,0.16)",
                  maxWidth: { xs: 280, sm: 310 },
                  width: { xs: "90%", sm: "auto" },
                  border: `1px solid ${alpha(theme.palette.divider, 0.08)}`,
                }}
              >
                <Box
                  component="img"
                  src={backgroundImg5}
                  alt="Coach teaching students skating"
                  sx={{
                    width: { xs: 90, sm: 110 },
                    minHeight: { xs: 100, sm: 120 },
                    objectFit: "cover",
                  }}
                />

                <Box sx={{ p: { xs: 1.8, sm: 2.2 } }}>
                  <Typography
                    variant="h4"
                    sx={{
                      fontWeight: 900,
                      lineHeight: 1,
                      color: "primary.main",
                      fontSize: { xs: "1.8rem", sm: "2.125rem" },
                    }}
                  >
                    250+
                  </Typography>
                  <Typography
                    variant="subtitle1"
                    sx={{
                      fontWeight: 700,
                      mt: 0.7,
                      fontSize: { xs: "0.9rem", sm: "1rem" },
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
                      fontSize: { xs: "0.8rem", sm: "0.875rem" },
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
              Our Programs
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
                      color: theme.palette.secondary.main,
                      mb: 2,
                      width: 72,
                      height: 72,
                      borderRadius: "20px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      mx: "auto",
                      bgcolor: "transparent",
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

      {/* SCHOOL PARTNERSHIP PROGRAM */}
      <Box sx={{ py: { xs: 10, md: 14 }, bgcolor: "background.paper" }}>
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
              School Partnership Program
            </Typography>
            <Typography
              variant="h2"
              sx={{
                fontWeight: 900,
                mt: 1,
                mb: 2,
                fontSize: { xs: "1.8rem", md: "2.5rem" },
              }}
            >
              Professional Skating Training at Your School
            </Typography>
            <Typography
              variant="body1"
              sx={{
                color: "text.secondary",
                maxWidth: 750,
                mx: "auto",
                lineHeight: 1.8,
                fontSize: "1.05rem",
              }}
            >
              Our certified coaches visit schools to conduct structured skating programs,
              providing students with expert training in a safe and familiar environment.
            </Typography>
          </Box>

          {/* Program Features */}
          <Grid container spacing={4} sx={{ mb: 8 }}>
            <Grid item xs={12} md={4}>
              <Box sx={{ textAlign: "center" }}>
                <Box
                  sx={{
                    width: 80,
                    height: 80,
                    borderRadius: "20px",
                    bgcolor: "transparent",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    mx: "auto",
                    mb: 2.5,
                  }}
                >
                  <School size={40} strokeWidth={2} color={theme.palette.secondary.main} />
                </Box>
                <Typography variant="h6" sx={{ fontWeight: 800, mb: 1 }}>
                  On-Campus Training
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} md={4}>
              <Box sx={{ textAlign: "center" }}>
                <Box
                  sx={{
                    width: 80,
                    height: 80,
                    borderRadius: "20px",
                    bgcolor: "transparent",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    mx: "auto",
                    mb: 2.5,
                  }}
                >
                  <Users size={40} strokeWidth={2} color={theme.palette.secondary.main} />
                </Box>
                <Typography variant="h6" sx={{ fontWeight: 800, mb: 1 }}>
                  Certified Coaches
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} md={4}>
              <Box sx={{ textAlign: "center" }}>
                <Box
                  sx={{
                    width: 80,
                    height: 80,
                    borderRadius: "20px",
                    bgcolor: "transparent",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    mx: "auto",
                    mb: 2.5,
                  }}
                >
                  <Calendar size={40} strokeWidth={2} color={theme.palette.secondary.main} />
                </Box>
                <Typography variant="h6" sx={{ fontWeight: 800, mb: 1 }}>
                  Flexible Scheduling
                </Typography>
              </Box>
            </Grid>
          </Grid>

          {/* Partner Schools */}
          <Box
            sx={{
              bgcolor: alpha(theme.palette.primary.main, 0.02),
              borderRadius: "24px",
              p: { xs: 4, md: 6 },
              border: `1px solid ${alpha(theme.palette.divider, 0.08)}`,
            }}
          >
            <Typography
              variant="h6"
              sx={{
                fontWeight: 800,
                textAlign: "center",
                mb: 4,
                color: "text.primary",
              }}
            >
              Currently Training Students At
            </Typography>
            <Grid container spacing={3}>
              {[
                "La Martiniere for Boys",
                "Sri Sri Academy",
                "Narayana Bally School",
                "South City International School",
              ].map((school, i) => (
                <Grid item xs={12} sm={6} md={3} key={i}>
                  <Box
                    sx={{
                      p: 3,
                      textAlign: "center",
                      borderRadius: "16px",
                      bgcolor: "background.paper",
                      border: `2px solid ${alpha(theme.palette.divider, 0.1)}`,
                      transition: "all 0.3s ease",
                      height: "100%",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                      "&:hover": {
                        borderColor: theme.palette.secondary.main,
                        transform: "translateY(-6px)",
                        boxShadow: `0 12px 24px ${alpha(theme.palette.secondary.main, 0.15)}`,
                      },
                    }}
                  >
                    <School
                      size={32}
                      strokeWidth={2}
                      color={theme.palette.primary.main}
                      style={{ marginBottom: 12 }}
                    />
                    <Typography
                      variant="body2"
                      sx={{
                        fontWeight: 700,
                        color: "text.primary",
                        fontSize: "0.9rem",
                        lineHeight: 1.4,
                      }}
                    >
                      {school}
                    </Typography>
                  </Box>
                </Grid>
              ))}
            </Grid>
          </Box>
        </Container>
      </Box>

      {/* COACHES */}
      <Container maxWidth="lg" sx={{ py: { xs: 10, md: 14 } }}>
        <Box sx={{ textAlign: "center", mb: 8 }}>
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
            <Grid item xs={12} sm={6} md={3} key={i}>
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
                  variant="body2"
                  sx={{
                    mt: 2,
                    fontWeight: 800,
                    color: "primary.main",
                  }}
                >
                  {coach.exp} Experience
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
            endIcon={<ArrowRight size={20} strokeWidth={2.5} />}
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
