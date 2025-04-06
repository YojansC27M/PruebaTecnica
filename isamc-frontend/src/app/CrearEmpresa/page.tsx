"use client";
import {
  Box,
  Button,
  Grid,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
} from "@mui/material";
import { useEffect, useState } from "react";
import Swal from "sweetalert2"; // Importa SweetAlert2
import GenerarDireccionModal from "../../components/GenerarDireccionModal"; // Asegúrate de ajustar la ruta si está en otra carpeta
import axios from "axios";
import { useRouter } from "next/navigation";
import { paises, departamentos, municipios } from "../../components/Data"; // Asegúrate de ajustar la ruta si es necesario
import CrearPersonaModal from "components/components/CrearPersona";

interface Option {
  value: string;
  label: string;
}

export default function CrearEmpresa() {
  const [open, setOpen] = useState(false);
  const [tipoEmpresa, setTipoEmpresa] = useState("");
  const [tipo, setTipo] = useState("");
  const [razon, setRazon] = useState("");
  const [comercial, setComercial] = useState("");
  const [digito, setDigito] = useState("");
  const [diligencia, setDiligencia] = useState("");
  const [cargo, setCargo] = useState("");
  const [area, setArea] = useState("");
  const router = useRouter();
  const handleCerrar = () => {
    router.push("/");
  };

  const [numeroDocumento, setNumeroDocumento] = useState("");
  const [representanteLegal, setRepresentanteLegal] = useState("");
  const [direccion, setDireccion] = useState("");
  const [direccionModalOpen, setDireccionModalOpen] = useState(false);

  // Estado para los selects dependientes
  const [selectedPais, setSelectedPais] = useState<string>("");
  const [selectedDepartamento, setSelectedDepartamento] = useState<string>("");
  const [selectedMunicipio, setSelectedMunicipio] = useState<string>("");

  const [departamentosDisponibles, setDepartamentosDisponibles] = useState<
    Option[]
  >([]);
  const [municipiosDisponibles, setMunicipiosDisponibles] = useState<Option[]>(
    []
  );

  const [correo, setCorreo] = useState("");
  const [confirmarCorreo, setConfirmarCorreo] = useState("");
  const [numeroCelular, setNumeroCelular] = useState("");
  const [confirmarCelular, setConfirmarCelular] = useState("");

  const [correoError, setCorreoError] = useState(false);
  const [celularError, setCelularError] = useState(false);

  // Actualiza los departamentos al seleccionar un país
  useEffect(() => {
    if (selectedPais) {
      setDepartamentosDisponibles(departamentos[selectedPais] || []);
      setSelectedDepartamento(""); // Limpiar el departamento seleccionado
      setMunicipiosDisponibles([]); // Limpiar municipios disponibles
    }
  }, [selectedPais]);

  // Actualiza los municipios al seleccionar un departamento
  useEffect(() => {
    if (selectedDepartamento && selectedPais) {
      const claveMunicipio = `${selectedPais}-${selectedDepartamento}`;
      setMunicipiosDisponibles(municipios[claveMunicipio] || []);
      setSelectedMunicipio(""); // Limpiar municipio seleccionado
    }
  }, [selectedDepartamento, selectedPais]);

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
    { value: "NIT", label: "NIT" }, // Añadido el NIT como opción
  ];

  const handleChangePersona = (event: SelectChangeEvent) => {
    setTipo(event.target.value);
  };

  const handleSearchPersona = async () => {
    if (!tipo || !numeroDocumento) {
      Swal.fire(
        "Campos incompletos",
        "Debes llenar todos los campos obligatorios.",
        "warning"
      );
      return;
    }

    try {
      const res = await axios.get(
        "http://localhost:8000/api/verificar-persona/",
        {
          params: {
            tipo_documento: tipo,
            numero_documento: numeroDocumento,
          },
        }
      );

      if (res.data.existe) {
        setRepresentanteLegal(res.data.nombres);
      }
    } catch (error) {
      console.error(error);
      Swal.fire("Error", "No se pudo verificar la persona", "error");
    }
  };

  const handleGuardarDireccion = (nuevaDireccion: string) => {
    setDireccion(nuevaDireccion);
    setDireccionModalOpen(false);
  };

  const validateForm = () => {
    let isValid = true;
    // Validar correo
    if (correo !== confirmarCorreo) {
      setCorreoError(true);
      isValid = false;
    } else {
      setCorreoError(false);
    }
    // Validar celular
    if (numeroCelular !== confirmarCelular) {
      setCelularError(true);
      isValid = false;
    } else {
      setCelularError(false);
    }
    return isValid;
  };

  const limpiarCampos = () => {
    setSelectedPais("");
    setSelectedDepartamento("");
    setSelectedMunicipio("");
    setDigito("");
    setRazon("");
    setComercial("");
    setDireccion("");
    setTipoEmpresa("");
    setCorreo("");
    setConfirmarCorreo("");
    setNumeroCelular("");
    setConfirmarCelular("");
    setDiligencia("");
    setCargo("");
    setArea("");
    setTipo("");
    setNumeroDocumento("");
    setRepresentanteLegal("");
  };
  
  const handleSubmit = async () => {
    // Validar que todos los campos obligatorios están llenos
    const requiredFields = [
      selectedPais,
      selectedDepartamento,
      selectedMunicipio,
      digito,
      direccion,
      correo,
      confirmarCorreo,
      numeroCelular,
      confirmarCelular,
      diligencia,
      cargo,
      area,
      tipo,
      numeroDocumento,
    ];
  
    const missingFields = requiredFields.filter((field) => !field);
  
    if (missingFields.length > 0) {
      Swal.fire(
        "Campos obligatorios faltantes",
        `Por favor diligencia los siguientes campos: ${missingFields.join(", ")}`,
        "warning"
      );
      return; // Detener la ejecución si hay campos obligatorios faltantes
    }
  
    // Validar correo
    if (correo !== confirmarCorreo) {
      setCorreoError(true);
      Swal.fire(
        "Campos no coinciden",
        "Por favor verifica que los correos coincidan.",
        "warning"
      );
      return;
    }
  
    // Validar celular
    if (numeroCelular !== confirmarCelular) {
      setCelularError(true);
      Swal.fire(
        "Campos no coinciden",
        "Por favor verifica que los números de celular coincidan.",
        "warning"
      );
      return;
    }
  
    // Si todo está validado, proceder a guardar la empresa
    try {
      const empresaData = {
        pais: selectedPais,
        departamento: selectedDepartamento,
        municipio: selectedMunicipio,
        digito_verificacion: digito,
        razon_social: razon,
        nombre_comercial: comercial,
        direccion: direccion,
        tipo_empresa: tipoEmpresa,
        naturaleza_empresa: "Privada",
        correo_electronico: correo,
        numero_celular: numeroCelular,
        quien_diligencia: diligencia,
        cargo: cargo,
        area: area,
        representante_legal: numeroDocumento,
      };
      console.log("Datos que se van a enviar:", empresaData);
  
      const response = await axios.post(
        "http://localhost:8000/api/crear-empresa/",
        empresaData
      );

      console.log("Respuesta del servidor:", response.data);
  
      // Alerta de éxito
      Swal.fire("¡Éxito!", "La empresa ha sido creada exitosamente.", "success");
      limpiarCampos(); // Limpiar los campos del formulario
      router.push("/"); // Redirigir a la página principal o a donde desees
    } catch (error) {
      console.error("Error al crear empresa:", error);
      Swal.fire("Error", "Hubo un problema al crear la empresa.", "error");
    }
  };

  return (
    <Box sx={{ pt: 1 }}>
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
          <Select
            fullWidth
            value={selectedPais}
            onChange={(e) => setSelectedPais(e.target.value)}
            displayEmpty
          >
            <MenuItem value="" disabled>
              País *
            </MenuItem>
            {paises.map((pais) => (
              <MenuItem key={pais.value} value={pais.value}>
                {pais.label}
              </MenuItem>
            ))}
          </Select>
        </Grid>
        <Grid size={4}>
          <Select
            fullWidth
            value={selectedDepartamento}
            onChange={(e) => setSelectedDepartamento(e.target.value)}
            displayEmpty
            disabled={!selectedPais}
          >
            <MenuItem value="" disabled>
              Departamento *
            </MenuItem>
            {departamentosDisponibles.map((dep) => (
              <MenuItem key={dep.value} value={dep.value}>
                {dep.label}
              </MenuItem>
            ))}
          </Select>
        </Grid>
        <Grid size={4}>
          <Select
            fullWidth
            value={selectedMunicipio}
            onChange={(e) => setSelectedMunicipio(e.target.value)}
            displayEmpty
            disabled={!selectedDepartamento}
          >
            <MenuItem value="" disabled>
              Municipio *
            </MenuItem>
            {municipiosDisponibles.map((mun) => (
              <MenuItem key={mun.value} value={mun.value}>
                {mun.label}
              </MenuItem>
            ))}
          </Select>
        </Grid>
        <Grid size={4}>
          <TextField
            fullWidth
            label="Dígito de Verificación *"
            value={digito}
            onChange={(e) => setDigito(e.target.value)}
          />
        </Grid>
        <Grid size={4}>
          <TextField
            fullWidth
            label="Razón Social"
            value={razon}
            onChange={(e) => setRazon(e.target.value)}
          />
        </Grid>
        <Grid size={4}>
          <TextField
            fullWidth
            label="Nombre Comercial"
            value={comercial}
            onChange={(e) => setComercial(e.target.value)}
          />
        </Grid>
        <Grid size={4}>
          <TextField
            fullWidth
            label="Dirección *"
            value={direccion}
            InputProps={{ readOnly: true }}
            InputLabelProps={{ shrink: true }}
          />
        </Grid>
        <Grid size={4}>
          <Select
            fullWidth
            value={tipoEmpresa}
            onChange={(e) => setTipoEmpresa(e.target.value)}
            displayEmpty
          >
            <MenuItem value="" disabled>
              Tipo de empresa cacaotera
            </MenuItem>
            <MenuItem value="comercializador">Comercializador</MenuItem>
            <MenuItem value="transformador">Transformador</MenuItem>
            <MenuItem value="exportador">Exportador</MenuItem>
          </Select>
        </Grid>
        <Grid size={4}>
          <Button
            variant="contained"
            fullWidth
            onClick={() => setDireccionModalOpen(true)}
            sx={{ height: "100%", borderRadius: 4, backgroundColor: "#ff9800" }}
          >
            Generar Dirección
          </Button>
        </Grid>

        <Grid size={6}>
          <TextField
            fullWidth
            label="Correo Electrónico *"
            value={correo}
            onChange={(e) => setCorreo(e.target.value)}
            error={correoError}
            helperText={correoError && "Los correos no coinciden"}
            type="email"
          />
        </Grid>
        <Grid size={6}>
          <TextField
            fullWidth
            label="Confirmar Correo Electrónico *"
            value={confirmarCorreo}
            onChange={(e) => setConfirmarCorreo(e.target.value)}
            error={correoError}
            helperText={correoError && "Los correos no coinciden"}
            type="email"
          />
        </Grid>
        <Grid size={6}>
          <TextField
            fullWidth
            label="Número de Celular *"
            value={numeroCelular}
            onChange={(e) => setNumeroCelular(e.target.value)}
            error={celularError}
            helperText={celularError && "Los números no coinciden"}
          />
        </Grid>
        <Grid size={6}>
          <TextField
            fullWidth
            label="Confirmar Número de Celular *"
            value={confirmarCelular}
            onChange={(e) => setConfirmarCelular(e.target.value)}
            error={celularError}
            helperText={celularError && "Los números no coinciden"}
          />
        </Grid>

        <Grid size={4}>
          <TextField
            fullWidth
            label="Quién diligencia el formulario *"
            value={diligencia}
            onChange={(e) => setDiligencia(e.target.value)}
          />
        </Grid>
        <Grid size={4}>
          <TextField
            fullWidth
            label="Cargo *"
            value={cargo}
            onChange={(e) => setCargo(e.target.value)}
          />
        </Grid>
        <Grid size={4}>
          <TextField
            fullWidth
            label="Área *"
            value={area}
            onChange={(e) => setArea(e.target.value)}
          />
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
          <Select
            id="Tipo-Documento"
            value={tipo}
            onChange={handleChangePersona}
            fullWidth
            displayEmpty
          >
            <MenuItem value="" disabled>
              Tipo de documento:
            </MenuItem>
            {tiposDocumentoNatural.map((tipo) => (
              <MenuItem key={tipo.value} value={tipo.value}>
                {tipo.label}
              </MenuItem>
            ))}
          </Select>
        </Grid>
        <Grid size={6}>
          <TextField
            label="Número de documento: *"
            variant="outlined"
            fullWidth
            value={numeroDocumento}
            onChange={(e) => setNumeroDocumento(e.target.value)}
          />
        </Grid>
        <Grid size={12}>
          <Box display="flex" justifyContent="flex-end" gap={2}>
            <Button
              variant="contained"
              sx={{ backgroundColor: "green", borderRadius: 4 }}
              onClick={handleSearchPersona}
            >
              Buscar
            </Button>
            <Button
              variant="contained"
              sx={{ backgroundColor: "green", borderRadius: 4 }}
              onClick={() => setOpen(true)}
            >
              Crear
            </Button>
          </Box>
        </Grid>
        <Grid size={12}>
          <TextField
            label="Nombre del Representante Legal *"
            variant="outlined"
            fullWidth
            value={representanteLegal}
            InputProps={{ readOnly: true }} // Este campo es solo de lectura
          />
        </Grid>

        {/* Botones */}
        <Grid size={12}>
          <Box display="flex" justifyContent="flex-end" gap={2}>
            <Button variant="outlined" onClick={handleCerrar}>
              Cancelar
            </Button>
            <Button variant="contained" onClick={handleSubmit}>
              Guardar
            </Button>
          </Box>
        </Grid>
      </Grid>
      <CrearPersonaModal open={open} onClose={() => setOpen(false)} />
      <GenerarDireccionModal
        open={direccionModalOpen}
        onClose={() => setDireccionModalOpen(false)}
        onGuardar={handleGuardarDireccion}
      />
    </Box>
  );
}
