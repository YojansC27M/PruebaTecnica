"use client";
import * as React from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import axios from "axios"; // Usamos axios para hacer solicitudes HTTP
import Swal from "sweetalert2";


interface RepresentanteLegal {
  numero_documento: string;
  primer_nombre: string;
  primer_apellido: string;
  correo_electronico: string;
  telefono_celular: string;
}

interface Empresa {
  id: number;
  razon_social: string;
  tipo_empresa: string;
  correo_electronico: string;
  numero_celular: string;
  representante_legal: RepresentanteLegal; // Relacionado con Persona
}

export default function TablaEmpresas() {
  const [empresas, setEmpresas] = React.useState<Empresa[]>([]);

  // Función para cargar las empresas desde el backend
  const cargarEmpresas = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/listar-empresas/"); // Solicitar las empresas
      setEmpresas(response.data); // Actualizar el estado con los datos obtenidos
    } catch (error) {
      console.error("Error al cargar las empresas", error);
    }
  };

  // Cargar las empresas al cargar el componente
  React.useEffect(() => {
    cargarEmpresas();
  }, []);

  const handleEdit = (id: number) => {
    console.log("Editar empresa con ID:", id);
  };

  const handleDelete = async (id: number) => {
    // Confirmar si el usuario quiere eliminar la empresa
    const result = await Swal.fire({
      title: "¿Estás seguro?",
      text: "¡No podrás revertir esta acción!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, eliminarla",
    });

    if (result.isConfirmed) {
      try {
        // Eliminar la empresa
        const response = await axios.delete(`http://localhost:8000/api/eliminar-empresa/${id}/`);
        console.log(response.data); // Puedes mostrar un mensaje de éxito si lo deseas
        
        // Mostrar un mensaje de éxito con SweetAlert
        Swal.fire("¡Eliminado!", "La empresa ha sido eliminada.", "success");
        
        // Actualizar la lista de empresas después de la eliminación
        setEmpresas((prevEmpresas) => prevEmpresas.filter((empresa) => empresa.id !== id));
      } catch (error) {
        console.error("Error al eliminar la empresa", error);
        Swal.fire("Error", "No se pudo eliminar la empresa", "error");
      }
    }
  };

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead sx={{ backgroundColor: "#F4C7AB" }}>
          <TableRow>
            <TableCell><strong>ID</strong></TableCell>
            <TableCell><strong>Documento</strong></TableCell>
            <TableCell><strong>Razón Social</strong></TableCell>
            <TableCell><strong>Tipo de Empresa</strong></TableCell>
            <TableCell><strong>Correo Electrónico</strong></TableCell>
            <TableCell><strong>Número de Celular</strong></TableCell>
            <TableCell><strong>Representante Legal</strong></TableCell>
            <TableCell><strong>Acciones</strong></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {empresas.map((empresa) => (
            <TableRow key={empresa.id}>
              <TableCell>{empresa.id}</TableCell>
              <TableCell>{empresa.representante_legal.numero_documento}</TableCell>
              <TableCell>{empresa.razon_social}</TableCell>
              <TableCell>{empresa.tipo_empresa}</TableCell>
              <TableCell>{empresa.correo_electronico}</TableCell>
              <TableCell>{empresa.numero_celular}</TableCell>
              <TableCell>
                {empresa.representante_legal.primer_nombre} {empresa.representante_legal.primer_apellido}
              </TableCell>
              <TableCell>
                <IconButton color="primary" onClick={() => handleEdit(empresa.id)}>
                  <EditIcon />
                </IconButton>
                <IconButton color="error" onClick={() => handleDelete(empresa.id)}>
                  <DeleteIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

