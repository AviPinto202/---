// import React, { useState, useEffect } from "react";
// import { Calendar, dateFnsLocalizer } from "react-big-calendar";
// import format from "date-fns/format";
// import parse from "date-fns/parse";
// import startOfWeek from "date-fns/startOfWeek";
// import getDay from "date-fns/getDay";
// import "react-big-calendar/lib/css/react-big-calendar.css";
// import Footer from "../components/Footer";
// import FormModal from "../components/FormModal";
// import { getDatabase, ref, onValue } from "firebase/database";
// import { UserAuth } from '../context/AuthContext';
// import {
//     Link,
//     useParams
// } from "react-router-dom";

// const { user } = UserAuth();
// const db = getDatabase();

// const locales = {
//     "en-US": require("date-fns/locale/en-US")
// }

// const localizer = dateFnsLocalizer({
//     format,
//     parse,
//     startOfWeek,
//     getDay,
//     locales
// })

// export class ReadData extends React.Component {
//     constructor() {
//         super();
//         this.state = {
//             arrEvents: [{}]
//         }
//     }

//     componentDidMount() {
//         const dbRef = ref(db, `users/${user.uid}/plans`);

//         onValue(dbRef, (snapshot) => {
//             let events = [{}]
//             snapshot.forEach(childSnapshot => {
//                 //let keyName = childSnapshot.key;
//                 let data = childSnapshot.val();
//                 events.push({
//                     title: data.title, start: new Date(data.startDate), end: new Date(data.endDate)
//                 })
//                 this.setState({ arrEvents: events })
//             })
//         })
//     }


//     render() {
//         return (
//             <div className="myplans_container">
//                 <div className="aboveCalendar">
//                     <FormModal />
//                 </div>
//                 <Calendar
//                     localizer={localizer}
//                     events={this.state.arrEvents}
//                     startAccessor="start"
//                     endAccessor="end"
//                     style={{ height: 500, margin: "10px 50px 50px 50px", fontFamily: "Roboto" }}
//                 />
//                 <Footer />
//             </div>
//         )

//     }
// }