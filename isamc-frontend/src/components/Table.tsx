"use client";
import * as React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

interface Empresa {
  id: number;
  nit: string;
  razonSocial: string;
  naturaleza: string;
  tipoEmpresa: string;
  categoria: string;
  correo: string;
  celular: string;
  representante: string;
}

const empresas: Empresa[] = [
  {
    id: 1,
    nit: "900123456",
    razonSocial: "Tech Innovators S.A.S",
    naturaleza: "Jurídica",
    tipoEmpresa: "Tecnología",
    categoria: "Grande",
    correo: "contacto@tech.com",
    celular: "3001234567",
    representante: "Laura Gómez",
  },
  {
    id: 2,
    nit: "800654321",
    razonSocial: "Agro Natural Ltda",
    naturaleza: "Natural",
    tipoEmpresa: "Agroindustria",
    categoria: "Mediana",
    correo: "info@agronatural.com",
    celular: "3107654321",
    representante: "Carlos Ruiz",
  },
];

export default function TablaEmpresas() {
  const handleEdit = (id: number) => {
    console.log("Editar empresa con ID:", id);
  };

  const handleDelete = (id: number) => {
    console.log("Eliminar empresa con ID:", id);
  };

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead sx={{ backgroundColor: "#F4C7AB" }}>
          <TableRow>
            <TableCell><strong>ID</strong></TableCell>
            <TableCell><strong>NIT</strong></TableCell>
            <TableCell><strong>Razón Social</strong></TableCell>
            <TableCell><strong>Naturaleza</strong></TableCell>
            <TableCell><strong>Tipo de Empresa</strong></TableCell>
            <TableCell><strong>Categoría</strong></TableCell>
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
              <TableCell>{empresa.nit}</TableCell>
              <TableCell>{empresa.razonSocial}</TableCell>
              <TableCell>{empresa.naturaleza}</TableCell>
              <TableCell>{empresa.tipoEmpresa}</TableCell>
              <TableCell>{empresa.categoria}</TableCell>
              <TableCell>{empresa.correo}</TableCell>
              <TableCell>{empresa.celular}</TableCell>
              <TableCell>{empresa.representante}</TableCell>
              <TableCell>
                <IconButton
                  color="primary"
                  onClick={() => handleEdit(empresa.id)}
                >
                  <EditIcon />
                </IconButton>
                <IconButton
                  color="error"
                  onClick={() => handleDelete(empresa.id)}
                >
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
