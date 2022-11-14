import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import CloseIcon from '@mui/icons-material/Close';
import { useState } from "react";
import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { getDatabase, ref, set } from "firebase/database";
import {
    useParams
} from "react-router-dom";
import GB from 'date-fns/locale/en-GB';
import Alert from './Alert';
registerLocale("en-GB", GB)


const FormModal = () => {
    const [open, setOpen] = useState(false);
    const [title, setTitle] = useState("");
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [openAlert, setOpenAlert] = useState(true);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const db = getDatabase();
    let { id } = useParams();

    let eventId = Math.random().toString(16).slice(8);

    const handleEvent = (e) => {
        e.preventDefault();
        set(ref(db, `users/${id}/plans/${title}`), {
            id: eventId,
            title: title,
            startDate: startDate.toString(),
            endDate: endDate.toString()
        }).then(() => {
            <Alert open={openAlert} />
        }, handleClose())
            .catch((e) => { console.log(e) })
    }


    return (
        <div className="Modal_container">
            <Button variant="contained" id="addEventBtn" onClick={handleOpen}>Add New Event</Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description">
                <Box id="modal_box">
                    <div className='modal_header'>
                        <CloseIcon id="closeIcon" onClick={handleClose}></CloseIcon>
                        <p>Add New Plan To Your Day</p>
                    </div>
                    <div className='modal_content'>
                        <label htmlFor="addEventInput">What Is Your Plan?</label>
                        <input id="addEventInput" type="text" placeholder='What is your plan?'
                            onChange={(e) => setTitle(e.target.value)}></input>
                        <label htmlFor="addEventInput">Start Date And Time</label>
                        <DatePicker showTimeSelect locale="en-GB"
                            dateFormat="Pp" id="addEventInput" placeholderText='Start Date'
                            selected={startDate} onChange={startDate => setStartDate(startDate)} />
                        <label htmlFor="addEventInputs">End Date And Time</label>
                        <DatePicker showTimeSelect locale="en-GB"
                            dateFormat="Pp" id="addEventInput" placeholderText='End Date'
                            selected={endDate} onChange={endDate => setEndDate(endDate)} />
                        <Button variant="contained" id="addBtnInModal" onClick={handleEvent} >Add Plan</Button>
                    </div>
                </Box>
            </Modal>
        </div >
    );
}
export default FormModal;