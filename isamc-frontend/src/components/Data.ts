// data.ts
export const paises = [
  { value: "CO", label: "Colombia" },
  { value: "AR", label: "Argentina" },
  { value: "PE", label: "Perú" },
  { value: "CL", label: "Chile" },
  { value: "MX", label: "México" },
];

export const departamentos: Record<string, { value: string; label: string }[]> = {
  CO: [
    { value: "1", label: "Atlántico" },
    { value: "2", label: "Cundinamarca" },
    { value: "3", label: "Antioquia" },
  ],
  AR: [
    { value: "1", label: "Buenos Aires" },
    { value: "2", label: "CABA" },
  ],
  PE: [
    { value: "1", label: "Lima" },
    { value: "2", label: "Cusco" },
  ],
  CL: [
    { value: "1", label: "Santiago" },
    { value: "2", label: "Valparaíso" },
  ],
  MX: [
    { value: "1", label: "CDMX" },
    { value: "2", label: "Jalisco" },
  ],
};

export const municipios: Record<string, { value: string; label: string }[]> = {
  "CO-1": [
    { value: "1", label: "Barranquilla" },
    { value: "2", label: "Soledad" },
  ],
  "CO-2": [
    { value: "1", label: "Bogotá" },
    { value: "2", label: "Chía" },
  ],
  "CO-3": [
    { value: "1", label: "Medellín" },
    { value: "2", label: "Envigado" },
  ],
  "AR-1": [
    { value: "1", label: "La Plata" },
    { value: "2", label: "Mar del Plata" },
  ],
  "AR-2": [
    { value: "1", label: "La Pampa" },
    { value: "2", label: "Tucumán" },
  ],
};
