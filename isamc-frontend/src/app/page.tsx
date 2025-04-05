"use client";

import { Box, Grid } from "@mui/material";
import TablePersonas from "components/components/Table";


// app/page.tsx
export default function HomePage() {
  return (
    <Box sx={{pt:1}}>
      <Grid container spacing={2}>
        <Grid size={6}>
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
        <Grid size={12}>
          <TablePersonas />
        </Grid>
      </Grid>
    </Box>
  );
}
