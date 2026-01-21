import { useContext, useEffect, useState } from "react";
import { Box, Popover, Tooltip, Typography } from "@mui/material";
import CreateNote from "./CreateNote";
import NotesGrid from "./NotesGrid";
import NotesList from "./NotesList";
import { GlobalContext } from "../GlobalProvider";
import api from "../../Services/axiosServices";
import LightbulbOutlinedIcon from "@mui/icons-material/LightbulbOutlined";

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

const Notes = () => {
  const { isGrid } = useContext(GlobalContext);

  const [notes, setNotes] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const [activeNoteId, setActiveNoteId] = useState(null);
  const [editNote, setEditNote] = useState(null);

  
  const fetchNotes = async () => {
    const uid= localStorage.getItem("userId")
    console.log(uid)
    const res = await api.get(`/notes?isArchived=false&use=${uid}&isTrashed=false`);
    setNotes(res.data.reverse());
  };

  useEffect(() => {
    console.log("Fetching notes...")
    fetchNotes()
  },[]);

  const handleAddNote = async (note) => {
    const res = await api.post("/notes", {
      ...note,
      color: "#ffffff",
      isArchived: false,
      isTrashed: false,
    });

    setNotes((prev) => [res.data, ...prev]);
  };

  
 const handleColorChange = async (color) => {
  const note = notes.find((n) => n.id === activeNoteId);
  if (!note) return;

  
  setNotes((prev) =>
    prev.map((n) =>
      n.id === note.id ? { ...n, color } : n
    )
  );

  setAnchorEl(null);

  try {
    
    await api.put(`/notes/${note.id}`, {
      ...note,
      color,
    });
  } catch (err) {
    console.error("Color update failed", err);

    
    setNotes((prev) =>
      prev.map((n) =>
        n.id === note.id ? note : n
      )
    );
  }
};
  
  const handleDelete = async (id) => {
    await api.patch(`/notes/${id}`, { isTrashed: true });
    setNotes((prev) => prev.filter((n) => n.id !== id));
  };
 
  const handleArchive = async (id) => {
    await api.patch(`/notes/${id}`, { isArchived: true });
    setNotes((prev) => prev.filter((n) => n.id !== id));
  };

  
  const saveEdit = async () => {
    const res = await api.put(`/notes/${editNote.id}`, editNote);

    setNotes((prev) =>
      prev.map((n) => (n.id === editNote.id ? res.data : n))
    );

    setEditNote(null);
  };

  return (
    <Box sx={{ px: 3, pt: 2 }}>
      <CreateNote onAdd={handleAddNote} />

      {/* EMPTY STATE */}
      {notes.length === 0 ? (
        <Box
          sx={{
            height: "60vh",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            color: "#5f6368",
          }}
        >
          <LightbulbOutlinedIcon sx={{ fontSize: 120, color: "#e0e0e0" }} />
          <Typography fontSize={20}>
            Notes you add appear here
          </Typography>
        </Box>
      ) : isGrid ? (
        <NotesGrid
          notes={notes}
          setAnchorEl={setAnchorEl}
          setActiveNoteId={setActiveNoteId}
          handleDelete={handleDelete}
          handleArchive={handleArchive}
          editNote={editNote}
          setEditNote={setEditNote}
          saveEdit={saveEdit}
        />
      ) : (
        <NotesList
          notes={notes}
          setAnchorEl={setAnchorEl}
          setActiveNoteId={setActiveNoteId}
          handleDelete={handleDelete}
          handleArchive={handleArchive}
          editNote={editNote}
          setEditNote={setEditNote}
          saveEdit={saveEdit}
        />
      )}

      {/* 🎨 COLOR PICKER */}
      <Popover
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={() => setAnchorEl(null)}
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
            <Tooltip key={color} title={COLOR_NAMES[color]}>
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
    </Box>
  );
};

export default Notes;
