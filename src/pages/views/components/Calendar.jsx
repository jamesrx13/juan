import { useState, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import { FcApproval, FcCancel } from "react-icons/fc";

import { Modal, Backdrop, Fade, Typography, Button, Box } from "@mui/material";
import { request } from "../../../statics/core/utils";
import { API_MAIN_URL } from "../../../statics/core/config";
import { toast } from "react-toastify";

const Calendar = ({ workerData }) => {
  const [days, setDays] = useState([]);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTitle, setSelectedTitle] = useState("");
  const [selectedColor, setSelectedColor] = useState("blue"); // Color predeterminado
  const [showModal, setShowModal] = useState(false);
  const [daysData, setDaysData] = useState({
    isHoliday: false, //Feriado
    isWeekend: false, //Fin de semana
  });

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

    const fechaencontrada = days.some((day) => day.date === arg.dateStr);
    const date = `${arg.date}`;

    console.log(fechaencontrada ?? "no encontrado");
    console.log(date.startsWith("Sun") || date.startsWith("Sat"));

    if (fechaencontrada) {
      setDaysData((prevState) => ({
        ...prevState,
        isHoliday: true,
      }));
    } else {
      setDaysData((prevState) => ({
        ...prevState,
        isHoliday: false,
      }));
    }

    if (date.startsWith("Sun") || date.startsWith("Sat")) {
      setDaysData((prevState) => ({
        ...prevState,
        isWeekend: true,
      }));
    } else {
      setDaysData((prevState) => ({
        ...prevState,
        isWeekend: false,
      }));
    }

    setShowModal(true);
  };
  console.log(daysData.isHoliday);

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleSaveModal = () => {
    const data = {
      id: workerData._id,
      workDate: selectedDate,
      ...daysData,
    };

    request("POST", API_MAIN_URL + `works/`, data)
      .then((resp) => {
        console.log(resp);
      })
      .catch((err) => toast.error(err.message))
      .finally(() => {
        setShowModal(false);
      });
  };

  // const start = "2023-01-01";
  // const end = "2023-01-31";

  const businessHours = {
    daysOfWeek: [1, 2, 3, 4, 5],
  };

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "white",
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
            <Typography
              id="modal-modal-title"
              variant="h6"
              component="h2"
              align="center"
            >
              {daysData.isHoliday
                ? "Did Juan work this holiday?"
                : daysData.isWeekend
                ? "Did Juan work this day of the weekend?"
                : "Didn't Juan work this day?"}
              <br /> <br />
              <Button
                component="label"
                variant="contained"
                startIcon={<FcApproval />}
                onClick={handleSaveModal}
              >
                Yes
              </Button>
              <Button
                component="label"
                variant="contained"
                startIcon={<FcCancel />}
                style={{ marginLeft: "10px" }}
                onClick={handleCloseModal}
              >
                Cancel
              </Button>
            </Typography>
          </Box>
        </Fade>
      </Modal>
    </>
  );
};

export default Calendar;
