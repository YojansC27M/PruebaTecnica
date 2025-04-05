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
import GenerarDireccionModal from "./GenerarDireccionModal";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "60%",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};
export default function CrearPersonaModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [direccion, setDireccion] = useState("");
  const [direccionModalOpen, setDireccionModalOpen] = useState(false);

  const handleGuardarDireccion = (nuevaDireccion: string) => {
    setDireccion(nuevaDireccion);
    setDireccionModalOpen(false);
  };

  return (
    <>
      <Modal open={open} onClose={onClose}>
        <Box sx={style}>
          <Grid container spacing={2}>
            <Grid size={12}>
              <Typography variant="h6" gutterBottom>
                Crear Persona Natural
              </Typography>
            </Grid>
            <Grid size={4}>
              <TextField
                fullWidth
                select
                label="Tipo de Documento"
                sx={{ mb: 2 }}
              >
                <MenuItem value="CC">Cédula de Ciudadanía</MenuItem>
                <MenuItem value="CE">Cédula de Extranjería</MenuItem>
                <MenuItem value="TI">Tarjeta de Identidad</MenuItem>
              </TextField>
            </Grid>
            <Grid size={4}>
              <TextField fullWidth label="Número de Documento" sx={{ mb: 2 }} />
            </Grid>
            <Grid size={4}>
              <TextField fullWidth label="Primer Nombre" sx={{ mb: 2 }} />
            </Grid>
            <Grid size={4}>
              <TextField fullWidth label="Segundo Nombre" sx={{ mb: 2 }} />
            </Grid>
            <Grid size={4}>
              <TextField fullWidth label="Primer Apellido" sx={{ mb: 2 }} />
            </Grid>
            <Grid size={4}>
              <TextField fullWidth label="Segundo Apellido" sx={{ mb: 2 }} />
            </Grid>
            <Grid size={4}>
              <TextField fullWidth label="Correo Electrónico" sx={{ mb: 2 }} />
            </Grid>
            <Grid size={4}>
              <TextField fullWidth label="Teléfono Celular" sx={{ mb: 2 }} />
            </Grid>

            <Grid size={4}>
              <Button
                variant="outlined"
                onClick={() => setDireccionModalOpen(true)}
                sx={{ mb: 2 }}
              >
                Generar Dirección
              </Button>
            </Grid>
          </Grid>

          <TextField
            fullWidth
            label="Dirección"
            value={direccion}
            InputProps={{ readOnly: true }}
            InputLabelProps={{ shrink: true }}
            sx={{ mb: 2 }}
          />

          <Box display="flex" justifyContent="flex-end">
            <Button onClick={onClose}>Cancelar</Button>
            <Button variant="contained" sx={{ ml: 2 }}>
              Guardar
            </Button>
          </Box>
        </Box>
      </Modal>

      <GenerarDireccionModal
        open={direccionModalOpen}
        onClose={() => setDireccionModalOpen(false)}
        onGuardar={handleGuardarDireccion}
      />
    </>
  );
}
