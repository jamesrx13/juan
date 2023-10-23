import { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { AiOutlineDollarCircle } from "react-icons/ai";
import {
    Backdrop,
    Box,
    Fade,
    FormControl,
    InputAdornment,
    Modal,
    Select,
    MenuItem,
    TextField,
} from "@mui/material";
import { getConcepts, updateConcepts } from "../services/ConceptsServices";
function Config() {
    const [open, setOpen] = useState(false);
    const [data, setData] = useState([]);
    const [edit, setEdit] = useState(false);
    const [selectedConcept, setSelectedConcept] = useState('');
    const [selectedConceptID, setSelectedConceptID] = useState('');
    const [selectedPercentage, setSelectedPercentage] = useState('');

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

    useEffect(() => {
        getConcepts().then((res) => {
            setData(res);
        });
    }, []);

    console.log(data);

    const handleEdit = (e) => {
        e.preventDefault();
        setEdit(!edit);
    }

    const handleSave = (e) => {
        e.preventDefault();
        // Aquí puedes guardar el valor seleccionado en 'selectedConceptID'

        const data = {
            _id: selectedConceptID,
            conceptstitle: selectedConcept,
            propertyconcept: parseInt(selectedPercentage)
        };

        const respuesta = updateConcepts(data);

        console.log(respuesta);

        console.log(data);
    }


    const handleConceptChange = (e) => {
        const selectedConceptValue = e.target.value;
        setSelectedConcept(selectedConceptValue);

        // Buscar el concepto seleccionado en los datos
        const conceptData = data.find((item) => item.conceptstitle === selectedConceptValue);

        // Si se encuentra el concepto, establecer el ID y el porcentaje
        if (conceptData) {
            setSelectedConceptID(conceptData._id);
            setSelectedPercentage(conceptData.propertyconcept);
        } else {
            setSelectedConceptID('');
            setSelectedPercentage(''); // Limpiar los valores si no se encuentra el concepto
        }
    };

    console.log(selectedPercentage);

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
                            <Button size="small" onClick={handleOpen}>
                                Abrir
                            </Button>
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
                                    label="ID del Concepto"
                                    value={selectedConceptID}
                                    sx={{ mb: 2 }}
                                    fullWidth
                                    disabled
                                />
                                <Select
                                    value={selectedConcept}
                                    onChange={handleConceptChange}
                                    sx={{ mb: 2 }}
                                    fullWidth
                                    disabled={!edit}
                                >
                                    <MenuItem value="">Selecciona un concepto</MenuItem>
                                    {data.map((item) => (
                                        <MenuItem key={item._id} value={item.conceptstitle}>
                                            {item.conceptstitle}
                                        </MenuItem>
                                    ))}
                                </Select>

                                <TextField
                                    label="% Porcentaje"
                                    sx={{ mb: 2 }}
                                    fullWidth
                                    disabled={!edit}
                                    onChange={(e) => setSelectedPercentage(e.target.value)}
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position="end">{selectedPercentage}%</InputAdornment>
                                        ),
                                    }}

                                />

                                <Button type="submit" onClick={handleSave} variant="contained" sx={{ mt: 2 }}>
                                    Save
                                </Button>
                                <Button type="submit" onClick={handleEdit} color="secondary" variant={edit ? "contained" : "outlined"} sx={{ mt: 2 }}>
                                    Edit
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
