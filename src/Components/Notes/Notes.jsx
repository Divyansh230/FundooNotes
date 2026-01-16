import { useState } from "react";
import Masonry from "react-masonry-css";
import { Box, Card, CardContent, Typography } from "@mui/material";
import CreateNote from "./CreateNote"; 


const breakpointColumnsObj = {
  default: 4,
  1400: 3,
  1100: 2,
  700: 1,
};

const Notes = () => {
  const [notes, setNotes] = useState([]);

  // 🔹 Add note from CreateNote
  const handleAddNote = (note) => {
    setNotes((prev) => [note, ...prev]);
  };

  return (
    <Box sx={{ px: 3, pt: 2 }}>
      {/* 🟡 CREATE NOTE */}
      <CreateNote onAdd={handleAddNote} />

      
      <Masonry
        breakpointCols={breakpointColumnsObj}
        className="notes-masonry-grid"
        columnClassName="notes-masonry-column"
      >
        {notes.map((note) => (
          <Card
            key={note.id}
            sx={{
              backgroundColor: note.color || "#fff",
              borderRadius: 2,
              boxShadow: "0 1px 6px rgba(32,33,36,.28)",
              cursor: "pointer",
            }}
          >
            <CardContent>
              {note.title && (
                <Typography fontWeight={600} gutterBottom>
                  {note.title}
                </Typography>
              )}
              <Typography variant="body2">
                {note.description}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </Masonry>
    </Box>
  );
};

export default Notes;
