"use client";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import SearchIcon from "@mui/icons-material/Search";
import {
  Button,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
} from "@mui/material";
import { useState, useEffect } from "react";
import CrearPersonaModal from "./CrearPersona";
import axios from "axios";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

export default function FiltrarPersona() {
  const [open, setOpen] = useState(false);
  const [tipo, setTipo] = useState("");
  const [tipoDocumento, setTipoDocumento] = useState("");
  const [numeroDocumento, setNumeroDocumento] = useState("");
  const router = useRouter();

  const handleChangePersona = (event: SelectChangeEvent) => {
    setTipo(event.target.value);
    setTipoDocumento("");
    setNumeroDocumento("");
  };

  

  const handleTipoDocumentoChange = (event: SelectChangeEvent) => {
    setTipoDocumento(event.target.value);
  };

  const handleBuscar = async () => {
    if (!tipo || !tipoDocumento || !numeroDocumento) {
      Swal.fire("Campos incompletos", "Debes llenar todos los campos obligatorios.", "warning");
      return;
    }

    
    try {
      const res = await axios.get("http://localhost:8000/api/verificar-persona/", {
        params: {
          tipo_documento: tipoDocumento,
          numero_documento: numeroDocumento,
        },
      });

      if (tipo === "juridica") {
        if (res.data.existe) {
          Swal.fire("Persona jurídica encontrada", `Razón social: ${res.data.nombres}`, "info");
        } else {
          Swal.fire("No registrada", "No existe ninguna persona jurídica con este NIT, por favor diligencie el siguiente formulario", "warning");
        }
        router.push("/CrearEmpresa");
        return;
      }
  

      if (res.data.existe) {
        Swal.fire("Persona ya registrada", `Nombre: ${res.data.nombres}`, "info");
      } else {
        setOpen(true);
      }
    } catch (error) {
      console.error(error);
      Swal.fire("Error", "No se pudo verificar la persona", "error");
    }
  };

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

  const tiposDocumentoJuridica = [
    { value: "NIT", label: "NIT" },
  ];

  const tiposDocumento =
    tipo === "natural" ? tiposDocumentoNatural :
    tipo === "juridica" ? tiposDocumentoJuridica :
    [];

  useEffect(() => {
    const esValido = tiposDocumento.some(doc => doc.value === tipoDocumento);
    if (!esValido) {
      setTipoDocumento("");
    }
  }, [tipo]);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        <Grid size={12}>
          <Box
            sx={{
              background: "linear-gradient(90deg, rgba(255,196,0,1) 0%, rgba(191,95,5,1) 50%, rgba(224,109,0,1) 100%)",
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
            id="tipo-persona"
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
          <Select
            id="tipo-documento"
            value={tipoDocumento}
            onChange={handleTipoDocumentoChange}
            fullWidth
            displayEmpty
            disabled={!tipo}
          >
            <MenuItem value="" disabled>
              Tipo de documento: *
            </MenuItem>
            {tiposDocumento.map((doc) => (
              <MenuItem key={doc.value} value={doc.value}>
                {doc.label}
              </MenuItem>
            ))}
          </Select>
        </Grid>

        <Grid size={3}>
          <TextField
            label="Número de documento: *"
            variant="outlined"
            fullWidth
            value={numeroDocumento}
            onChange={(e) => setNumeroDocumento(e.target.value)}
          />
        </Grid>

        <Grid size={3}>
          <Button
            variant="contained"
            endIcon={<SearchIcon />}
            sx={{ width: "70%", backgroundColor: "#ff9800", borderRadius: 4 }}
            onClick={handleBuscar}
          >
            Buscar
          </Button>
          <CrearPersonaModal open={open} onClose={() => setOpen(false)} />
        </Grid>
      </Grid>
    </Box>
  );
}


