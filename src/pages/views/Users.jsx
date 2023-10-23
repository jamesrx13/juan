import { useEffect, useState } from 'react';
import { getSessionUserData, request } from '../../statics/core/utils';
import { Typography, Paper, CircularProgress, List, ListItem, ListItemText, Divider, MenuItem, Select, FormControl, InputLabel, Button } from '@mui/material';
import { API_MAIN_URL } from '../../statics/core/config';
import { toast } from 'react-toastify';
import FullScreenDialog from './components/GeneratedReport';

function Users() {
    const [data, setUserData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [monthValue, setMontValue] = useState("");
    const [yearValue, setYearValue] = useState("");
    const [metaData, setMetaData] = useState({});

    const [reportModal, setReportModal] = useState(false);
    const [reportModalData, setReportModalData] = useState([]);

    useEffect(() => {
        setIsLoading(true);
        const data = getSessionUserData();

        setUserData(data);

        setIsLoading(false);

    }, [])

    const handleReport = () => {
        if (monthValue != "" && yearValue != "") {
            request(
                "GET",
                API_MAIN_URL +
                "works/" +
                "?workerId=" +
                data.id +
                "&workDate=" +
                yearValue +
                "-" +
                monthValue +
                "-02",
                {}
            ).then((resp) => {
                dataProcess(resp);
            });
        } else {
            toast.error("Please fill all fields");
        }
    };

    const dataProcess = (resp) => {
        const dataToRender = [];
        const allDaysOfMonth = new Date(yearValue, monthValue, 0).getDate();
        const daysOfWeek = [
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
            "Sunday",
        ];

        const month = [
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December",
        ];

        console.log(resp);

        for (var day = 1; day <= allDaysOfMonth; day++) {
            var indice = new Date(yearValue, monthValue - 1, day - 1).getDay();

            var placeday = day < 10 ? "0" + day : day;

            const generateDate = yearValue + "-" + monthValue + "-" + placeday;

            let machDate = resp.filter((item) => {
                var workDate = new Date(item.workDate).toDateString();
                var generated = new Date(generateDate).toDateString();

                return workDate == generated;
            });

            let eventType = "";

            if (machDate.length > 0) {
                machDate = machDate[0];
                if (machDate.isHoliday) {
                    eventType = "Work holiday";
                } else if (machDate.isWeekend) {
                    eventType = "Work weekend";
                } else if (machDate.isHoliday == false && machDate.isWeekend == false) {
                    eventType = "He didn't work this day";
                }
            }

            dataToRender.push({
                title:
                    daysOfWeek[indice] +
                    ", " +
                    month[monthValue - 1] +
                    " " +
                    placeday +
                    ", " +
                    yearValue,
                subTitle: data.salary,
                eventType: eventType,
                isHoliday: machDate?.isHoliday,
                isWeekend: machDate?.isWeekend,
            });
        }

        console.log(dataToRender);

        const allHoliday = dataToRender.filter((item) => item.isHoliday == true);
        const allWeekend = dataToRender.filter((item) => item.isWeekend == true);
        const allNotWork = dataToRender.filter(
            (item) => item.isHoliday == false && item.isWeekend == false
        );

        setMetaData({
            allHoliday: allHoliday.length,
            allWeekend: allWeekend.length,
            allNotWork: allNotWork.length,
        });

        setReportModalData(dataToRender);
        setReportModal(true);
    };

    return (
        <>
            <Paper elevation={5} style={{ padding: '20px', maxWidth: '700px', margin: 'auto' }}>
                <Typography variant="h4" align="center" style={{ color: '#1976D2' }} gutterBottom>
                    Datos del Usuario
                </Typography>
                {isLoading ? (
                    <div style={{ textAlign: 'center', marginTop: '20px' }}>
                        <CircularProgress color="primary" />
                        <p>Cargando...</p>
                    </div>
                ) : (
                    <List>
                        <ListItem>
                            <ListItemText primary="Nombre" secondary={data.name} />
                        </ListItem>
                        <Divider />
                        <ListItem>
                            <ListItemText primary="Apellido" secondary={data.lastname} />
                        </ListItem>
                        <Divider />
                        <ListItem>
                            <ListItemText primary="Nombre de usuario" secondary={data.username} />
                        </ListItem>
                        <Divider />
                        <ListItem>
                            <ListItemText primary="Email" secondary={data.email} />
                        </ListItem>
                        <Divider />
                        <ListItem>
                            <ListItemText primary="Fecha de creación" secondary={data.createdAt} />
                        </ListItem>
                        <Divider />
                        <ListItem>
                            <ListItemText primary="Salario" secondary={`$${data.salary}`} />
                        </ListItem>
                        <Divider />
                        <ListItem>
                            <ListItemText primary="Fecha" secondary={data.date} />
                        </ListItem>
                        <Divider />
                        <ListItem>
                            <ListItemText primary="Estatus" secondary={data.status === 1 ? 'Activo' : 'Inactivo'} />
                        </ListItem>
                        <Divider />
                        <ListItem>
                            <ListItemText primary="Rol" secondary={data.placerole} />
                        </ListItem>
                    </List>
                )}
                <FormControl fullWidth>
                    <InputLabel id="years">Year</InputLabel>
                    <Select
                        labelId="years"
                        id="years-select"
                        label="Year"
                        value={yearValue}
                        onChange={(e) => setYearValue(e.target.value)}
                    >
                        <MenuItem value={2018}>2018</MenuItem>
                        <MenuItem value={2019}>2019</MenuItem>
                        <MenuItem value={2020}>2020</MenuItem>
                        <MenuItem value={2021}>2021</MenuItem>
                        <MenuItem value={2022}>2022</MenuItem>
                        <MenuItem value={2023}>2023</MenuItem>
                    </Select>
                </FormControl>
                <FormControl fullWidth>
                    <InputLabel id="all-month">Month</InputLabel>
                    <Select
                        labelId="all-month"
                        id="all-month-select"
                        label="Month"
                        value={monthValue}
                        onChange={(e) => setMontValue(e.target.value)}
                    >
                        <MenuItem value={1}>January</MenuItem>
                        <MenuItem value={2}>February</MenuItem>
                        <MenuItem value={3}>March</MenuItem>
                        <MenuItem value={4}>April</MenuItem>
                        <MenuItem value={5}>May</MenuItem>
                        <MenuItem value={6}>June</MenuItem>
                        <MenuItem value={7}>July</MenuItem>
                        <MenuItem value={8}>August</MenuItem>
                        <MenuItem value={9}>September</MenuItem>
                        <MenuItem value={10}>October</MenuItem>
                        <MenuItem value={11}>November</MenuItem>
                        <MenuItem value={12}>December</MenuItem>
                    </Select>
                </FormControl>
                <Button onClick={handleReport} variant="contained">
                    Generated
                </Button>

                <FullScreenDialog
                    reportData={reportModalData}
                    openModal={reportModal}
                    setReportModal={setReportModal}
                    metaData={metaData}
                />
            </Paper>


        </>
    );
}

export default Users;
