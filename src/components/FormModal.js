import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";


const FormModal = () => {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const [newEvent, setNewEvent] = useState({ title: "", start: "", end: "" });

    return (
        <div className="Modal_container">
            <Button variant="contained" id="addEventBtn" onClick={handleOpen}>Add New Event</Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description">
                <Box id="modal_box">
                    <input id="addEventInput" type="text" placeholder='What is your plan?' onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}></input>
                    <DatePicker placeholderText='Start Date'
                        selected={newEvent.start} onChange={(start) => setNewEvent({ ...newEvent, start })} />
                    <DatePicker placeholderText='End Date'
                        selected={newEvent.start} onChange={(end) => setNewEvent({ ...newEvent, end })} />
                    <Button>Add Plan</Button>
                </Box>
            </Modal>
        </div>
    );
}

export default FormModal;