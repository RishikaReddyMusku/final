import { useEffect, useState } from "react";
import axios from "axios";

function App() {
    const [tasks, setTasks] = useState([]);
    const [text, setText] = useState("");

    useEffect(() => {
        axios.get("http://localhost:5000/tasks").then(res => setTasks(res.data));
    }, []);

    const addTask = () => {
        axios.post("http://localhost:5000/tasks", { text, completed: false })
            .then(res => setTasks([...tasks, res.data]));
        setText("");
    };

    const deleteTask = (id) => {
        axios.delete(`http://localhost:5000/tasks/${id}`)
            .then(() => setTasks(tasks.filter(task => task._id !== id)));
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
