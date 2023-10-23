/* eslint-disable react/prop-types */
import { forwardRef, useEffect, useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import ListItemText from "@mui/material/ListItemText";
import ListItem from "@mui/material/ListItem";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Slide from "@mui/material/Slide";
import { AiOutlineClose } from "react-icons/ai";
import { getConcepts } from "../../services/ConceptsServices";

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function FullScreenDialog({
  reportData,
  openModal,
  setReportModal,
  metaData,
}) {

  const [concept, setConcept] = useState([]);

  useEffect(() => {
    getConcepts().then((res) => {
      setConcept(res);
    });
  }, []);




  const handleClose = () => {
    setReportModal(false);
  };

  const handlePrint = () => {
    window.print();
  };


  console.log(concept);




  const baseSalary = parseInt(reportData[0]?.subTitle);
  const daySalary = reportData[0]?.subTitle / 30;
  const workedHolidaysAmount = (metaData.allHoliday * daySalary * concept[0]?.propertyconcept) + (metaData.allHoliday * daySalary);
  const weekendWorkedAmount = (metaData.allWeekend * daySalary * concept[1]?.propertyconcept) + (metaData.allWeekend * daySalary);
  const daysNotWorkedAmount = metaData.allNotWork * daySalary;

  const totalSalary = baseSalary + workedHolidaysAmount + weekendWorkedAmount - daysNotWorkedAmount;

  console.log(` ${baseSalary} + ${workedHolidaysAmount} + ${weekendWorkedAmount} - ${daysNotWorkedAmount} = ${totalSalary}`);


  console.log(metaData);
  return (
    <div>
      <Dialog
        fullScreen
        open={openModal}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar sx={{ position: "relative" }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <AiOutlineClose />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              Report
            </Typography>
            <Button onClick={handlePrint} className="no-print" autoFocus color="inherit">
              Print
            </Button>
          </Toolbar>
        </AppBar>
        <List>
          {reportData.map((item, index) => (
            <>
              <ListItem
                button
                key={index}
                secondaryAction={<>{item.eventType}</>}
              >
                <ListItemText
                  primary={item.title}
                //   secondary={item.subTitle.toLocaleString()}
                />
              </ListItem>
              <Divider />
            </>
          ))}
        </List>
        <br />
        <div className="information" style={{ marginInline: "20px" }}>
          <h2>Base salary: ${baseSalary}</h2>
          <h3>Day salary: ${daySalary} </h3>
          <h3>
            Worked holidays: {metaData.allHoliday}
            <small style={{ color: "green" }}>
              +{workedHolidaysAmount}
            </small>
          </h3>
          <h3>
            Weekend worked: {metaData.allWeekend}
            <small style={{ color: "green" }}>
              +{weekendWorkedAmount}
            </small>
          </h3>
          <h3>
            Days not worked: {metaData.allNotWork}{" "}
            <small style={{ color: "red" }}>
              -{daysNotWorkedAmount}
            </small>
          </h3>

          <h1>
            Total salary:
            <small style={{ color: "green" }}>
              {totalSalary}

            </small>
          </h1>
        </div>
        <br />
      </Dialog>
    </div>
  );
}
