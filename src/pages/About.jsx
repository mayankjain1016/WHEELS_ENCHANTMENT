import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Avatar,
  useTheme,
  alpha,
  Stack,
} from "@mui/material";
import { Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import SchoolIcon from "@mui/icons-material/School";
import SecurityIcon from "@mui/icons-material/Security";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import VerifiedIcon from "@mui/icons-material/Verified";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FormatQuoteIcon from "@mui/icons-material/FormatQuote";
import backgroundImg2 from "../assets/Background_imgs/backgroundimg2.jpeg";
import backgroundImg3 from "../assets/Background_imgs/backgroundimg3.jpeg";

const CountUpNumber = ({ value, label }) => {
  const [count, setCount] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);
  const ref = useRef(null);

  const numericValue = parseInt(value, 10);
  const suffix = value.includes("+") ? "+" : value.includes("%") ? "%" : "";

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasStarted) {
          setHasStarted(true);
        }
      },
      { threshold: 0.4 }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [hasStarted]);

  useEffect(() => {
    if (!hasStarted) return;

    let start = 0;
    const duration = 2000;
    const incrementTime = 16;
    const step = Math.ceil(numericValue / (duration / incrementTime));

    const timer = setInterval(() => {
      start += step;

      if (start >= numericValue) {
        setCount(numericValue);
        clearInterval(timer);
      } else {
        setCount(start);
      }
    }, incrementTime);

    return () => clearInterval(timer);
  }, [hasStarted, numericValue]);

  return (
    <Box ref={ref} sx={{ textAlign: "center" }}>
      <Typography
        variant="h2"
        sx={{
          fontWeight: 900,
          color: "primary.main",
          fontSize: { xs: "2.5rem", md: "3.5rem" },
          mb: 1,
        }}
      >
        {count}
        {suffix}
      </Typography>
      <Typography
        variant="h6"
        sx={{
          fontWeight: 600,
          color: "text.secondary",
        }}
      >
        {label}
      </Typography>
    </Box>
  );
};

