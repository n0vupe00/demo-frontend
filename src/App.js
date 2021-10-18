import {useState,useEffect} from 'react';
import './App.css';
import axios from 'axios';

const URL = 'http://localhost/todo/index.php';

function App() {

  const [tasks,setTasks] = useState([]);

  useEffect(() => {
    axios.get(URL)
    .then((response)=> {
      console.log(response.data);
      setTasks(response.data);
    }).catch(error => {
      alert(error.response ? error.response.data.error : error);
    })
  }, [])

  return (
    <ol>
      {tasks?.map(task => (
        <li key={task.id}>{task.description}</li>
      ))}
    </ol>
  );
}

export default App;
