"use client";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import SearchIcon from '@mui/icons-material/Search';
import {
  Button,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
} from "@mui/material";
import { useState } from "react";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
  ...theme.applyStyles("dark", {
    backgroundColor: "#1A2027",
  }),
}));

export default function BasicGrid() {
  const [tipo, setTipo] = useState("");

  const handleChangePersona = (event: SelectChangeEvent) => {
    setTipo(event.target.value);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        <Grid size={12}>
          <Box
            sx={{
              background:
                "linear-gradient(90deg, rgba(255,196,0,1) 0%, rgba(191,95,5,1) 50%, rgba(224,109,0,1) 100%)",
              p: 1,
              borderRadius: 4,
              color: "white",
            }}
          >
            Identificación de usuarios de recaudo
          </Box>
        </Grid>
        <Grid size={3}>
          <Select
            id="outlined-basic"
            value={tipo}
            fullWidth
            onChange={handleChangePersona}
            displayEmpty
          >
            <MenuItem value="" disabled>
              Tipo de persona: *
            </MenuItem>
            <MenuItem value="natural">Natural</MenuItem>
            <MenuItem value="juridica">Jurídica</MenuItem>
          </Select>
        </Grid>
        <Grid size={3}>
          <Select id="outlined-basic" value={tipo} fullWidth displayEmpty>
            <MenuItem value="" disabled>
              Tipo de documento: *NIT
            </MenuItem>
          </Select>
        </Grid>
        <Grid size={3}>
          <TextField
            label="Numero de documento: *"
            variant="outlined"
            fullWidth
          />
        </Grid>
        <Grid size={2}>
          <Button variant="contained" endIcon={<SearchIcon />} sx={{ width: "70%", backgroundColor: "#ff9800", borderRadius:4 }}>
            Buscar
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
}
