import {
  Box,
  Card,
  CardContent,
  Typography,
  IconButton,
  Tooltip,
  TextField,
} from "@mui/material";

import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import ColorLensOutlinedIcon from "@mui/icons-material/ColorLensOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import ArchiveOutlinedIcon from "@mui/icons-material/ArchiveOutlined";
import ImageOutlinedIcon from "@mui/icons-material/ImageOutlined";
import MoreVertIcon from "@mui/icons-material/MoreVert";

import { useState } from "react";

const NotesList = ({
  notes,
  setAnchorEl,
  setActiveNoteId,
  handleDelete,
  editNote,
  setEditNote,
}) => {
  const [hoverId, setHoverId] = useState(null);

  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: 600,     // ✅ same as CreateNote
        display: "flex",
        justifyContent:'center',
        flexDirection: "column",
        ml:49,
        gap: 2,
      }}
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
          }}
        >
          <CardContent sx={{ p: 1.5 }}>
            {editNote?.id === note.id ? (
              <>
                <TextField
                  variant="standard"
                  fullWidth
                  value={editNote.title}
                  onChange={(e) =>
                    setEditNote({ ...editNote, title: e.target.value })
                  }
                />
                <TextField
                  variant="standard"
                  fullWidth
                  multiline
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
                  <IconButton size="small" onClick={() => setEditNote(note)}>
                    <EditOutlinedIcon fontSize="small" />
                  </IconButton>
                </Tooltip>

                <Tooltip title="Color">
                  <IconButton
                    size="small"
                    onClick={(e) => {
                      setAnchorEl(e.currentTarget);
                      setActiveNoteId(note.id);
                    }}
                  >
                    <ColorLensOutlinedIcon fontSize="small" />
                  </IconButton>
                </Tooltip>

                <IconButton size="small">
                  <ImageOutlinedIcon fontSize="small" />
                </IconButton>

                <IconButton size="small">
                  <ArchiveOutlinedIcon fontSize="small" />
                </IconButton>

                <IconButton size="small">
                  <MoreVertIcon fontSize="small" />
                </IconButton>
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
    </Box>
  );
};

export default NotesList;
