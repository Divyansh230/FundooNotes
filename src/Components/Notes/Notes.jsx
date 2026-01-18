import { useState } from "react";
import Masonry from "react-masonry-css";
import {
  Box,
  Card,
  CardContent,
  Typography,
  IconButton,
  Popover,
  Tooltip,
  TextField,
} from "@mui/material";

import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import ColorLensOutlinedIcon from "@mui/icons-material/ColorLensOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import ArchiveOutlinedIcon from "@mui/icons-material/ArchiveOutlined";
import ImageOutlinedIcon from "@mui/icons-material/ImageOutlined";
import MoreVertIcon from "@mui/icons-material/MoreVert";

import CreateNote from "./CreateNote";

/* 🎨 COLORS */
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
  "#e2f6d3",
];

const COLOR_NAMES = {
  "#ffffff": "Default",
  "#f28b82": "Coral",
  "#fbbc04": "Peach",
  "#fff475": "Sand",
  "#ccff90": "Mint",
  "#a7ffeb": "Teal",
  "#cbf0f8": "Blue",
  "#aecbfa": "Dark Blue",
  "#d7aefb": "Purple",
  "#fdcfe8": "Pink",
  "#e2f6d3": "Green",
};

const breakpointColumnsObj = {
  default: 4,
  1400: 3,
  1100: 2,
  700: 1,
};

const Notes = () => {
  const [notes, setNotes] = useState([]);

  const [hoverId, setHoverId] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const [activeNoteId, setActiveNoteId] = useState(null);
  const [editNote, setEditNote] = useState(null);

  // ➕ add note
  const handleAddNote = (note) => {
    setNotes((prev) => [note, ...prev]);
  };

  // 🎨 color change
  const handleColorChange = (color) => {
    setNotes((prev) =>
      prev.map((n) =>
        n.id === activeNoteId ? { ...n, color } : n
      )
    );
    setAnchorEl(null);
  };

  // 🗑 delete
  const handleDelete = (id) => {
    setNotes((prev) => prev.filter((n) => n.id !== id));
  };

  // ✏ save edit
  const saveEdit = () => {
    setNotes((prev) =>
      prev.map((n) =>
        n.id === editNote.id ? editNote : n
      )
    );
    setEditNote(null);
  };

  return (
    <Box sx={{ px: 3, pt: 2 }}>
      <CreateNote onAdd={handleAddNote} />

      <Masonry
        breakpointCols={breakpointColumnsObj}
        className="notes-masonry-grid"
        columnClassName="notes-masonry-column"
      >
        {notes.map((note) => (
          <Card
            key={note.id}
            onMouseEnter={() => setHoverId(note.id)}
            onMouseLeave={() => setHoverId(null)}
            sx={{
              backgroundColor: note.color || "#fff",
              borderRadius: 2,
              boxShadow: "0 1px 6px rgba(32,33,36,.28)",
              cursor: "pointer",
              maxWidth: 260,
              width: "100%",
              wordBreak: "break-word",
              overflowWrap: "anywhere",
              transition: "0.2s",
            }}
          >
            <CardContent sx={{ p: 1.5 }}>
              {/* ✏ EDIT MODE */}
              {editNote?.id === note.id ? (
                <>
                  <TextField
                    variant="standard"
                    fullWidth
                    placeholder="Title"
                    value={editNote.title}
                    onChange={(e) =>
                      setEditNote({
                        ...editNote,
                        title: e.target.value,
                      })
                    }
                  />
                  <TextField
                    variant="standard"
                    fullWidth
                    multiline
                    placeholder="Take a note..."
                    value={editNote.description}
                    onChange={(e) =>
                      setEditNote({
                        ...editNote,
                        description: e.target.value,
                      })
                    }
                  />
                </>
              ) : (
                <>
                  {note.title && (
                    <Typography fontWeight={600}>
                      {note.title}
                    </Typography>
                  )}
                  <Typography variant="body2">
                    {note.description}
                  </Typography>
                </>
              )}
            </CardContent>

            {/* 🔥 HOVER ICONS */}
            {hoverId === note.id && (
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  px: 1,
                  pb: 1,
                }}
              >
                <Box>
                  <Tooltip title="Edit">
                    <IconButton
                      size="small"
                      onClick={() => setEditNote(note)}
                    >
                      <EditOutlinedIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>

                  <Tooltip title="Background options">
                    <IconButton
                      size="small"
                      onClick={(e) => {
                        // 🔥 IMPORTANT FIX
                        setAnchorEl(
                          e.currentTarget.closest("button")
                        );
                        setActiveNoteId(note.id);
                      }}
                    >
                      <ColorLensOutlinedIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>

                  <Tooltip title="Add image">
                    <IconButton size="small">
                      <ImageOutlinedIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>

                  <Tooltip title="Archive">
                    <IconButton size="small">
                      <ArchiveOutlinedIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>

                  <Tooltip title="More">
                    <IconButton size="small">
                      <MoreVertIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>
                </Box>

                <Tooltip title="Delete">
                  <IconButton
                    size="small"
                    onClick={() => handleDelete(note.id)}
                  >
                    <DeleteOutlineIcon fontSize="small" />
                  </IconButton>
                </Tooltip>
              </Box>
            )}
          </Card>
        ))}
      </Masonry>

      {/* 🎨 COLOR PICKER */}
      <Popover
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={() => setAnchorEl(null)}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        sx={{position:"relative",
          top:0,
          left:100,
          height:900,
        }}
      >
        <Box
          sx={{
            p: 1,
            width: 260,
            display: "flex",
            flexWrap: "wrap",
            gap: 1,
          }}
        >
          {COLORS.map((color) => (
            <Tooltip
              key={color}
              title={COLOR_NAMES[color]}
              arrow
              placement="top"
            >
              <Box
                onClick={() => handleColorChange(color)}
                sx={{
                  width: 32,
                  height: 32,
                  borderRadius: "50%",
                  backgroundColor: color,
                  border: "1px solid #ccc",
                  cursor: "pointer",
                }}
              />
            </Tooltip>
          ))}
        </Box>
      </Popover>

      {/* ✏ click outside to save */}
      {editNote && (
        <Box
          onClick={saveEdit}
          sx={{ position: "fixed", inset: 0 }}
        />
      )}
    </Box>
  );
};

export default Notes;
