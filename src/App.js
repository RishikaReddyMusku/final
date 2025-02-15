import { useEffect, useState } from "react";
import axios from "axios";

function App() {
    const [tasks, setTasks] = useState([]);
    const [text, setText] = useState("");
    const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000/tasks";


    useEffect(() => {
        if (API_URL) {
            axios.get(API_URL)
                .then(res => setTasks(res.data))
                .catch(err => console.error("Error fetching tasks:", err));
        }
    }, [API_URL]); // Add API_URL as a dependency
    

    const addTask = () => {
        if (!text.trim()) return; // Prevent empty tasks
        axios.post(API_URL, { text, completed: false })
            .then(res => setTasks([...tasks, res.data]))
            .catch(err => console.error("Error adding task:", err));
        setText("");
    };
    
    const deleteTask = (id) => {
        axios.delete(`${API_URL}/${id}`)
            .then(() => setTasks(tasks.filter(task => task._id !== id)))
            .catch(err => console.error("Error deleting task:", err));
    };
    

    return (
        <div>
            <h1>To-Do List</h1>
            <input value={text} onChange={e => setText(e.target.value)} />
            <button onClick={addTask}>Add</button>
            <ul>
                {tasks.map(task => (
                    <li key={task._id}>
                        {task.text} <button onClick={() => deleteTask(task._id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}
export default App;
