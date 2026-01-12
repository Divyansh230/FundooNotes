import React from "react";
import {
  Box,
  Card,
  CardContent,
  TextField,
  Typography,
  Button,
  Link,
} from "@mui/material";
import shield from "../assets/shield.jpeg";

const Signup = () => {
  return (
    <>
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          bgcolor: "#f8f9fa",
        }}
      >
        <Card sx={{ width: 900, p: 2 }}>
          <CardContent>
            <Box sx={{ display: "flex" }}>
              {/*Left Content*/}
              <Box sx={{ flex: 1, pr: 4 }}>
                {/* Logo */}
                <Typography
                  variant="h5"
                  fontWeight={600}
                  color="#1a73e8"
                  mb={1}
                >
                  Fundoo
                </Typography>

                <Typography variant="h4" fontWeight={500} mb={3}>
                  Create your Fundoo Account
                </Typography>

                {/* Name */}
                <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
                  <TextField label="First name" fullWidth />
                  <TextField label="Last name" fullWidth />
                </Box>

                {/* Email */}
                <TextField
                  label="Your email address"
                  fullWidth
                  sx={{ mb: 1 }}
                />

                <Typography variant="body2" color="text.secondary" mb={1}>
                  You'll need to confirm that this email belongs to you.
                </Typography>

                <Link underline="none" sx={{ fontWeight: 500 }}>
                  Create a new Gmail address instead
                </Link>

                {/* Password */}
                <Box sx={{ display: "flex", gap: 2, mt: 3 }}>
                  <TextField label="Password" type="password" fullWidth />
                  <TextField label="Confirm" type="password" fullWidth />
                </Box>

                <Typography variant="body2" color="text.secondary" mt={1}>
                  Use 8 or more characters with a mix of letters, numbers &
                  symbols
                </Typography>
                {/* Actions */}
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    mt: 4,
                  }}
                >
                  <Link underline="none" fontWeight={500}>
                    Sign in instead
                  </Link>

                  <Button
                    variant="contained"
                    sx={{
                      bgcolor: "#1a73e8",
                      textTransform: "none",
                      px: 4,
                    }}
                  >
                    Next
                  </Button>
                </Box>
              </Box>
              {/*Right Content*/}
              <Box
                sx={{
                  flex: 1,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <img
                  src={shield}
                  alt="Security Illustration"
                  style={{
                    width: "80%",
                    maxWidth: "300px",
                  }}
                />
                <Typography variant="body1" align="center" mt={2}>
                  One account. All of Fundoo working for you.
                </Typography>
              </Box>
            </Box>
          </CardContent>
        </Card>
      </Box>
    </>
  );
};

export default Signup;
