import { useContext, useState } from "react";
import { Box, Popover, Tooltip } from "@mui/material";
import CreateNote from "./CreateNote";
import NotesGrid from "./NotesGrid";
import NotesList from "./NotesList"
import { GlobalContext } from "../GlobalProvider";

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
  const {isGrid,setIsGrid}=useContext(GlobalContext)
  const [notes, setNotes] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const [activeNoteId, setActiveNoteId] = useState(null);
  const [editNote, setEditNote] = useState(null);

  // ➕ add
  const handleAddNote = (note) => {
    setNotes((prev) => [note, ...prev]);
  };

  // 🎨 color
  const handleColorChange = (color) => {
    setNotes((prev) =>
      prev.map((n) => (n.id === activeNoteId ? { ...n, color } : n)),
    );
    setAnchorEl(null);
  };

  // 🗑 delete
  const handleDelete = (id) => {
    setNotes((prev) => prev.filter((n) => n.id !== id));
  };

  // ✏ save edit
  const saveEdit = () => {
    setNotes((prev) => prev.map((n) => (n.id === editNote.id ? editNote : n)));
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
          editNote={editNote}
          setEditNote={setEditNote}
        />
      ) : (
        <NotesList
          notes={notes}
          setAnchorEl={setAnchorEl}
          setActiveNoteId={setActiveNoteId}
          handleDelete={handleDelete}
          editNote={editNote}
          setEditNote={setEditNote}
        />
      )}

      {/* 🎨 COLOR PICKER */}
      <Popover
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={() => setAnchorEl(null)}
      >
        <Box
          sx={{ p: 1, width: 260, display: "flex", flexWrap: "wrap", gap: 1 }}
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

      {/* click outside */}
      {editNote && (
        <Box onClick={saveEdit} sx={{ position: "fixed", inset: 0 }} />
      )}
    </Box>
  );
};

export default Notes;
