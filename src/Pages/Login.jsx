import { useState } from "react";
import {
  Box,
  Card,
  CardContent,
  TextField,
  Typography,
  Button,
  Link,
  IconButton,
  InputAdornment,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

export default function GoogleLoginUI() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        bgcolor: "#f8f9fa",
      }}
    >
      <Card sx={{ width: 420, p: 2 }}>
        <CardContent>

          {/* Logo */}
          <Typography
            variant="h5"
            fontWeight={600}
            color="#1a73e8"
            mb={1}
          >
            Google
          </Typography>

          {/* Heading */}
          <Typography variant="h4" fontWeight={500} mb={1}>
            Sign in
          </Typography>

          <Typography variant="body1" color="text.secondary" mb={3}>
            to continue to Google
          </Typography>

          {/* Email */}
          <TextField
            label="Email or phone"
            fullWidth
            sx={{ mb: 2 }}
          />

          <Link underline="none" fontWeight={500}>
            Forgot email?
          </Link>

          {/* Password */}
          <TextField
            label="Enter your password"
            type={showPassword ? "text" : "password"}
            fullWidth
            sx={{ mt: 3 }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowPassword(!showPassword)}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          <Link underline="none" fontWeight={500} sx={{ mt: 1, display: "block" }}>
            Forgot password?
          </Link>

          {/* Info */}
          <Typography variant="body2" color="text.secondary" mt={4}>
            Not your computer? Use Guest mode to sign in privately.
          </Typography>

          <Link underline="none" fontWeight={500}>
            Learn more
          </Link>

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
              Create account
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

        </CardContent>
      </Card>
    </Box>
  );
}
