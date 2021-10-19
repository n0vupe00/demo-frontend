import './App.css';
import {useState, useEffect} from 'react';
import axios from 'axios';

const URL = 'http://localhost/todo/';

function App() {

  const [tasks, setTasks] = useState([]);
  const [task, setTask] = useState('');

  useEffect(() => {
    axios.get(URL)
    .then((response) => {
      setTasks(response.data);
    }).catch(error => {
      alert(error.response ? error.response.data.error : error);
    })
  },[]);

  function save(e) {
    e.preventDefault();
    console.log(task);
    const json = JSON.stringify({description:task})
    axios.post(URL + 'save.php',json,{
      headers: {
        'Content-Type' : 'application/json'
      }
    })
    .then((response) => {
      console.log(response);
      setTasks(tasks => [...tasks,response.data]);
      setTask('');
    }).catch (error => {
      alert(error.response.data.error)
    });
  }

  return (
    <div className="container">
      <h3>ToDo List</h3>
      <form onSubmit={save}>
        <label> New task </label>
        <input value={task} onChange={e => setTask(e.target.value)} />
        <button>Save</button>
      </form>
      <ol>
        {tasks?.map(task => (
          <li key={task.id}>{task.description}</li>
        ))}   
      </ol>
    </div>
  );
}

export default App;
