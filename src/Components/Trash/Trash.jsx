import {
  Box,
  Typography,
  Card,
  CardContent,
  IconButton,
  Tooltip,
} from "@mui/material";

import RestoreFromTrashOutlinedIcon from "@mui/icons-material/RestoreFromTrashOutlined";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";

import api from "../../Services/axiosServices";
import { useEffect, useState } from "react";

const Trash = () => {
  const [trashedNotes, setTrashedNotes] = useState([]);

  const fetchTrash = async () => {
    const res = await api.get("/notes?isTrashed=true");
    setTrashedNotes(res.data);
  };

  useEffect(() => {
    fetchTrash();
  }, []);

  // 🔥 restore
  const handleRestore = async (id) => {
    await api.patch(`/notes/${id}`, {
      isTrashed: false,
    });

    setTrashedNotes((prev) =>
      prev.filter((note) => note.id !== id)
    );
  };

  //  delete forever
  const handleDeleteForever = async (id) => {
    await api.delete(`/notes/${id}`);

    setTrashedNotes((prev) =>
      prev.filter((note) => note.id !== id)
    );
  };

  // EMPTY STATE
  if (trashedNotes.length === 0) {
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
        <Typography sx={{ fontSize: 20 }}>
          No notes in Trash
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h6" mb={2}>
        Trash
      </Typography>

      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
        {trashedNotes.map((note) => (
          <Card
            key={note.id}
            sx={{ width: 250, backgroundColor: note.color }}
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
              <Tooltip title="Restore">
                <IconButton
                  size="small"
                  onClick={() => handleRestore(note.id)}
                >
                  <RestoreFromTrashOutlinedIcon />
                </IconButton>
              </Tooltip>

              <Tooltip title="Delete forever">
                <IconButton
                  size="small"
                  onClick={() =>
                    handleDeleteForever(note.id)
                  }
                >
                  <DeleteForeverOutlinedIcon />
                </IconButton>
              </Tooltip>
            </Box>
          </Card>
        ))}
      </Box>
    </Box>
  );
};

export default Trash;