const About = () => {
  const theme = useTheme();

  const whyChooseUs = [
    {
      icon: <SchoolIcon fontSize="large" />,
      title: "Expert Coaches",
      description:
        "Certified professionals with years of skating expertise and teaching experience.",
    },
    {
      icon: <SecurityIcon fontSize="large" />,
      title: "Safe Environment",
      description:
        "Child-safe facilities with proper safety equipment and supervised training.",
    },
    {
      icon: <EmojiEventsIcon fontSize="large" />,
      title: "Structured Learning",
      description:
        "Progressive curriculum designed for skill development at every level.",
    },
    {
      icon: <VerifiedIcon fontSize="large" />,
      title: "Child-Friendly Training",
      description:
        "Age-appropriate methods that make learning fun, engaging, and effective.",
    },
    {
      icon: <FavoriteIcon fontSize="large" />,
      title: "Skill Development",
      description:
        "Focus on building confidence, balance, coordination, and discipline.",
    },
  ];

  const coaches = [
    {
      name: "Sarah Mitchell",
      role: "Head Coach",
      experience: "12+ Years",
      specialty: "Youth Skating Specialist",
      image: "https://i.pravatar.cc/300?img=1",
    },
    {
      name: "Michael Chen",
      role: "Senior Coach",
      experience: "10+ Years",
      specialty: "Speed & Technique Training",
      image: "https://i.pravatar.cc/300?img=13",
    },
    {
      name: "Emily Rodriguez",
      role: "Safety Coach",
      experience: "8+ Years",
      specialty: "Balance & Form & Safety",
      image: "https://i.pravatar.cc/300?img=5",
    },
  ];

  const stats = [
    { number: "150+", label: "Active Students" },
    { number: "10+", label: "Years Experience" },
    { number: "100%", label: "Safety Focus" },
    { number: "15+", label: "Certified Coaches" },
  ];

  const testimonials = [
    {
      text: "My daughter has grown so much in confidence since joining Wheels Enchantment. The coaches are patient, professional, and truly care about each child's progress.",
      author: "Priya Sharma",
      role: "Parent",
    },
    {
      text: "The structured approach and safe environment gave us complete peace of mind. Our son loves his skating sessions and has made incredible progress.",
      author: "Rajesh Kumar",
      role: "Parent",
    },
    {
      text: "Exceptional coaching and a wonderful community. The academy has exceeded all our expectations in every way.",
      author: "Anita Desai",
      role: "Parent",
    },
  ];

  return (
    <Box sx={{ bgcolor: "background.default" }}>
      {/* HERO SECTION*/}
      <Box
        sx={{
          position: "relative",
          minHeight: { xs: "60vh", md: "70vh" },
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundImage: `url(https://images.unsplash.com/photo-1547447134-cd3f5c716030?auto=format&fit=crop&w=1800&q=80)`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          "&::before": {
            content: '""',
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(to bottom, rgba(11, 31, 58, 0.85), rgba(11, 31, 58, 0.75))",
            zIndex: 1,
          },
        }}
      >
        <Container
          maxWidth="md"
          sx={{ position: "relative", zIndex: 2, textAlign: "center" }}
        >
          <Typography
            variant="overline"
            sx={{
              color: "secondary.main",
              fontWeight: 800,
              letterSpacing: 4,
              fontSize: "0.95rem",
            }}
          >
            ABOUT US
          </Typography>
          <Typography
            variant="h1"
            sx={{
              color: "white",
              fontWeight: 900,
              mt: 2,
              mb: 3,
              fontSize: { xs: "2.5rem", md: "4rem" },
              lineHeight: 1.1,
            }}
          >
            Wheels Enchantment
          </Typography>
          <Typography
            variant="h6"
            sx={{
              color: alpha("#fff", 0.9),
              fontWeight: 300,
              maxWidth: 700,
              mx: "auto",
              lineHeight: 1.8,
              fontSize: { xs: "1rem", md: "1.2rem" },
            }}
          >
            Where passion meets professional skating training
          </Typography>
        </Container>
      </Box>

      {/* OUR STORY SECTION */}
      <Container maxWidth="lg" sx={{ py: { xs: 10, md: 16 } }}>
        <Grid container spacing={{ xs: 6, md: 10 }} alignItems="center">
          <Grid item xs={12} md={6}>
            <Typography
              variant="h2"
              sx={{
                fontWeight: 900,
                mt: 1,
                mb: 3,
                fontSize: { xs: "2rem", md: "3rem" },
                lineHeight: 1.2,
              }}
            >
              Building Champions, One Skate at a Time
            </Typography>
            <Typography
              variant="body1"
              sx={{
                color: "text.secondary",
                lineHeight: 1.9,
                mb: 2.5,
                fontSize: "1.05rem",
              }}
            >
              Wheels Enchantment was founded with a simple yet powerful vision:
              to create a safe, inspiring space where children can discover the
              joy of skating while building confidence, discipline, and lifelong
              skills.
            </Typography>
            <Typography
              variant="body1"
              sx={{
                color: "text.secondary",
                lineHeight: 1.9,
                mb: 2.5,
                fontSize: "1.05rem",
              }}
            >
              Our academy combines expert coaching, structured learning
              programs, and a child-friendly environment to ensure every student
              receives the attention and guidance they deserve. We believe
              skating is more than just a sport—it's a journey of growth,
              perseverance, and joy.
            </Typography>
            <Typography
              variant="body1"
              sx={{
                color: "text.secondary",
                lineHeight: 1.9,
                fontSize: "1.05rem",
              }}
            >
              With over a decade of experience and hundreds of successful
              students, we continue to set the standard for professional skating
              education that parents trust and children love.
            </Typography>
          </Grid>

          <Grid item xs={12} md={6}>
            <Box
              sx={{
                position: "relative",
                borderRadius: "24px",
                overflow: "hidden",
                boxShadow: "0 30px 60px rgba(0,0,0,0.15)",
              }}
            >
              <Box
                component="img"
                src={backgroundImg2}
                alt="Kids skating training"
                sx={{
                  width: "100%",
                  height: { xs: 320, sm: 400, md: 550 },
                  objectFit: "cover",
                }}
              />
            </Box>
          </Grid>
        </Grid>
      </Container>

      {/* WHY CHOOSE US SECTION */}
      <Box
        sx={{
          bgcolor: alpha(theme.palette.primary.main, 0.03),
          py: { xs: 10, md: 14 },
        }}
      >
        <Container maxWidth="lg">
          <Box sx={{ textAlign: "center", mb: 8 }}>
            <Typography
              variant="h2"
              sx={{
                fontWeight: 900,
                mt: 1,
                mb: 2,
                fontSize: { xs: "2rem", md: "3rem" },
              }}
            >
              Excellence in Every Aspect
            </Typography>
            <Typography
              variant="body1"
              sx={{
                color: "text.secondary",
                maxWidth: 700,
                mx: "auto",
                lineHeight: 1.8,
                fontSize: "1.05rem",
              }}
            >
              We provide a comprehensive skating education that prioritizes
              safety, skill development, and personal growth.
            </Typography>
          </Box>

          <Grid container spacing={4}>
            {whyChooseUs.map((item, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Card
                  elevation={0}
                  sx={{
                    height: "100%",
                    p: 4,
                    borderRadius: "20px",
                    bgcolor: alpha("#fff", 0.8),
                    backdropFilter: "blur(10px)",
                    border: `1px solid ${alpha(
                      theme.palette.divider,
                      0.1
                    )}`,
                    transition: "all 0.4s ease",
                    "&:hover": {
                      transform: "translateY(-12px)",
                      boxShadow: "0 20px 50px rgba(0,0,0,0.1)",
                      bgcolor: "white",
                    },
                  }}
                >
                  <Box
                    sx={{
                      width: 70,
                      height: 70,
                      borderRadius: "18px",
                      bgcolor: alpha(theme.palette.secondary.main, 0.1),
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "secondary.main",
                      mb: 3,
                    }}
                  >
                    {item.icon}
                  </Box>
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: 800,
                      mb: 1.5,
                      fontSize: "1.15rem",
                    }}
                  >
                    {item.title}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      color: "text.secondary",
                      lineHeight: 1.8,
                      fontSize: "0.95rem",
                    }}
                  >
                    {item.description}
                  </Typography>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* STUDENT EXPERIENCE SECTION */}
      <Box
        sx={{
          bgcolor: alpha(theme.palette.primary.main, 0.03),
          py: { xs: 10, md: 14 },
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={{ xs: 6, md: 10 }} alignItems="center">
            <Grid item xs={12} md={6}>
              <Box
                sx={{
                  borderRadius: "24px",
                  overflow: "hidden",
                  boxShadow: "0 30px 60px rgba(0,0,0,0.15)",
                }}
              >
                <Box
                  component="img"
                  src={backgroundImg3}
                  alt="Student experience"
                  sx={{
                    width: "100%",
                    height: { xs: 320, sm: 400, md: 500 },
                    objectFit: "cover",
                  }}
                />
              </Box>
            </Grid>

            <Grid item xs={12} md={6}>
              <Typography
                variant="overline"
                sx={{
                  color: "secondary.main",
                  fontWeight: 800,
                  letterSpacing: 3,
                }}
              >
                STUDENT EXPERIENCE
              </Typography>
              <Typography
                variant="h2"
                sx={{
                  fontWeight: 900,
                  mt: 1,
                  mb: 3,
                  fontSize: { xs: "2rem", md: "3rem" },
                  lineHeight: 1.2,
                }}
              >
                Where Learning Meets Fun
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  color: "text.secondary",
                  lineHeight: 1.9,
                  mb: 2.5,
                  fontSize: "1.05rem",
                }}
              >
                At Wheels Enchantment, we create an environment where children
                feel excited to learn, safe to explore, and motivated to
                improve. Our approach balances structured training with playful
                engagement.
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  color: "text.secondary",
                  lineHeight: 1.9,
                  mb: 2.5,
                  fontSize: "1.05rem",
                }}
              >
                Every session is designed to build not just skating skills, but
                also confidence, teamwork, and resilience. We celebrate
                progress, encourage effort, and ensure every child feels valued
                and supported.
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  color: "text.secondary",
                  lineHeight: 1.9,
                  fontSize: "1.05rem",
                }}
              >
                Our students don't just learn to skate—they discover their
                potential, make lasting friendships, and develop a lifelong love
                for the sport.
              </Typography>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* STATS SECTION */}
      <Container maxWidth="lg" sx={{ py: { xs: 10, md: 14 } }}>
        <Grid container spacing={4}>
          {stats.map((stat, index) => (
            <Grid item xs={6} md={3} key={index}>
              <CountUpNumber value={stat.number} label={stat.label} />
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* TESTIMONIALS SECTION */}
      <Box
        sx={{
          bgcolor: alpha(theme.palette.primary.main, 0.03),
          py: { xs: 10, md: 14 },
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
              TESTIMONIALS
            </Typography>
            <Typography
              variant="h2"
              sx={{
                fontWeight: 900,
                mt: 1,
                fontSize: { xs: "2rem", md: "3rem" },
              }}
            >
              What Parents Say
            </Typography>
          </Box>

          <Grid container spacing={4}>
            {testimonials.map((testimonial, index) => (
              <Grid item xs={12} md={4} key={index}>
                <Card
                  elevation={0}
                  sx={{
                    height: "100%",
                    p: 4,
                    borderRadius: "20px",
                    bgcolor: "white",
                    border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
                    boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
                  }}
                >
                  <FormatQuoteIcon
                    sx={{
                      fontSize: 40,
                      color: "secondary.main",
                      opacity: 0.3,
                      mb: 2,
                    }}
                  />
                  <Typography
                    variant="body1"
                    sx={{
                      color: "text.secondary",
                      lineHeight: 1.8,
                      mb: 3,
                      fontStyle: "italic",
                    }}
                  >
                    "{testimonial.text}"
                  </Typography>
                  <Typography
                    variant="subtitle1"
                    sx={{
                      fontWeight: 700,
                      mb: 0.5,
                    }}
                  >
                    {testimonial.author}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      color: "text.secondary",
                    }}
                  >
                    {testimonial.role}
                  </Typography>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>
    </Box>
  );
};

export default About;
