import React from "react";
import {
  Popover,
  Box,
  Typography,
  Avatar,
  Button,
  IconButton,
  Divider,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import AddIcon from "@mui/icons-material/Add";
import LogoutIcon from "@mui/icons-material/Logout";

const AccountMenu = ({ anchorEl, onClose }) => {
  const open = Boolean(anchorEl);

  const fullName = "divyansh singh";
  const email = "divyanshsinghh2304@gmail.com";

  const firstName = fullName.split(" ")[0];
  const initial = firstName.charAt(0).toUpperCase();

  const googlePopupButtonStyle = {
  height: 52,
  bgcolor:"white",                    
  borderRadius: "999px 16px 16px 999px", 
  textTransform: "none",
  fontWeight: 500,
  borderColor: "#dadce0",
  color: "#3c4043",
  "&:hover": {
    backgroundColor: "#f1f3f4",
    borderColor: "#dadce0",
  },
};
  const googlePopupButtonStyle2 = {
  height: 52,
  bgcolor:"white",                    
  borderRadius: "16px 999px 999px 16px", 
  textTransform: "none",
  fontWeight: 500,
  borderColor: "#dadce0",
  color: "#3c4043",
  "&:hover": {
    backgroundColor: "#f1f3f4",
    borderColor: "#dadce0",
  },
};

  return (
    <Popover
      open={open}
      anchorEl={anchorEl}
      onClose={onClose}
      anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      PaperProps={{
        sx: {
          width: 420,
          borderRadius: 4,
          p: 2,
          bgcolor:"#e6f7ff"
        },
      }}
    >
      {/* Header row */}
      <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
        <Box sx={{ flexGrow: 1 }}>
          
        </Box>
        <IconButton size="small" onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </Box>

      {/* Avatar */}
      <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
        <Avatar
          sx={{
            width: 80,
            height: 80,
            fontSize: 36,
            bgcolor: "#e87a1a",
          }}
        >
          {initial}
        </Avatar>
      </Box>

      {/* Greeting */}
      <Typography
        align="center"
        variant="h6"
        sx={{ mt: 1, fontWeight: 500 }}
      >
        Hi, {firstName.charAt(0).toUpperCase() + firstName.slice(1)}!
      </Typography>

      {/* Manage account */}
      <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
        <Button
          variant="none"
          sx={{
            bgcolor:"white",
            borderRadius: 5,
            textTransform: "none",
            px: 3,
          }}
        >
          {email}
        </Button>
      </Box>

      {/* Actions */}
      <Box sx={{ display: "flex", gap: 2, mt: 3 }}>
        <Button
          fullWidth
          variant="none"
          startIcon={<AddIcon />}
          sx={googlePopupButtonStyle}
        >
          Add account
        </Button>

        <Button
          fullWidth
          variant="none"
          startIcon={<LogoutIcon />}
          sx={googlePopupButtonStyle2}
        >
          Sign out
        </Button>
      </Box>

      <Divider sx={{ my: 2 }} />

      {/* Footer */}
      <Typography align="center" variant="caption" color="text.secondary">
        Privacy Policy • Terms of Service
      </Typography>
    </Popover>
  );
};

export default AccountMenu;
