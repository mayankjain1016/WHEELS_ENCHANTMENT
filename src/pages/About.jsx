import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  Avatar,
  useTheme,
  alpha,
  Button,
} from "@mui/material";
import { Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { ArrowRight, Sparkles, ShieldCheck, Award, Star, Heart, Quote, Target, Eye, MapPin } from 'lucide-react';
import backgroundImg2 from "../assets/Background_imgs/backgroundimg2.jpeg";
import backgroundImg3 from "../assets/Background_imgs/backgroundimg3.jpeg";
import backgroundImg6 from "../assets/Background_imgs/backgroundimg6.jpeg";
import coachImg1 from "../assets/Coachs/Coach1.jpeg";
import coachImg2 from "../assets/Coachs/Coach2.jpeg";
import coachImg3 from "../assets/Coachs/Coach3.jpeg";
import coachImg4 from "../assets/Coachs/Coach4.jpeg";

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
      icon: <Sparkles size={36} strokeWidth={2.5} />,
      title: "Expert Coaches",
      description:
        "Certified professionals with years of skating expertise and teaching experience.",
      gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    },
    {
      icon: <ShieldCheck size={36} strokeWidth={2.5} />,
      title: "Safe Environment",
      description:
        "Child-safe facilities with proper safety equipment and supervised training.",
      gradient: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
    },
    {
      icon: <Award size={36} strokeWidth={2.5} />,
      title: "Structured Learning",
      description:
        "Progressive curriculum designed for skill development at every level.",
      gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
    },
    {
      icon: <Star size={36} strokeWidth={2.5} />,
      title: "Child-Friendly Training",
      description:
        "Age-appropriate methods that make learning fun, engaging, and effective.",
      gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
    },
    {
      icon: <Heart size={36} strokeWidth={2.5} />,
      title: "Skill Development",
      description:
        "Focus on building confidence, balance, coordination, and discipline.",
      gradient: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
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

  const locations = [
    {
      area: "East Kolkata",
      places: [
        "Salt Lake (Sector I–V)",
        "New Town (Action Areas, Eco Park)",
        "Rajarhat",
        "EM Bypass (Ruby, Science City)",
      ],
    },
    {
      area: "North Kolkata",
      places: ["Sinthee", "Cossipore", "Kakurgachi", "Phoolbagan"],
    },
    {
      area: "South Kolkata",
      places: [
        "Gariahat",
        "Ballygunge",
        "Tollygunge",
        "Bhawanipore",
        "Alipore",
        "Behala",
      ],
    },
    {
      area: "Howrah",
      places: ["Mullick Fatak", "Shibpur"],
    },
    {
      area: "Central Kolkata",
      places: [
        "Wood Street",
        "Park Street",
        "Burrabazar",
        "Victoria Memorial",
        "Rowland Row",
        "Minto Park",
      ],
    },
  ];

  const stats = [
    { number: "250+", label: "Active Students" },
    { number: "13+", label: "Years Experience" },
    { number: "100%", label: "Safety Focus" },
    { number: "10+", label: "Certified Coaches" },
  ];

  const testimonials = [
    {
      text: "My daughter has grown so much in confidence since joining Wheels Enchntment. The coaches are patient, professional, and truly care about each child's progress.",
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
          backgroundImage: `url(${backgroundImg6})`,
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
            Wheels Enchntment
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
            Empowering skaters of all ages through expert coaching, structured training, and a supportive community
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
              Wheels Enchntment was founded with a simple yet powerful vision:
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

      {/* MISSION SECTION */}
      <Box sx={{ py: { xs: 10, md: 16 } }}>
        <Container maxWidth="lg">
          <Grid container spacing={{ xs: 6, md: 10 }} alignItems="center">
            <Grid item xs={12} md={6}>
              <Box
                sx={{
                  width: 80,
                  height: 80,
                  borderRadius: "20px",
                  background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "white",
                  mb: 4,
                  boxShadow: '0 8px 24px rgba(0,0,0,0.15)',
                }}
              >
                <Target size={40} strokeWidth={2.5} />
              </Box>
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
                Mission
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography
                variant="body1"
                sx={{
                  color: "text.secondary",
                  lineHeight: 2,
                  fontSize: "1.1rem",
                  fontWeight: 400,
                }}
              >
                At Wheels Enchntment, we're passionate about empowering skaters of all ages and skill levels. Our expert coaches, supportive community, and holistic training approach help you achieve your personal best. We foster a love for skating, promote fitness, and build essential life skills like discipline and teamwork. Join us for a joyful, enriching experience!
              </Typography>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* VISION SECTION */}
      <Box
        sx={{
          bgcolor: alpha(theme.palette.primary.main, 0.03),
          py: { xs: 10, md: 16 },
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={{ xs: 6, md: 10 }} alignItems="center" direction="row-reverse">
            <Grid item xs={12} md={6}>
              <Box
                sx={{
                  width: 80,
                  height: 80,
                  borderRadius: "20px",
                  background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "white",
                  mb: 4,
                  boxShadow: '0 8px 24px rgba(0,0,0,0.15)',
                }}
              >
                <Eye size={40} strokeWidth={2.5} />
              </Box>
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
                Vision
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography
                variant="body1"
                sx={{
                  color: "text.secondary",
                  lineHeight: 2,
                  fontSize: "1.1rem",
                  fontWeight: 400,
                }}
              >
                Wheels Enchntment: Where passion meets excellence. We envision a vibrant community inspiring skaters of all ages and backgrounds to achieve their fullest potential. Through world-class coaching, inclusivity, and innovative programs, we cultivate life skills and a love for skating. Join us in shaping the future of skating!
              </Typography>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* WHY CHOOSE US SECTION */}
      <Box sx={{ py: { xs: 10, md: 14 } }}>
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
                    bgcolor: "white",
                    border: `1px solid ${alpha(
                      theme.palette.divider,
                      0.1
                    )}`,
                    boxShadow: "0 10px 30px rgba(0,0,0,0.06)",
                    transition: "all 0.4s ease",
                    "&:hover": {
                      transform: "translateY(-12px)",
                      boxShadow: "0 20px 50px rgba(0,0,0,0.12)",
                    },
                  }}
                >
                  <Box
                    sx={{
                      width: 70,
                      height: 70,
                      borderRadius: "18px",
                      background: item.gradient,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "white",
                      mb: 3,
                      boxShadow: '0 8px 24px rgba(0,0,0,0.15)',
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

      {/* LOCATIONS SECTION */}
      <Container maxWidth="lg" sx={{ py: { xs: 10, md: 14 } }} id="locations">
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
            Serving Kolkata & Beyond
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
            We bring professional skating training to multiple locations across
            Kolkata, making it convenient for families everywhere.
          </Typography>
        </Box>

        <Grid container spacing={3}>
          {locations.map((location, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card
                elevation={0}
                sx={{
                  height: "100%",
                  p: 3.5,
                  borderRadius: "20px",
                  bgcolor: "white",
                  border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
                  boxShadow: "0 10px 30px rgba(0,0,0,0.06)",
                  transition: "all 0.35s ease",
                  "&:hover": {
                    transform: "translateY(-8px)",
                    boxShadow: "0 20px 45px rgba(0,0,0,0.1)",
                    borderColor: alpha(theme.palette.secondary.main, 0.3),
                  },
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1.5,
                    mb: 2.5,
                  }}
                >
                  <Box
                    sx={{
                      width: 48,
                      height: 48,
                      borderRadius: "12px",
                      background: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "white",
                      boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                    }}
                  >
                    <MapPin size={20} strokeWidth={2.5} />
                  </Box>
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: 800,
                      fontSize: "1.15rem",
                    }}
                  >
                    {location.area}
                  </Typography>
                </Box>
                <Box sx={{ pl: 0.5 }}>
                  {location.places.map((place, i) => (
                    <Typography
                      key={i}
                      variant="body2"
                      sx={{
                        color: "text.secondary",
                        lineHeight: 2,
                        fontSize: "0.95rem",
                        display: "flex",
                        alignItems: "center",
                        gap: 1,
                        "&:before": {
                          content: '"•"',
                          color: "secondary.main",
                          fontWeight: 700,
                          fontSize: "1.2rem",
                        },
                      }}
                    >
                      {place}
                    </Typography>
                  ))}
                </Box>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* COACHES SECTION */}
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
      </Box>

      {/* STUDENT EXPERIENCE SECTION */}
      <Box sx={{ py: { xs: 10, md: 14 } }}>
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
                At Wheels Enchntment, we create an environment where children
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
                fontSize: { xs: "2rem", md: "3rem" },
              }}
            >
              Numbers That Speak
            </Typography>
          </Box>
          <Grid container spacing={4}>
            {stats.map((stat, index) => (
              <Grid item xs={6} md={3} key={index}>
                <CountUpNumber value={stat.number} label={stat.label} />
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* TESTIMONIALS SECTION */}
      <Box sx={{ py: { xs: 10, md: 14 } }}>
        <Container maxWidth="lg">
          <Box sx={{ textAlign: "center", mb: 8 }}>
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
                  <Quote
                    size={40}
                    strokeWidth={1.5}
                    style={{
                      color: theme.palette.secondary.main,
                      opacity: 0.3,
                      marginBottom: 16,
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

      {/* FINAL CTA SECTION */}
      <Box
        sx={{
          bgcolor: "primary.main",
          py: { xs: 10, md: 14 },
          position: "relative",
          overflow: "hidden",
        }}
      >
        <Container maxWidth="md" sx={{ position: "relative", zIndex: 2 }}>
          <Box sx={{ textAlign: "center" }}>
            <Typography
              variant="overline"
              sx={{
                color: "secondary.main",
                fontWeight: 800,
                letterSpacing: 3,
              }}
            >
              JOIN US TODAY
            </Typography>
            <Typography
              variant="h2"
              sx={{
                color: "white",
                fontWeight: 900,
                mt: 1,
                mb: 3,
                fontSize: { xs: "2rem", md: "3rem" },
                lineHeight: 1.2,
              }}
            >
              Start Your Skating Journey
            </Typography>
            <Typography
              variant="body1"
              sx={{
                color: alpha("#fff", 0.9),
                mb: 5,
                lineHeight: 1.8,
                fontSize: "1.1rem",
                maxWidth: 600,
                mx: "auto",
              }}
            >
              Become part of the Wheels Enchntment family. Experience world-class coaching, a supportive community, and a transformative skating journey.
            </Typography>
            <Button
              component={Link}
              to="/admission"
              variant="contained"
              color="secondary"
              size="large"
              endIcon={<ArrowRight size={20} strokeWidth={2.5} />}
              sx={{
                py: 2,
                px: 5,
                fontSize: "1rem",
                fontWeight: 700,
                borderRadius: "12px",
                textTransform: "none",
                boxShadow: "0 8px 24px rgba(233, 30, 99, 0.4)",
                transition: "all 0.3s ease",
                "&:hover": {
                  transform: "translateY(-4px)",
                  boxShadow: "0 12px 32px rgba(233, 30, 99, 0.5)",
                },
              }}
            >
              Apply for Admission
            </Button>
          </Box>
        </Container>
      </Box>
    </Box>
  );
};

export default About;
