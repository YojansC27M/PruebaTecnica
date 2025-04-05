"use client";
import {
  Box,
  Button,
  Grid,
  MenuItem,
  Modal,
  Select,
  SelectChangeEvent,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import GenerarDireccionModal from "../../components/GenerarDireccionModal"; // Asegúrate de ajustar la ruta si está en otra carpeta

export default function CrearEmpresa() {
  const [open, setOpen] = useState(false);
    const [tipo, setTipo] = useState("");
  
  
    const handleChangePersona = (event: SelectChangeEvent) => {
      setTipo(event.target.value);
    };
  const [direccion, setDireccion] = useState("");
  const [direccionModalOpen, setDireccionModalOpen] = useState(false);

  const handleGuardarDireccion = (nuevaDireccion: string) => {
    setDireccion(nuevaDireccion);
    setDireccionModalOpen(false);
  };

  return (
    <Box sx={{ pt:1 }}>
      
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
            Información de usuarios recaudadores
          </Box>
        </Grid>
        <Grid size={4}>
          <TextField fullWidth label="País" />
        </Grid>
        <Grid size={4}>
          <TextField fullWidth label="Departamento" />
        </Grid>
        <Grid size={4}>
          <TextField fullWidth label="Municipio" />
        </Grid>
        <Grid size={4}>
          <TextField fullWidth label="Dígito de Verificación" />
        </Grid>
        <Grid size={4}>
          <TextField fullWidth label="Razón Social" />
        </Grid>
        <Grid size={4}>
          <TextField fullWidth label="Nombre Comercial" />
        </Grid>
        <Grid size={4}>
          <TextField
            fullWidth
            label="Dirección"
            value={direccion}
            InputProps={{ readOnly: true }}
            InputLabelProps={{ shrink: true }}
          />
        </Grid>
        <Grid size={4}>
          <TextField fullWidth label="Tipo de Empresa" />
        </Grid>
        <Grid size={4}>
          <Button
            variant="contained"
            fullWidth
            onClick={() => setDireccionModalOpen(true)}
            sx={{ height: "100%", borderRadius:4, backgroundColor: "#ff9800", }}
          >
            Generar Dirección
          </Button>
        </Grid>
        
        <Grid size={6}>
          <TextField fullWidth label="Correo Electrónico" />
        </Grid>
        <Grid size={6}>
          <TextField fullWidth label="Confirmar Correo Electrónico" />
        </Grid>
        <Grid size={6}>
          <TextField fullWidth label="Número de Celular" />
        </Grid>
        <Grid size={6}>
          <TextField fullWidth label="Confirmar Número de Celular" />
        </Grid>
        
        <Grid size={4}>

          <TextField fullWidth label="Quién diligencia el formulario" />
        </Grid>
        <Grid size={4}>
          <TextField fullWidth label="Cargo" />
        </Grid>
        <Grid size={4}>
          <TextField fullWidth label="Área" />
        </Grid>

        
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
        
        <Grid size={6}>
          <Select id="Tipo-Documento" value={tipo} fullWidth displayEmpty>
            <MenuItem value="" disabled>
              Tipo de documento:
            </MenuItem>
          </Select>
        </Grid>
        <Grid size={6}>
          <TextField
            label="Numero de documento: *"
            variant="outlined"
            fullWidth
          />
        </Grid>
        <Grid size={12}>
          <Box display="flex" justifyContent="flex-end" gap={2}>
            <Button variant="contained" sx={{ backgroundColor: "green", borderRadius:4 }}>Buscar</Button>
            <Button variant="contained" sx={{  backgroundColor: "green", borderRadius:4 }}>Crear</Button>
          </Box>
        </Grid>
        <Grid size={12}>
        <TextField
            label="Nombre del Representante Legal"
            variant="outlined"
            fullWidth
          />
        </Grid>
        {/* Botones */}
        <Grid size={12}>
          <Box display="flex" justifyContent="flex-end" gap={2}>
            <Button variant="outlined">Cancelar</Button>
            <Button variant="contained">Guardar</Button>
          </Box>
        </Grid>
      </Grid>

      <GenerarDireccionModal
        open={direccionModalOpen}
        onClose={() => setDireccionModalOpen(false)}
        onGuardar={handleGuardarDireccion}
      />
    </Box>
  );
}
