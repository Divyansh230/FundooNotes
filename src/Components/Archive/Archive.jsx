import {
  Box,
  Card,
  CardContent,
  Typography,
  IconButton,
  Tooltip,
} from "@mui/material";

import UnarchiveOutlinedIcon from "@mui/icons-material/UnarchiveOutlined";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import ArchiveOutlinedIcon from "@mui/icons-material/ArchiveOutlined";

import api from "../../Services/axiosServices";
import { useEffect, useState } from "react";

const Archive = () => {
  const [archivedNotes, setArchivedNotes] = useState([]);

  const fetchArchivedNotes = async () => {
    const res = await api.get("/notes?isArchived=true");
    setArchivedNotes(res.data);
  };

  useEffect(() => {
    fetchArchivedNotes();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // 🔥 unarchive
  const handleUnarchive = async (id) => {
    await api.patch(`/notes/${id}`, {
      isArchived: false,
    });

    setArchivedNotes((prev) =>
      prev.filter((note) => note.id !== id)
    );
  };

  // 🔥 permanent delete
  const handleDelete = async (id) => {
    await api.delete(`/notes/${id}`);

    setArchivedNotes((prev) =>
      prev.filter((note) => note.id !== id)
    );
  };

  // ✅ EMPTY STATE (Google Keep style)
  if (archivedNotes.length === 0) {
    return (
      <Box
        sx={{
          height: "70vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          color: "#5f6368",
          textAlign: "center",
        }}
      >
        <ArchiveOutlinedIcon
          sx={{
            fontSize: 120,
            color: "#e0e0e0",
            mb: 2,
          }}
        />

        <Typography sx={{ fontSize: 20, fontWeight: 400 }}>
          Your archived notes appear here
        </Typography>
      </Box>
    );
  }

  // ✅ NORMAL ARCHIVE NOTES
  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h6" mb={2}>
        Archived
      </Typography>

      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
        {archivedNotes.map((note) => (
          <Card
            key={note.id}
            sx={{
              width: 250,
              backgroundColor: note.color || "#fff",
            }}
          >
            <CardContent>
              <Typography fontWeight={600}>
                {note.title}
              </Typography>
              <Typography variant="body2">
                {note.description}
              </Typography>
            </CardContent>

            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                px: 1,
                pb: 1,
              }}
            >
              <Tooltip title="Unarchive">
                <IconButton
                  size="small"
                  onClick={() => handleUnarchive(note.id)}
                >
                  <UnarchiveOutlinedIcon fontSize="small" />
                </IconButton>
              </Tooltip>

              <Tooltip title="Delete">
                <IconButton
                  size="small"
                  onClick={() => handleDelete(note.id)}
                >
                  <DeleteOutlineIcon fontSize="small" />
                </IconButton>
              </Tooltip>
            </Box>
          </Card>
        ))}
      </Box>
    </Box>
  );
};

export default Archive;
