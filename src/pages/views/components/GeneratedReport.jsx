import * as React from "react";
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

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function FullScreenDialog({
  reportData,
  openModal,
  setReportModal,
  metaData,
}) {
  const handleClose = () => {
    setReportModal(false);
  };

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
            <Button autoFocus color="inherit">
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
          <h2>Base salary: ${reportData[0]?.subTitle.toLocaleString()}</h2>
          <h3>Day salary: ${reportData[0]?.subTitle / 30} </h3>
          <h3>
            Worked holidays: {metaData.allHoliday}
            <small style={{ color: "green" }}>
              +{(reportData[0]?.subTitle / 30) * 0.75 * metaData.allHoliday}
            </small>
          </h3>
          <h3>
            Weekend worked: {metaData.allWeekend}
            <small style={{ color: "green" }}>
              +{(reportData[0]?.subTitle / 30) * 0.75 * metaData.allWeekend}
            </small>
          </h3>
          <h3>
            Days not worked: {metaData.allNotWork}{" "}
            <small style={{ color: "red" }}>
              -{(reportData[0]?.subTitle / 30) * metaData.allNotWork}
            </small>
          </h3>
        </div>
        <br />
      </Dialog>
    </div>
  );
}
