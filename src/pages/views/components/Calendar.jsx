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
  const [selectedDate, setSelectedDate] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [daysData, setDaysData] = useState({
    isHoliday: false,
    isWeekend: false,
  });

  const [days, setDays] = useState([]);
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);

      // Cargar días festivos
      const holidaysResponse = await fetch(
        "https://date.nager.at/api/v3/PublicHolidays/2023/CO"
      );
      const holidaysData = await holidaysResponse.json();

      // Cargar eventos del trabajador
      const eventsResponse = await request("GET", API_MAIN_URL + `works/${workerData._id}`);
      const workerEvents = eventsResponse || [];

      const newEvents = workerEvents.map((element) => {
        const currentDate = new Date(element.workDate);
        var month = currentDate.getMonth() + 1;
        var day = currentDate.getDate() + 1;
        element.workDate = `${currentDate.getFullYear()}-${month < 10 ? "0" + month : month}-${day < 10 ? "0" + day : day}`;

        if (element.isHoliday) {
          return {
            localName: "Worked holiday",
            date: element.workDate,
            color: "purple",
          };
        } else if (element.isWeekend) {
          return {
            localName: "Worked weekend",
            date: element.workDate,
            color: "orange",
          };
        } else {
          return {
            localName: "He didn't work this day",
            date: element.workDate,
            color: "red",
          };
        }
      });

      // Combinar días festivos y eventos del trabajador
      const combinedEvents = [...holidaysData, ...newEvents];

      setIsLoading(false);

      // Establecer los datos cargados
      setDays(holidaysData);
      setEvents(combinedEvents);
    };

    fetchData();
  }, [workerData]);

  const handleDateClick = (arg) => {
    setSelectedDate(arg.dateStr);

    const fechaencontrada = days.some((day) => day.date === arg.dateStr);
    const date = `${arg.date}`;

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
        const newEvent = {
          localName: daysData.isHoliday
            ? "Worked holiday"
            : daysData.isWeekend
              ? "Worked weekend"
              : "He didn't work this day",
          date: selectedDate,
          color: daysData.isHoliday
            ? "purple"
            : daysData.isWeekend
              ? "orange"
              : "red",
        };
        setEvents((prevEvents) => [...prevEvents, newEvent]);
      })
      .catch((err) => toast.error(err.message))
      .finally(() => {
        setShowModal(false);
      });
  };


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
      {isLoading ? (
        <h1>Cargando...</h1>
      ) : (
        <FullCalendar
          plugins={[dayGridPlugin, interactionPlugin]}
          dateClick={handleDateClick}
          initialView="dayGridMonth"
          locale={"es"}
          editable={true}
          selectable={true}
          businessHours={businessHours}
          events={events.map((day) => {
            return {
              title: day.localName,
              date: day.date,
              color: day.color || "blue",
            };
          })}
        />
      )}

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
