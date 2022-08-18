import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import format from "date-fns/format";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import getDay from "date-fns/getDay";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { useState } from "react";
import Footer from "../components/Footer";
import FormModal from "../components/FormModal"

const events = [{
    title: "Big Meeting",
    allDay: true,
    start: new Date(Date.now()),
    end: new Date(Date.now()),

},
{
    title: "Vacation in Greece",
    allDay: true,
    start: new Date(2022, 7, 25),
    end: new Date(2022, 7, 28),
}
]

const MyPlans = () => {
    const [newEvent, setNewEvent] = useState({ title: "", start: "", end: "" });
    const [allEvents, setAllEvents] = useState(events);

    const locales = {
        "en-US": require("date-fns/locale/en-US")
    }

    const localizer = dateFnsLocalizer({
        format,
        parse,
        startOfWeek,
        getDay,
        locales
    })

    return (
        <div className="myplans_container">
            <div className="aboveCalendar">
                <FormModal />
            </div>
            <Calendar
                localizer={localizer}
                events={allEvents}
                startAccessor="start"
                endAccessor="end"
                style={{ height: 500, margin: "10px 50px 50px 50px", fontFamily: "Roboto" }}
            />
            <Footer />
        </div>
    );
}

export default MyPlans;