import { useEffect, useState } from "react";

import { WorkerCard } from "./components/WorkerCard";


import { CreateWorkers, getWorkers } from "../services/WorkerServices";
import { LoadingComponent } from "./components/Loading";

import {
  Modal,
  Backdrop,
  Fade,
  Typography,
  Button,
  Box,
  TextField,
  FormControl
} from "@mui/material";



export const WorkersView = ({ setView }) => {
  const [data, setData] = useState([]);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    getWorkers().then((res) => {
      setData(res);
    });
  }, []);

  console.log(data);

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
    const response = await CreateWorkers(e);
    handleClose();
  }




  return (
    <section className="workers-view">
      <div>
        <h1>List Workers</h1>
        <Button color="success" variant="contained" onClick={handleOpen}>
          Register Worker
        </Button>
      </div>
      <br />
      <div className="workers-list">
        {data.length === 0 ? (
          <LoadingComponent />
        ) : (
          data.map((worker, index) => (
            <WorkerCard key={index} worker={worker} setView={setView} />
          ))
        )}
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
            <Box sx={style} >
              <Typography id="transition-modal-title" variant="h6" component="h2">
                Register User
              </Typography>
              <FormControl>
                <form method="POST" onSubmit={clicksave} >
                  <TextField name="name" label="Nombre" fullWidth sx={{ mb: 2 }} />
                  <TextField name="lastname" label="Apellido" fullWidth sx={{ mb: 2 }} />
                  <TextField name="username" label="Nombre de usuario" fullWidth sx={{ mb: 2 }} />
                  <TextField name="password" label="Contraseña" type="password" fullWidth sx={{ mb: 2 }} />
                  <TextField name="date" type="date" fullWidth sx={{ mb: 2 }} />
                  <TextField name="email" label="Email" type="email" fullWidth sx={{ mb: 2 }} />
                  <TextField name="salary" label="Salario" type="number" fullWidth sx={{ mb: 2 }} />
                  <Button type="submit" variant="contained" sx={{ mt: 2 }}>
                    Save
                  </Button>
                </form>
              </FormControl>
            </Box>
          </Fade>
        </Modal>
      </div>

    </section>
  );
};
