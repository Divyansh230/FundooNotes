import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Box from "@mui/material/Box";
import EditIcon from '@mui/icons-material/Edit';
import LightbulbOutlinedIcon from "@mui/icons-material/LightbulbOutlined";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import ArchiveOutlinedIcon from "@mui/icons-material/ArchiveOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";

const HEADER_HEIGHT = 64;

export default function Sidebar({ open }) {
  return (
    <Drawer
      variant="permanent"
      PaperProps={{
        sx: {
          top: HEADER_HEIGHT,
          height: `calc(100% - ${HEADER_HEIGHT}px)`,
          width: open ? 260 : 70,
          transition: "width 0.3s",
          overflowX: "hidden",
          borderRight: "none",
        },
      }}
    >
      <Box sx={{ mt: 1 }}>
        <List>

          {[
            { text: "Notes", icon: <LightbulbOutlinedIcon /> },
            { text: "Reminders", icon: <NotificationsNoneOutlinedIcon /> },
            {text: "Edit" ,icon: <EditIcon /> },
            { text: "Archive", icon: <ArchiveOutlinedIcon /> },
            { text: "Trash", icon: <DeleteOutlineOutlinedIcon /> },
          ].map(item => (
            <ListItemButton
              key={item.text}
              sx={{
                borderRadius: "0 25px 25px 0",
                mx: 1,
                "&:hover": { backgroundColor: "#feefc3" },
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  justifyContent: "center",
                  mr: open ? 2 : "auto",
                }}
              >
                {item.icon}
              </ListItemIcon>

              {/* 👇 SIRF TEXT TOGGLE */}
              {open && <ListItemText primary={item.text} />}
            </ListItemButton>
          ))}

        </List>
      </Box>
    </Drawer>
  );
}
