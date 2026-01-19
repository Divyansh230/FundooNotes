import { useContext, useEffect, useState } from "react";
import { Box, Popover, Tooltip } from "@mui/material";
import CreateNote from "./CreateNote";
import NotesGrid from "./NotesGrid";
import NotesList from "./NotesList";
import { GlobalContext } from "../GlobalProvider";
import api from "../../Services/axiosServices";

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

const Notes = () => {
  const { isGrid } = useContext(GlobalContext);

  const [notes, setNotes] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const [activeNoteId, setActiveNoteId] = useState(null);
  const [editNote, setEditNote] = useState(null);

  // 🔥 fetch only active notes
  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    const response = await api.get("/notes?isArchived=false");
    setNotes(response.data.reverse());
  };

  const handleAddNote = async (note) => {
    const response = await api.post("/notes", {
      ...note,
      isArchived: false,
    });

    setNotes((prev) => [response.data, ...prev]);
  };

  const handleColorChange = async (color) => {
    const note = notes.find((n) => n.id === activeNoteId);
    if (!note) return;

    const updatedNote = { ...note, color };

    await api.put(`/notes/${note.id}`, updatedNote);

    setNotes((prev) =>
      prev.map((n) => (n.id === note.id ? updatedNote : n))
    );

    setAnchorEl(null);
  };

  const handleDelete = async (id) => {
    await api.delete(`/notes/${id}`);
    setNotes((prev) => prev.filter((n) => n.id !== id));
  };

  // 🔥 ARCHIVE LOGIC
  const handleArchive = async (id) => {
    await api.patch(`/notes/${id}`, {
      isArchived: true,
    });

    // UI se remove
    setNotes((prev) => prev.filter((n) => n.id !== id));
  };

  const saveEdit = async () => {
    await api.put(`/notes/${editNote.id}`, editNote);

    setNotes((prev) =>
      prev.map((n) => (n.id === editNote.id ? editNote : n))
    );

    setEditNote(null);
  };

  return (
    <Box sx={{ px: 3, pt: 2 }}>
      <CreateNote onAdd={handleAddNote} />

      {isGrid ? (
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

      {/* click outside save */}
      {editNote && (
        <Box onClick={saveEdit} sx={{ position: "fixed", inset: 0 }} />
      )}
    </Box>
  );
};

export default Notes;
