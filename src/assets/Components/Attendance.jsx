import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons'; // Import the necessary icon
import Form from "./Form";

const Attendance = ({ addAttendance}) => {
    const [search, setSearch] = useState('');
    const [attendanceDetails, setAttendanceDetails] = useState([]);
    const [filteredAttendance, setFilteredAttendance] = useState([]);

    // Load attendance details from local storage on component mount
    useEffect(() => {
        const storedAttendance = JSON.parse(localStorage.getItem('attendance'));
        if (storedAttendance) {
            setAttendanceDetails(storedAttendance);
            setFilteredAttendance(storedAttendance); // Initialize filtered attendance with all attendance details
        }
    }, []);

    // Function to handle search
    useEffect(() => {
        if (search.trim() === '') {
            setFilteredAttendance(attendanceDetails); // If search query is empty, display all attendanceDetails
        } else {
            const filtered = attendanceDetails.filter(item =>
                item.name.toLowerCase().includes(search.toLowerCase())
            );
            setFilteredAttendance(filtered);
        }
    }, [search, attendanceDetails]);

    const handleDelete=(id)=>{
        const updatedAttendance = attendanceDetails.filter((item)=>item.id !== id);
        setAttendanceDetails(updatedAttendance);
        localStorage.setItem('attendance', JSON.stringify(updatedAttendance))
    }
    return (
        <>
            <div className="attendance-app">
                <header>ATTENDANCE LOGGING APP</header>
                    <div className="container">
                        <Form addAttendance={addAttendance} setAttendanceDetails={setAttendanceDetails} />
                        <div className="attendance-list">
                            <h1>Attendance List</h1>
                            <div className="search">
                                <input name="search" value={search} placeholder="search name..." onChange={(e) => setSearch(e.target.value)} />
                            </div>
                            <ol>
                                {filteredAttendance.length > 0 ? filteredAttendance.map((attendanceItem, index) => (
                                    <div className="attendance" key={index}>
                                        <div className="list list-name">NAME : {attendanceItem.name}</div>
                                        <div className="list list-class">CLASS : {attendanceItem.classValue}</div>
                                        <div className="list list-date">Date:  {attendanceItem.year} {' - '}{attendanceItem.month} {' - '} {attendanceItem.day}</div>
                                        <div className="list list-time">Time:  {attendanceItem.hours} {':'} {attendanceItem.minutes} {':'} {attendanceItem.seconds}</div>
                                        <button className="delete" onClick={()=>{handleDelete(attendanceItem.id)}}><FontAwesomeIcon icon={faTrashAlt} /></button>                    
                                    </div>
                                )) : (
                                    <div>No matching attendance found.</div>
                                )}
                            </ol>
                        </div>
                    </div>
            </div>
            
        </>
        
    );
};

export default Attendance;
