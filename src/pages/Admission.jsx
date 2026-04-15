import {
  Box,
  Container,
  Typography,
  Grid,
  TextField,
  Button,
  Card,
  CardContent,
} from "@mui/material";
import { useState } from "react";
import SectionHeader from "../components/SectionHeader";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ScheduleIcon from "@mui/icons-material/Schedule";
import InfoIcon from "@mui/icons-material/Info";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

const Admission = () => {
  const [formData, setFormData] = useState({
    studentName: "",
    dob: "",
    school: "",
    fatherName: "",
    fatherMobile: "",
    motherName: "",
    motherMobile: "",
    address: "",
    email: "",
    passportPhoto: null,
    aadhaarCard: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    alert("Thank you! We will contact you soon.");
  };

  return (
    <Box sx={{ py: { xs: 6, md: 8 }, bgcolor: "#f8f9fb" }}>
      <Container maxWidth="lg">
        <SectionHeader
          title="Join Wheels Enchantment"
          subtitle="Start your skating journey with us"
        />

        <Grid container spacing={6}>
          {/* Admission Form */}
          <Grid item xs={12} md={7}>
            <Card
              sx={{
                p: { xs: 2.5, md: 4 },
                borderRadius: "20px",
                boxShadow: "0 12px 30px rgba(0,0,0,0.08)",
                border: "1px solid rgba(0,0,0,0.04)",
              }}
            >
              <Typography
                variant="h5"
                sx={{
                  fontWeight: 700,
                  mb: 3,
                  color: "primary.main",
                }}
              >
                Admission Form
              </Typography>

              <Box component="form" onSubmit={handleSubmit}>
                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Student’s Name"
                      name="studentName"
                      value={formData.studentName}
                      onChange={handleChange}
                      required
                    />
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Date of Birth"
                      name="dob"
                      type="date"
                      value={formData.dob}
                      onChange={handleChange}
                      required
                      InputLabelProps={{ shrink: true }}
                    />
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="School"
                      name="school"
                      value={formData.school}
                      onChange={handleChange}
                      required
                    />
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Father’s Name"
                      name="fatherName"
                      value={formData.fatherName}
                      onChange={handleChange}
                      required
                    />
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Father’s Mobile Number"
                      name="fatherMobile"
                      value={formData.fatherMobile}
                      onChange={handleChange}
                      required
                    />
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Mother’s Name"
                      name="motherName"
                      value={formData.motherName}
                      onChange={handleChange}
                      required
                    />
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Mother’s Mobile Number"
                      name="motherMobile"
                      value={formData.motherMobile}
                      onChange={handleChange}
                      required
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Address"
                      name="address"
                      multiline
                      rows={3}
                      value={formData.address}
                      onChange={handleChange}
                      required
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Email ID"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </Grid>

                  {/* Passport Photo Upload */}
                  <Grid item xs={12}>
                    <Box sx={{ display: "flex", justifyContent: "center" }}>
                      <Box sx={{ width: { xs: "100%", sm: "80%", md: "70%" } }}>
                        <Button
                          variant="outlined"
                          component="label"
                          fullWidth
                          startIcon={<CloudUploadIcon />}
                          sx={{
                            py: 1.6,
                            textTransform: "none",
                            fontWeight: 600,
                            borderRadius: "12px",
                            borderStyle: "dashed",
                            transition: "all 0.3s ease",
                            "&:hover": {
                              bgcolor: "rgba(0,0,0,0.02)",
                              transform: "translateY(-2px)",
                              borderColor: "secondary.main",
                            },
                          }}
                        >
                          Upload Passport Size Photo
                          <input
                            type="file"
                            hidden
                            name="passportPhoto"
                            accept="image/*"
                            onChange={handleChange}
                            required
                          />
                        </Button>

                        {formData.passportPhoto && (
                          <Typography
                            variant="body2"
                            sx={{
                              mt: 1,
                              textAlign: "center",
                              color: "text.secondary",
                            }}
                          >
                            {formData.passportPhoto.name}
                          </Typography>
                        )}
                      </Box>
                    </Box>
                  </Grid>

                  {/* Aadhaar Upload */}
                  <Grid item xs={12}>
                    <Box sx={{ display: "flex", justifyContent: "center" }}>
                      <Box sx={{ width: { xs: "100%", sm: "80%", md: "70%" } }}>
                        <Button
                          variant="outlined"
                          component="label"
                          fullWidth
                          startIcon={<CloudUploadIcon />}
                          sx={{
                            py: 1.6,
                            textTransform: "none",
                            fontWeight: 600,
                            borderRadius: "12px",
                            borderStyle: "dashed",
                            transition: "all 0.3s ease",
                            "&:hover": {
                              bgcolor: "rgba(0,0,0,0.02)",
                              transform: "translateY(-2px)",
                              borderColor: "secondary.main",
                            },
                          }}
                        >
                          Upload Aadhaar Card (if available)
                          <input
                            type="file"
                            hidden
                            name="aadhaarCard"
                            accept=".pdf,image/*"
                            onChange={handleChange}
                          />
                        </Button>

                        {formData.aadhaarCard && (
                          <Typography
                            variant="body2"
                            sx={{
                              mt: 1,
                              textAlign: "center",
                              color: "text.secondary",
                            }}
                          >
                            {formData.aadhaarCard.name}
                          </Typography>
                        )}
                      </Box>
                    </Box>
                  </Grid>

                  <Grid item xs={12}>
                    <Button
                      type="submit"
                      variant="contained"
                      color="secondary"
                      size="large"
                      fullWidth
                      sx={{
                        py: 1.6,
                        fontWeight: 700,
                        textTransform: "none",
                        borderRadius: "12px",
                        mt: 1,
                      }}
                    >
                      Submit Application
                    </Button>
                  </Grid>
                </Grid>
              </Box>
            </Card>
          </Grid>

          {/* Information Section */}
          <Grid item xs={12} md={5}>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
              <Card sx={{ borderRadius: "18px" }}>
                <CardContent sx={{ p: 3 }}>
                  <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                    <ScheduleIcon
                      sx={{ color: "secondary.main", fontSize: 32, mr: 2 }}
                    />
                    <Typography variant="h6" sx={{ fontWeight: 700 }}>
                      Training Schedule
                    </Typography>
                  </Box>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ mb: 1 }}
                  >
                    <strong>Weekdays:</strong> 3:00 PM - 9:00 PM
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ mb: 1 }}
                  >
                    <strong>Weekends:</strong> 3:00 AM - 9:00 PM
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    <strong>Duration:</strong> 1-hour sessions
                  </Typography>
                </CardContent>
              </Card>

              <Card sx={{ borderRadius: "18px" }}>
                <CardContent sx={{ p: 3 }}>
                  <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                    <CheckCircleIcon
                      sx={{ color: "secondary.main", fontSize: 32, mr: 2 }}
                    />
                    <Typography variant="h6" sx={{ fontWeight: 700 }}>
                      What's Included
                    </Typography>
                  </Box>
                  <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                    {[
                      "Professional coaching",
                      "Safety equipment",
                      "Structured curriculum",
                      "Progress tracking",
                      "Certificate upon completion",
                    ].map((item, index) => (
                      <Box
                        key={index}
                        sx={{ display: "flex", alignItems: "center" }}
                      >
                        <Box
                          sx={{
                            width: 6,
                            height: 6,
                            borderRadius: "50%",
                            bgcolor: "secondary.main",
                            mr: 2,
                          }}
                        />
                        <Typography variant="body2" color="text.secondary">
                          {item}
                        </Typography>
                      </Box>
                    ))}
                  </Box>
                </CardContent>
              </Card>

              <Card sx={{ borderRadius: "18px" }}>
                <CardContent sx={{ p: 3 }}>
                  <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                    <InfoIcon
                      sx={{ color: "secondary.main", fontSize: 32, mr: 2 }}
                    />
                    <Typography variant="h6" sx={{ fontWeight: 700 }}>
                      Guidelines
                    </Typography>
                  </Box>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ lineHeight: 1.8 }}
                  >
                    Please fill all required details carefully. Passport size
                    photo is required. Aadhaar card can be uploaded if
                    available. Parents are requested to provide correct contact
                    details for communication.
                  </Typography>
                </CardContent>
              </Card>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Admission;