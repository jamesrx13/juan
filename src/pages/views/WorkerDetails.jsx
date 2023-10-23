import { useState } from "react";
import { WorkersView } from "./Workers";
import { BiArrowBack } from "react-icons/bi";
import Calendar from "./components/Calendar";
import Switch from "@mui/material/Switch";
import { UpdateWorkers, deleteWorker } from "../services/WorkerServices";
import { Backdrop, Box, Button, Fade, FormControl, Modal, TextField, Typography } from "@mui/material";

export const WorkerDetails = ({ workerData, setView }) => {
  const [checked, setChecked] = useState(workerData.status === 1);
  const [open, setOpen] = useState(false);
  const [editedUserData, setEditedUserData] = useState({}); // Estado para almacenar los datos editados

  const handleOpen = () => {
    setOpen(true);
    setEditedUserData({ ...workerData });
  };

  const handleClose = () => {
    setOpen(false);
    setEditedUserData({}); // Limpia los datos editados cuando se cierra el modal
  };

  const handleChange = async (formEvt) => {
    setChecked(formEvt.target.checked);

    const data = {
      _id: workerData._id,
      status: formEvt.target.checked ? 1 : 0,
    };

    const response = await UpdateWorkers(data);
    console.log(response);
  };

  const clickdelete = async (id) => {
    await deleteWorker(id);
    setView(<WorkersView setView={setView} />);
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

  const clicksave = async (e) => {
    e.preventDefault();
    const response = await UpdateWorkers(editedUserData);
    console.log(response);
    handleClose();
  };

  return (
    <div className="worker-details-view">
      <div className="head">
        <button onClick={() => setView(<WorkersView setView={setView} />)}>
          <BiArrowBack />
          Back
        </button>
        <h1>
          {workerData.name?.toUpperCase() +
            " " +
            workerData.lastname?.toUpperCase()}{" "}
        </h1>

        <div>

          <Button style={{ backgroundColor: "red" }} variant="contained" onClick={() => clickdelete(workerData._id)}>
            Delete
          </Button>

          <Button style={{ backgroundColor: "green" }} color="success" variant="contained" onClick={handleOpen}>
            Actualizar
          </Button>
          <Switch
            checked={checked}
            onClick={handleChange}
            inputProps={{ "aria-label": "controlled" }}
            name="status"
          />
        </div>
      </div>
      <br />
      <section>
        {<Calendar workerData={workerData} />}
      </section>

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
              Register User
            </Typography>
            <FormControl>
              <form method="PUT" onSubmit={clicksave}>
                <TextField
                  name="name"
                  label="Nombre"
                  value={editedUserData.name || ""}
                  onChange={(e) => setEditedUserData({ ...editedUserData, name: e.target.value })}
                  fullWidth
                  sx={{ mb: 2 }}
                />
                <TextField
                  name="lastname"
                  label="Apellido"
                  value={editedUserData.lastname || ""}
                  onChange={(e) => setEditedUserData({ ...editedUserData, lastname: e.target.value })}
                  fullWidth
                  sx={{ mb: 2 }}
                />
                <TextField
                  name="username"
                  label="Nombre de usuario"
                  value={editedUserData.username || ""}
                  onChange={(e) => setEditedUserData({ ...editedUserData, username: e.target.value })}
                  fullWidth
                  sx={{ mb: 2 }}
                />
                <TextField
                  name="date"
                  type="date"
                  value={editedUserData.date || ""}
                  onChange={(e) => setEditedUserData({ ...editedUserData, date: e.target.value })}
                  fullWidth
                  sx={{ mb: 2 }}
                />
                <TextField
                  name="email"
                  label="Email"
                  type="email"
                  value={editedUserData.email || ""}
                  onChange={(e) => setEditedUserData({ ...editedUserData, email: e.target.value })}
                  fullWidth
                  sx={{ mb: 2 }}
                />
                <TextField
                  name="salary"
                  label="Salario"
                  type="number"
                  value={editedUserData.salary || ""}
                  onChange={(e) => setEditedUserData({ ...editedUserData, salary: e.target.value })}
                  fullWidth
                  sx={{ mb: 2 }}
                />
                <Button type="submit" variant="contained" sx={{ mt: 2 }}>
                  Save
                </Button>
              </form>
            </FormControl>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
};
