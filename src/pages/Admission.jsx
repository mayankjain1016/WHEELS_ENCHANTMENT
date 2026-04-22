import {
  Box,
  Container,
  Typography,
  Grid,
  TextField,
  Button,
  Card,
  CardContent,
  useTheme,
  alpha,
} from "@mui/material";
import { useState } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import SectionHeader from "../components/SectionHeader";
import { CheckCircle2, Clock, Info, Upload } from 'lucide-react';

const SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycby0XFSHIPm7LenMEoEJyJA1r5krVDPdG2pSZ2bnvLmpL5Dfd08SArvacHqAdtoF-IVI/exec";

const Admission = () => {
  const theme = useTheme();
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

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const resetForm = () => {
    setFormData({
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
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const iframeName = "hidden_iframe_submission";

      const oldIframe = document.getElementsByName(iframeName)[0];
      if (oldIframe) oldIframe.remove();

      const iframe = document.createElement("iframe");
      iframe.name = iframeName;
      iframe.style.display = "none";
      document.body.appendChild(iframe);

      const form = document.createElement("form");
      form.method = "POST";
      form.action = SCRIPT_URL;
      form.target = iframeName;
      form.style.display = "none";

      const fields = {
        studentName: formData.studentName,
        dateOfBirth: formData.dob,
        school: formData.school,
        fatherName: formData.fatherName,
        fatherMobile: formData.fatherMobile,
        motherName: formData.motherName,
        motherMobile: formData.motherMobile,
        address: formData.address,
        email: formData.email,
      };

      Object.entries(fields).forEach(([key, value]) => {
        const input = document.createElement("input");
        input.type = "hidden";
        input.name = key;
        input.value = value || "";
        form.appendChild(input);
      });

      document.body.appendChild(form);

      iframe.onload = () => {
        alert("Thank you! We will contact you soon.");
        resetForm();
        setLoading(false);
        setError("");

        form.remove();
        setTimeout(() => {
          iframe.remove();
        }, 300);
      };

      form.submit();
    } catch (err) {
      console.error("Submission error:", err);
      setError("Form submit nahi ho paya. Please try again.");
      setLoading(false);
    }
  };

  return (
    <Box sx={{ py: { xs: 6, md: 8 }, bgcolor: "#f8f9fb" }}>
      <Container maxWidth="lg">
        <SectionHeader
          title="Join Wheels Enchntment"
          subtitle="Start your skating journey with us"
        />

        <Grid container spacing={6}>
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

                  <Grid item xs={12}>
                    <Box sx={{ display: "flex", justifyContent: "center" }}>
                      <Box sx={{ width: { xs: "100%", sm: "80%", md: "70%" } }}>
                        <Button
                          variant="outlined"
                          component="label"
                          fullWidth
                          startIcon={<Upload size={20} strokeWidth={2.5} />}
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
                          />
                        </Button>

                        <Typography
                          variant="body2"
                          sx={{
                            mt: 1,
                            textAlign: "center",
                            color: "text.secondary",
                          }}
                        >
                          Photo upload temporarily disabled
                        </Typography>
                      </Box>
                    </Box>
                  </Grid>

                  <Grid item xs={12}>
                    <Box sx={{ display: "flex", justifyContent: "center" }}>
                      <Box sx={{ width: { xs: "100%", sm: "80%", md: "70%" } }}>
                        <Button
                          variant="outlined"
                          component="label"
                          fullWidth
                          startIcon={<Upload size={20} strokeWidth={2.5} />}
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

                        <Typography
                          variant="body2"
                          sx={{
                            mt: 1,
                            textAlign: "center",
                            color: "text.secondary",
                          }}
                        >
                          Aadhaar upload temporarily disabled
                        </Typography>
                      </Box>
                    </Box>
                  </Grid>

                  {error && (
                    <Grid item xs={12}>
                      <Typography
                        variant="body2"
                        sx={{ color: "error.main", textAlign: "center" }}
                      >
                        {error}
                      </Typography>
                    </Grid>
                  )}

                  <Grid item xs={12}>
                    <Button
                      type="submit"
                      variant="contained"
                      color="secondary"
                      size="large"
                      fullWidth
                      disabled={loading}
                      sx={{
                        py: 1.6,
                        fontWeight: 700,
                        textTransform: "none",
                        borderRadius: "12px",
                        mt: 1,
                      }}
                    >
                      {loading ? (
                        <CircularProgress size={24} sx={{ color: "white" }} />
                      ) : (
                        "Submit Application"
                      )}
                    </Button>
                  </Grid>
                </Grid>
              </Box>
            </Card>
          </Grid>

          <Grid item xs={12} md={5}>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
              <Card sx={{ borderRadius: "18px" }}>
                <CardContent sx={{ p: 3 }}>
                  <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                    <Box
                      sx={{
                        width: 48,
                        height: 48,
                        borderRadius: '12px',
                        background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        mr: 2,
                        boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                      }}
                    >
                      <Clock size={24} strokeWidth={2.5} style={{ color: 'white' }} />
                    </Box>
                    <Typography variant="h6" sx={{ fontWeight: 700 }}>
                      Training Schedule
                    </Typography>
                  </Box>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                    <strong>Weekdays:</strong> 3:00 PM - 9:00 PM
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
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
                    <Box
                      sx={{
                        width: 48,
                        height: 48,
                        borderRadius: '12px',
                        background: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        mr: 2,
                        boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                      }}
                    >
                      <CheckCircle2 size={24} strokeWidth={2.5} style={{ color: 'white' }} />
                    </Box>
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
                      <Box key={index} sx={{ display: "flex", alignItems: "center" }}>
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
                    <Box
                      sx={{
                        width: 48,
                        height: 48,
                        borderRadius: '12px',
                        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        mr: 2,
                        boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                      }}
                    >
                      <Info size={24} strokeWidth={2.5} style={{ color: 'white' }} />
                    </Box>
                    <Typography variant="h6" sx={{ fontWeight: 700 }}>
                      Guidelines
                    </Typography>
                  </Box>
                  <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.8 }}>
                    Please fill all required details carefully. Photo and Aadhaar upload
                    options are currently visible for future use, but submissions are
                    currently processed with text details only.
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