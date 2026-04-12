import { Box, Container, Typography, Grid, Card, CardContent } from '@mui/material';
import SectionHeader from '../components/SectionHeader';

const About = () => {
  return (
    <Box sx={{ py: 8 }}>
      <Container maxWidth="lg">
        <SectionHeader 
          title="About Wheels Enchantment" 
          subtitle="Crafting excellence in skating since day one"
        />

        {/* Brand Story */}
        <Box sx={{ mb: 8 }}>
          <Typography variant="h4" sx={{ fontWeight: 600, mb: 3, textAlign: 'center' }}>
            Our Story
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 800, mx: 'auto', textAlign: 'center', lineHeight: 1.8, mb: 2 }}>
            Wheels Enchantment was born from a passion for skating and a commitment to excellence. We believe that every rider deserves equipment that performs at the highest level, whether you're hitting the streets or competing at the professional level.
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 800, mx: 'auto', textAlign: 'center', lineHeight: 1.8 }}>
            Our team of engineers and professional skaters work together to design products that push the boundaries of performance, durability, and style. Every product we create is tested rigorously to ensure it meets our exacting standards.
          </Typography>
        </Box>

        {/* Mission & Values */}
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <Card sx={{ height: '100%', textAlign: 'center', p: 3 }}>
              <CardContent>
                <Typography variant="h5" sx={{ fontWeight: 600, mb: 2, color: 'secondary.main' }}>
                  Our Mission
                </Typography>
                <Typography color="text.secondary">
                  To empower riders worldwide with premium skating products that enhance performance and inspire confidence.
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={4}>
            <Card sx={{ height: '100%', textAlign: 'center', p: 3 }}>
              <CardContent>
                <Typography variant="h5" sx={{ fontWeight: 600, mb: 2, color: 'secondary.main' }}>
                  Our Vision
                </Typography>
                <Typography color="text.secondary">
                  To be the most trusted name in skating, known for innovation, quality, and unwavering commitment to the skating community.
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={4}>
            <Card sx={{ height: '100%', textAlign: 'center', p: 3 }}>
              <CardContent>
                <Typography variant="h5" sx={{ fontWeight: 600, mb: 2, color: 'secondary.main' }}>
                  Our Values
                </Typography>
                <Typography color="text.secondary">
                  Excellence, innovation, authenticity, and community. We're committed to pushing boundaries while staying true to our roots.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Why Choose Us */}
        <Box sx={{ mt: 10, bgcolor: 'background.paper', p: 6, borderRadius: 2 }}>
          <Typography variant="h4" sx={{ fontWeight: 600, mb: 4, textAlign: 'center' }}>
            Why Choose Wheels Enchantment?
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
                Premium Materials
              </Typography>
              <Typography color="text.secondary">
                We source only the finest materials to ensure durability and peak performance in every product.
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
                Expert Engineering
              </Typography>
              <Typography color="text.secondary">
                Our products are designed by engineers who understand the physics of skating at the highest level.
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
                Rider Tested
              </Typography>
              <Typography color="text.secondary">
                Every product is tested by professional riders in real-world conditions before it reaches you.
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
                Community Driven
              </Typography>
              <Typography color="text.secondary">
                We listen to our community and continuously improve based on rider feedback and needs.
              </Typography>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </Box>
  );
};

export default About;
