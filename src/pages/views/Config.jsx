import { useState } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { AiOutlineDollarCircle, AiOutlineTool } from "react-icons/ai";
import {
    Backdrop,
    Box,
    Fade,
    FormControl,
    InputAdornment,
    Modal,
    TextField,
} from "@mui/material";
function Config() {
    const [open, setOpen] = useState(false);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const style = {
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: 400,
        bgcolor: "background.paper",
        border: "2px solid #000",
        boxShadow: 24,
        p: 4,
    };

    return (
        <>
            <div className="config_view">
                <h1>CONCEPTOS NOMINA</h1>
                <div className="card_config">
                    <Card sx={{ width: 350 }}>
                        <CardMedia sx={{ height: 100 }} title="Dollar Icon">
                            <AiOutlineDollarCircle size={100} />
                        </CardMedia>
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="div">
                                Conceptos
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Horas y sueldo por conceptos
                            </Typography>
                        </CardContent>
                        <CardActions>
                            <Button size="small" onClick={handleOpen} >Abrir</Button>
                        </CardActions>
                    </Card>
                    <Card sx={{ width: 350 }}>
                        <CardMedia sx={{ height: 100 }} title="Dollar Icon">
                            <AiOutlineTool size={100} />
                        </CardMedia>
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="div">
                                Deducciones
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Dedicciones por conceptos
                            </Typography>
                        </CardContent>
                        <CardActions>
                            <Button size="small">Abrir</Button>
                        </CardActions>
                    </Card>
                </div>
            </div>

            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={open}
                onClose={handleClose}
                closeAfterTransition
                slots={{ backdrop: Backdrop }}
                slotProps={{
                    backdrop: {
                        timeout: 500,
                    },
                }}
            >
                <Fade in={open}>
                    <Box sx={style}>
                        <Typography id="transition-modal-title" variant="h6" component="h2">
                            Conceptos de horas
                        </Typography>
                        <FormControl>
                            <form method="POST">
                                <TextField
                                    name="nocturno"
                                    label="Recargo Nocturno"
                                    type="number"
                                    sx={{ mb: 2 }}
                                    InputProps={{
                                        endAdornment: <InputAdornment position="end">%</InputAdornment>,
                                    }}
                                    fullWidth
                                />

                                <TextField
                                    name="festivo"
                                    label="Recargo Festivo"
                                    type="number"
                                    sx={{ mb: 2 }}
                                    InputProps={{
                                        endAdornment: <InputAdornment position="end">%</InputAdornment>,
                                    }}
                                    fullWidth
                                />

                                <TextField
                                    name="dominical"
                                    label="Recargo Dominical"
                                    type="number"
                                    sx={{ mb: 2 }}
                                    InputProps={{
                                        endAdornment: <InputAdornment position="end">%</InputAdornment>,
                                    }}
                                    fullWidth
                                />

                                <Button type="submit" variant="contained" sx={{ mt: 2 }}>
                                    Save
                                </Button>
                            </form>
                        </FormControl>
                    </Box>
                </Fade>
            </Modal>
        </>
    );
}

export default Config;
