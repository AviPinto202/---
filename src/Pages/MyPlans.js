import { useState, useEffect } from "react";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import format from "date-fns/format";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import getDay from "date-fns/getDay";
import "react-big-calendar/lib/css/react-big-calendar.css";
import Footer from "../components/Footer";
import FormModal from "../components/FormModal";
import { getDatabase, ref, onValue } from "firebase/database";
import { UserAuth } from '../context/AuthContext';
import {
    Link,
    useParams
} from "react-router-dom";


const MyPlans = () => {
    const db = getDatabase();
    const { user } = UserAuth();
    const { id } = useParams();
    let events = [];


    const handleEvents = () => {
        const dbRef = ref(db, `users/${id}/plans`);
        let data;
        onValue(dbRef, (snapshot) => {
            snapshot.forEach(childSnapshot => {
                //let keyName = childSnapshot.key;
                data = childSnapshot.val();
                events.push({
                    title: data.title, start: new Date(data.startDate), end: new Date(data.endDate)
                })
                console.log("2", events)
            })
        })
    }


    useEffect(() => {
        if (user != null) {
            handleEvents()
        }
    }, [user, events]);

    const locales = {
        "en-GB": require("date-fns/locale/en-GB")
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
            {!events ? <p>Loading...</p> :
                <Calendar
                    localizer={localizer}
                    events={events}
                    startAccessor="start"
                    endAccessor="end"
                    defaultView='month'
                    selectable
                    style={{ height: 500, margin: "10px 50px 50px 50px", fontFamily: "Roboto" }}
                />}
            <Footer />
        </div>
    );
}

export default MyPlans;