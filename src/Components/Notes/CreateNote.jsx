import { useState, useRef } from "react";
import {
  Card,
  CardContent,
  TextField,
  Box,
  IconButton,
  Button,
  Popover,
  ClickAwayListener,
} from "@mui/material";

import CheckBoxOutlinedIcon from "@mui/icons-material/CheckBoxOutlined";
import BrushOutlinedIcon from "@mui/icons-material/BrushOutlined";
import ImageOutlinedIcon from "@mui/icons-material/ImageOutlined";
import ColorLensOutlinedIcon from "@mui/icons-material/ColorLensOutlined";
import PushPinOutlinedIcon from "@mui/icons-material/PushPinOutlined";
import MoreVertIcon from "@mui/icons-material/MoreVert";

const COLORS = [
  "#ffffff",
  "#f28b82",
  "#fbbc04",
  "#fff475",
  "#ccff90",
  "#a7ffeb",
  "#cbf0f8",
  "#aecbfa",
  "#d7aefb",
  "#fdcfe8",
  "#e2f6d3"
];

const CreateNote = ({ onAdd }) => {
  const [expanded, setExpanded] = useState(false);
  const [bgColor, setBgColor] = useState("#ffffff");
  const [anchorEl, setAnchorEl] = useState(null);

  const titleRef = useRef(null);
  const descRef = useRef(null);

  const addNoteAndClose = () => {
    const title = titleRef.current?.value.trim() || "";
    const description = descRef.current?.value.trim() || "";

    if (title || description) {
      onAdd?.({
        id: Date.now(),
        title,
        description,
        color: bgColor,
      });
    }

    if (titleRef.current) titleRef.current.value = "";
    if (descRef.current) descRef.current.value = "";

    setBgColor("#ffffff");
    setExpanded(false);
  };

  return (
    <ClickAwayListener onClickAway={() => expanded && addNoteAndClose()}>
      <Card
        onClick={() => !expanded && setExpanded(true)}
        sx={{
          maxWidth: 600,
          mx: "auto",
          mb: 4,
          borderRadius: 2,
          backgroundColor: bgColor,
          boxShadow: "0 1px 6px rgba(32,33,36,.28)",
          cursor: "text",
          position: "relative",
        }}
      >
        {/* 🔹 COLLAPSED ICONS (ONLY ONCE) */}
        {!expanded && (
          <Box
            sx={{
              position: "absolute",
              right: 12,
              top: 12,
              display: "flex",
              gap: 1,
              color: "#5f6368",
            }}
          >
            <IconButton size="small">
              <CheckBoxOutlinedIcon fontSize="small" />
            </IconButton>
            <IconButton size="small">
              <BrushOutlinedIcon fontSize="small" />
            </IconButton>
            <IconButton size="small">
              <ImageOutlinedIcon fontSize="small" />
            </IconButton>
          </Box>
        )}

        <CardContent sx={{ pb: "8px !important" }}>
          {/* 🔹 TITLE */}
          {expanded && (
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <TextField
                placeholder="Title"
                variant="standard"
                fullWidth
                InputProps={{ disableUnderline: true }}
                inputRef={titleRef}
              />
              <IconButton size="small">
                <PushPinOutlinedIcon />
              </IconButton>
            </Box>
          )}

          {/* 🔹 DESCRIPTION */}
          <TextField
            placeholder="Take a note..."
            variant="standard"
            fullWidth
            multiline
            InputProps={{ disableUnderline: true }}
            inputRef={descRef}
            sx={{
              mt: expanded ? 1 : 0,
              pr: expanded ? 0 : 10, // 👈 overlap fix
            }}
          />

          {/* 🔹 EXPANDED ACTIONS */}
          {expanded && (
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                mt: 1,
              }}
            >
              <Box>
                <IconButton size="small">
                  <CheckBoxOutlinedIcon />
                </IconButton>
                <IconButton size="small">
                  <BrushOutlinedIcon />
                </IconButton>
                <IconButton size="small">
                  <ImageOutlinedIcon />
                </IconButton>
                <IconButton
                  size="small"
                  onClick={(e) => setAnchorEl(e.currentTarget)}
                >
                  <ColorLensOutlinedIcon />
                </IconButton>
                <IconButton size="small">
                  <MoreVertIcon />
                </IconButton>
              </Box>

              <Button
                size="small"
                onClick={addNoteAndClose}
                sx={{ textTransform: "none" }}
              >
                Close
              </Button>
            </Box>
          )}
        </CardContent>

        {/* 🎨 COLOR PICKER */}
        <Popover
          open={Boolean(anchorEl)}
          anchorEl={anchorEl}
          onClose={() => setAnchorEl(null)}
          anchorOrigin={{ vertical: "top", horizontal: "left" }}
          sx={{
            display:"flex",
            top:38,
          }}
        >
          <Box sx={{ display: "flex",top:38, p: 1, gap: 1, flexWrap: "wrap", width: 480 }}>
            {COLORS.map((color) => (
              <Box
                key={color}
                onClick={() => {
                  setBgColor(color);
                  setAnchorEl(null);
                }}
                sx={{
                  width: 34,
                  height: 34,
                  borderRadius: "50%",
                  backgroundColor: color,
                  border: "1px solid #ccc",
                  cursor: "pointer",
                }}
              />
            ))}
          </Box>
        </Popover>
      </Card>
    </ClickAwayListener>
  );
};

export default CreateNote;
