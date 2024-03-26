import { useState } from "react";
import {v4 as uuid} from 'uuid'; 

const Form = ({ setAttendanceDetails }) => {
    const [name, setName] = useState('');
    const [classValue, setClassValue] = useState('');

    const addAttendance = (e) => {
        e.preventDefault(); // Prevents the default form submission behavior
        
        if (name.trim() === '' || classValue.trim() === '') {
            alert('Please enter both name and class.');
            return;
        }

        const now = new Date();
        const id = uuid();
        const attendanceDetail = {
            name: name,
            classValue: classValue,
            year: now.getFullYear(), // Get the full year (4 digits)
            month: now.getMonth() + 1, // Get the month (0-11), so add 1 to match human conventions
            day: now.getDate(), // Get the day of the month (1-31)
            hours: now.getHours(), // Get the hours (0-23)
            minutes: now.getMinutes(), // Get the minutes (0-59)
            seconds: now.getSeconds(), // Get the seconds (0-59)
            id: id,
        };
        // Retrieve existing attendance details from local storage
        const storedAttendance = JSON.parse(localStorage.getItem('attendance')) || [];
        
        // Update attendance details with new entry
        const updatedAttendance = [...storedAttendance, attendanceDetail];
        localStorage.setItem('attendance', JSON.stringify(updatedAttendance));
        
        // Update state in parent component to trigger re-render
        setAttendanceDetails(updatedAttendance);

        // Clear input fields after adding attendance
        setName('');
        setClassValue('');
    };

    return (
        <form onSubmit={addAttendance}>
            <div className="form-group">
                <label htmlFor="name">Name</label><br/>
                <input name="name" value={name} type="text" placeholder="full name" onChange={(e) => setName(e.target.value)} required />
            </div>

            <div className="form-group">
                <label htmlFor="class">Class</label><br/>
                <input name="class" value={classValue} type="text" placeholder="class" onChange={(e) => setClassValue(e.target.value)} required />
            </div>

            <button type="submit">Enter</button>
        </form>
    );
};

export default Form;
