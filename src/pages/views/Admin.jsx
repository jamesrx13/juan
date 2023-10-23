import React from 'react';
import { Typography, Paper, Box } from '@mui/material';

function Admin() {
    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <Paper elevation={5} style={{ padding: '50px 20px', width: '600px', textAlign: 'center' }}>
                <Typography variant="h4" gutterBottom>
                    ¡Bienvenido, Administrador!
                </Typography>
                <Box mt={2}>
                    <Typography variant="body1">
                        En esta área, puedes gestionar las tareas de administración y configuración.
                    </Typography>
                </Box>
            </Paper>
        </div>
    )
}

export default Admin;
