import { useState, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";

import { Modal, Backdrop, Fade, Typography, Button, Box, TextField, Select, MenuItem } from "@mui/material";


const Calendar = () => {
    const [days, setDays] = useState([]);
    const [selectedDate, setSelectedDate] = useState("");
    const [selectedTitle, setSelectedTitle] = useState("");
    const [selectedColor, setSelectedColor] = useState("blue"); // Color predeterminado
    const [showModal, setShowModal] = useState(false);

    const Holidays = async () => {
        const response = await fetch(
            "https://date.nager.at/api/v3/PublicHolidays/2023/CO"
        );
        const data = await response.json();
        return data;
    };

    useEffect(() => {
        Holidays().then((data) => setDays(data));
    }, []);

    const handleDateClick = (arg) => {
        setSelectedDate(arg.dateStr);
        console.log(arg.dateStr);

        const fechaencontrada = days.find((day) => day.date === arg.dateStr);
        console.log(fechaencontrada ?? "no encontrado");

        const localName = arg.dayEl.innerText.split("\n")[1];
        const evento = localName === undefined ? "" : localName;
        console.log(evento);
        const date = `${arg.date}`;
        console.log(date.startsWith("Sun") || date.startsWith("Sat"));
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    const handleSaveModal = () => {
        const newEvent = {
            localName: selectedTitle,
            date: selectedDate,
            color: selectedColor,
        };

        console.log(newEvent);

        setDays([...days, newEvent]);
        setShowModal(false);
    };

    console.log(days);

    const start = "2023-01-01";
    const end = "2023-01-31";

    const businessHours = {
        daysOfWeek: [1, 2, 3, 4, 5],
    };

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
            <FullCalendar
                plugins={[dayGridPlugin, interactionPlugin]}
                dateClick={handleDateClick}
                initialView="dayGridMonth"
                locale={"es"}
                editable={true}
                selectable={true}
                initialDate={start}
                validRange={{
                    start: start,
                    end: `${end.split("-")[0]}-${end.split("-")[1]}-${parseInt(end.split("-")[2]) + 1
                        }`,
                }}
                businessHours={businessHours}
                events={days.map((day) => {
                    return {
                        title: day.localName,
                        date: day.date,
                        color: day.color || "blue",
                    };
                })}
            />

            <Modal
                open={showModal}
                onClose={handleCloseModal}
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                closeAfterTransition
                slots={{ backdrop: Backdrop }}
                slotProps={{
                    backdrop: {
                        timeout: 500,
                    },
                }}
            >
                <Fade in={showModal}>
                    <Box sx={style}>
                        <Typography id="modal-modal-title" variant="h6" component="h2">
                            Event Details
                        </Typography>
                        <TextField id="modal-modal" disabled value={selectedDate} fullWidth sx={{ my: 2 }}>
                            {selectedDate}
                        </TextField>
                        <TextField
                            label="Título"
                            value={selectedTitle}
                            onChange={(e) => setSelectedTitle(e.target.value)}
                            fullWidth
                        />
                        <Select
                            label="Color"
                            value={selectedColor}
                            onChange={(e) => setSelectedColor(e.target.value)}
                            sx={{ mt: 2, width: "100%" }}
                        >
                            <MenuItem value="blue">Azul</MenuItem>
                            <MenuItem value="red">Rojo</MenuItem>
                            <MenuItem value="green">Verde</MenuItem>
                        </Select>
                        <Button
                            onClick={handleSaveModal}
                            variant="contained"

                            sx={{ mt: 2 }}
                        >
                            Save
                        </Button>
                    </Box>
                </Fade>
            </Modal>
        </>
    );
};

export default Calendar;
