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
import axios from "axios"; // Importar axios para realizar solicitudes HTTP
import Swal from "sweetalert2";

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
  // Variables de estado para los campos del formulario
  const [tipoDocumento, setTipoDocumento] = useState("");
  const [numeroDocumento, setNumeroDocumento] = useState("");
  const [primerNombre, setPrimerNombre] = useState("");
  const [segundoNombre, setSegundoNombre] = useState("");
  const [primerApellido, setPrimerApellido] = useState("");
  const [segundoApellido, setSegundoApellido] = useState("");
  const [correoElectronico, setCorreoElectronico] = useState("");
  const [telefonoCelular, setTelefonoCelular] = useState("");
  const [direccion, setDireccion] = useState("");
  const [direccionModalOpen, setDireccionModalOpen] = useState(false);

  const handleGuardarDireccion = (nuevaDireccion: string) => {
    setDireccion(nuevaDireccion);
    setDireccionModalOpen(false);
  };

  // Opciones para el campo Tipo de Documento
  const tiposDocumentoNatural = [
    { value: "CC", label: "Cédula de Ciudadanía" },
    { value: "CE", label: "Cédula de Extranjería" },
    { value: "NR", label: "Nombre Regional" },
    { value: "NUIP", label: "NUIP" },
    { value: "PA", label: "Pasaporte" },
    { value: "PEP", label: "Permiso Especial de Permanencia" },
    { value: "RC", label: "Registro Civil" },
    { value: "TI", label: "Tarjeta de Identidad" },
    { value: "TP", label: "Tarjeta Prueba" },
  ];

  const limpiarCampos = () => {
    setTipoDocumento(""); 
    setNumeroDocumento("");
    setPrimerNombre("");
    setSegundoNombre("");
    setPrimerApellido("");
    setSegundoApellido("");
    setCorreoElectronico("");
    setTelefonoCelular("");
    setDireccion("");
  };
  const handleGuardar = async () => {
    // Validar que los campos obligatorios están llenos
    if (!tipoDocumento || !numeroDocumento || !primerNombre || !primerApellido || !correoElectronico || !telefonoCelular) {
      alert("Todos los campos obligatorios deben ser llenados.");
      return;
    }

    // Preparar los datos de la persona
    const personaData = {
      tipo_documento: tipoDocumento,
      numero_documento: numeroDocumento,
      primer_nombre: primerNombre,
      segundo_nombre: segundoNombre,
      primer_apellido: primerApellido,
      segundo_apellido: segundoApellido,
      correo_electronico: correoElectronico,
      telefono_celular: telefonoCelular,
      direccion: direccion,
    };

    try {
      const response = await axios.post("http://localhost:8000/api/crear-persona/", personaData);
  
      // Mostrar un mensaje de éxito con SweetAlert2
      Swal.fire({
        icon: "success",
        title: "¡Persona creada!",
        text: "La persona ha sido creada correctamente.",
      });
  
      console.log("Persona creada:", response.data);
      if (response.data.persona_id) {
        console.log("ID de la persona:", response.data.persona_id);
      }
  
      limpiarCampos(); // Limpiar los campos del formulario
  
      // Cerrar el modal después de guardar
      onClose(); 
    } catch (error) {
      // Mostrar un mensaje de error con SweetAlert2
      Swal.fire({
        icon: "error",
        title: "Error",
        text: `Hubo un error al crear la persona: ${(error as any).response?.data || (error as any).message}`,
      });
  
      console.error("Error al crear la persona:", (error as any).response?.data || (error as any).message);
    }
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

            {/* Tipo de Documento */}
            <Grid size={4}>
              <TextField
                fullWidth
                select
                label="Tipo de Documento"
                value={tipoDocumento}
                onChange={(e) => setTipoDocumento(e.target.value)}
                sx={{ mb: 2 }}
                required
              >
                {tiposDocumentoNatural.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>

            {/* Número de Documento */}
            <Grid size={4}>
              <TextField
                fullWidth
                label="Número de Documento"
                value={numeroDocumento}
                onChange={(e) => setNumeroDocumento(e.target.value)}
                sx={{ mb: 2 }}
                required
              />
            </Grid>

            {/* Primer Nombre */}
            <Grid size={4}>
              <TextField
                fullWidth
                label="Primer Nombre"
                value={primerNombre}
                onChange={(e) => setPrimerNombre(e.target.value)}
                sx={{ mb: 2 }}
                required
              />
            </Grid>

            {/* Segundo Nombre */}
            <Grid size={4}>
              <TextField
                fullWidth
                label="Segundo Nombre"
                value={segundoNombre}
                onChange={(e) => setSegundoNombre(e.target.value)}
                sx={{ mb: 2 }}
              />
            </Grid>

            {/* Primer Apellido */}
            <Grid size={4}>
              <TextField
                fullWidth
                label="Primer Apellido"
                value={primerApellido}
                onChange={(e) => setPrimerApellido(e.target.value)}
                sx={{ mb: 2 }}
                required
              />
            </Grid>

            {/* Segundo Apellido */}
            <Grid size={4}>
              <TextField
                fullWidth
                label="Segundo Apellido"
                value={segundoApellido}
                onChange={(e) => setSegundoApellido(e.target.value)}
                sx={{ mb: 2 }}
              />
            </Grid>

            {/* Correo Electrónico */}
            <Grid size={4}>
              <TextField
                fullWidth
                label="Correo Electrónico"
                value={correoElectronico}
                onChange={(e) => setCorreoElectronico(e.target.value)}
                sx={{ mb: 2 }}
                required
              />
            </Grid>

            {/* Teléfono Celular */}
            <Grid size={4}>
              <TextField
                fullWidth
                label="Teléfono Celular"
                value={telefonoCelular}
                onChange={(e) => setTelefonoCelular(e.target.value)}
                sx={{ mb: 2 }}
                required
              />
            </Grid>

            {/* Botón para abrir modal de dirección */}
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

          {/* Campo de dirección (solo lectura) */}
          <TextField
            fullWidth
            label="Dirección"
            value={direccion}
            InputProps={{ readOnly: true }}
            InputLabelProps={{ shrink: true }}
            sx={{ mb: 2 }}
          />

          {/* Botones de acción */}
          <Box display="flex" justifyContent="flex-end">
            <Button onClick={onClose}>Cancelar</Button>
            <Button
              variant="contained"
              sx={{ ml: 2 }}
              onClick={handleGuardar}
            >
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
