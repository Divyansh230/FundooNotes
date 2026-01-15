import React, { useRef, useState } from "react";
import { Link as RouterLink, useLocation, useNavigate } from "react-router-dom";
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
import signupUser from '../Routes/AuthRoute';

const Signup = () => {
  //const location = useLocation();
  const firstNameRef = useRef();
  const lastNameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();
  //console.log(location);
  const [errors, setErrors] = useState({});
  const [loading,setLoading]=useState(false)
  const navigate=useNavigate();


  const handleSubmit = async() => {
    const firstName = firstNameRef.current.value;
    const lastName = lastNameRef.current.value;
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    const confirmPassword = confirmPasswordRef.current.value;

    let newErrors = {};

    if (!firstName.match(/^[A-Za-z]{2,}$/)) {
      newErrors.firstName = "*enter a valid first name";
    }

    if (!lastName.match(/^[A-Za-z]{2,}$/)) {
      newErrors.lastName = "*enter a valid last name";
    }

    if (!email.endsWith("@gmail.com")) {
      newErrors.email = "*email must end with @gmail.com";
    }

    if (password.length < 8) {
      newErrors.password = "*password must be at least 8 characters";
    }

    if (password !== confirmPassword) {
      newErrors.confirmPassword = "*passwords do not match";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    setLoading(true);


     const payload = {
      firstName,
      lastName,
      email,
      password,
      service: "advance", // ❗ mandatory
    };
    try{
      const response=await signupUser(payload)
      console.log("Signup SuccessFull",response.data);

      navigate("/login")
    }
    catch(error){
       console.log(`Error is ${error}`)
       alert(
        "Signup Failed Please try again...!"
       )
    }finally{
      setLoading(false)
    }
  };



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
                  <TextField
                    label="First name"
                    fullWidth
                    inputRef={firstNameRef}
                    error={!!errors.firstName}
                    helperText={errors.firstName}
                  />
                  <TextField
                    label="Last name"
                    fullWidth
                    inputRef={lastNameRef}
                    error={!!errors.lastName}
                    helperText={errors.lastName}
                  />
                </Box>

                {/* Email */}
                <TextField
                  label="Your email address"
                  fullWidth
                  sx={{ mb: 1 }}
                  inputRef={emailRef}
                  error={!!errors.email}
                  helperText={errors.email}
                />

                <Typography variant="body2" color="text.secondary" mb={1}>
                  You'll need to confirm that this email belongs to you.
                </Typography>

                

                {/* Password */}
                <Box sx={{ display: "flex", gap: 2, mt: 3 }}>
                  <TextField
                    label="Password"
                    type="password"
                    fullWidth
                    inputRef={passwordRef}
                    error={!!errors.password}
                    helperText={errors.password}
                  />
                  <TextField
                    label="Confirm"
                    type="password"
                    fullWidth
                    inputRef={confirmPasswordRef}
                    error={!!errors.confirmPassword}
                    helperText={errors.confirmPassword}
                  />
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
                  <Link
                    component={RouterLink}
                    to="/login"
                    underline="none"
                    fontWeight={500}
                  >
                    Sign in instead
                  </Link>

                  <Button
                    variant="contained"
                    sx={{
                      bgcolor: "#1a73e8",
                      textTransform: "none",
                      px: 4,
                    }}
                    onClick={handleSubmit}
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
