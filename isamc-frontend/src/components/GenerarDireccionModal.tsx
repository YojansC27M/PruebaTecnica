"use client";
import React, { useState } from "react";
import {
  Modal,
  Box,
  TextField,
  Button,
  Typography,
  MenuItem,
  Grid,
} from "@mui/material";

const style = {
  position: "absolute" as const,
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "background.paper",
  boxShadow: 24,
  borderRadius: 2,
  p: 4,
};

const tiposVia = ["Calle", "Carrera", "Avenida", "Transversal", "Diagonal"];

export default function GenerarDireccionModal({
  open,
  onClose,
  onGuardar,
}: {
  open: boolean;
  onClose: () => void;
  onGuardar: (direccion: string) => void;
}) {
  const [pais, setPais] = useState("");
  const [departamento, setDepartamento] = useState("");
  const [municipio, setMunicipio] = useState("");
  const [tipoVia, setTipoVia] = useState("");
  const [numeroPrincipal, setNumeroPrincipal] = useState("");
  const [letra, setLetra] = useState("");
  const [numeroSecundario, setNumeroSecundario] = useState("");
  const [complemento, setComplemento] = useState("");
  const [barrio, setBarrio] = useState("");

  const limpiarCampos = () => {
    setPais("");
    setDepartamento("");
    setMunicipio("");
    setTipoVia("");
    setNumeroPrincipal("");
    setLetra("");
    setNumeroSecundario("");
    setComplemento("");
    setBarrio("");
  };

  const generarDireccion = () => {
    const direccion = `${tipoVia} ${numeroPrincipal}${letra ? letra : ""} #${numeroSecundario}, ${complemento}, Barrio ${barrio}`;
    onGuardar(direccion);
    limpiarCampos();
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={style}>
        <Typography variant="h6" gutterBottom>
          Generar Dirección
        </Typography>

        <Grid container spacing={2}>
          
          <Grid size={6}>
            <TextField
              fullWidth
              select
              label="Tipo de vía"
              value={tipoVia}
              onChange={(e) => setTipoVia(e.target.value)}
            >
              {tiposVia.map((tipo) => (
                <MenuItem key={tipo} value={tipo}>
                  {tipo}
                </MenuItem>
              ))}
            </TextField>
          </Grid>

          <Grid size={4}>
            <TextField
              fullWidth
              label="Número principal"
              value={numeroPrincipal}
              onChange={(e) => setNumeroPrincipal(e.target.value)}
            />
          </Grid>
          <Grid size={4}>
            <TextField
              fullWidth
              label="Letra"
              value={letra}
              onChange={(e) => setLetra(e.target.value)}
            />
          </Grid>
          <Grid size={4}>
            <TextField
              fullWidth
              label="Número secundario"
              value={numeroSecundario}
              onChange={(e) => setNumeroSecundario(e.target.value)}
            />
          </Grid>

          <Grid size={6}>
            <TextField
              fullWidth
              label="Complemento"
              value={complemento}
              onChange={(e) => setComplemento(e.target.value)}
            />
          </Grid>

          <Grid size={6}>
            <TextField
              fullWidth
              label="Barrio"
              value={barrio}
              onChange={(e) => setBarrio(e.target.value)}
            />
          </Grid>
        </Grid>

        <Box display="flex" justifyContent="flex-end" mt={3}>
          <Button onClick={onClose}>Cancelar</Button>
          <Button variant="contained" sx={{ ml: 2 }} onClick={generarDireccion}>
            Guardar
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}

