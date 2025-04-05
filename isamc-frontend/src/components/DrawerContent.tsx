// components/DrawerContent.tsx
import React from "react";
import { Box, IconButton, Typography, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Divider } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import { useTheme } from "@mui/material/styles";

export default function DrawerContent({ handleDrawerClose }: { handleDrawerClose: () => void }) {
  const theme = useTheme();

  return (
    <>
      {/* DrawerHeader */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-end",
          padding: (theme) => theme.spacing(0, 1),
          ...theme.mixins.toolbar,
        }}
      >
        <IconButton onClick={handleDrawerClose}>
          {theme.direction === "ltr" ? <ChevronLeftIcon /> : <ChevronRightIcon />}
        </IconButton>
      </Box>

      {/* Perfil de usuario */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          width: "100%",
          justifyContent: "center",
          flexDirection: "column",
        }}
      >
        <Box sx={{ backgroundColor: "white", p: 2, borderRadius: 3, boxShadow: 2 }}>
          <PersonIcon
            sx={{
              fontSize: "80px",
              backgroundColor: "#d3d3d3",
              color: "#3b8eed",
              borderRadius: 3,
              boxShadow: 2,
            }}
          />
        </Box>
        <Typography
          variant="h6"
          noWrap
          component="div"
          sx={{
            fontWeight: "bold",
            color: "black",
          }}
        >
          Usuario Interno
        </Typography>
        <Box sx={{p:1, borderRadius:4, boxShadow:3, width:'90%', background:"linear-gradient(90deg, rgba(255,196,0,1) 0%, rgba(191,95,5,1) 50%, rgba(224,109,0,1) 100%)"}}><Typography
          variant="h6"
          
          component="div"
          sx={{
            fontWeight: "bold",
            color: "black",
            textAlign: "center",
          }}
        >
          Perfil
        </Typography></Box>
        <ListItem disablePadding sx={{p:2}}>
      <ListItemButton >
        
        <ListItemText primary="Cerrar Sesión" />
      </ListItemButton>
    </ListItem>
    <Box sx={{p:1, borderRadius:4, boxShadow:3, width:'90%', background:"linear-gradient(90deg, rgba(255,196,0,1) 0%, rgba(191,95,5,1) 50%, rgba(224,109,0,1) 100%)"}}><Typography
          variant="h6"
          
          component="div"
          sx={{
            fontWeight: "bold",
            color: "black",
            textAlign: "center",
          }}
        >
          Gestor de Recaudo
        </Typography></Box>
        <ListItem disablePadding sx={{p:2}}>
      <ListItemButton >
        
        <ListItemText primary="Identificación de Usuarios" />
      </ListItemButton>
    </ListItem>
      </Box>
      
     
    </>
  );
}
