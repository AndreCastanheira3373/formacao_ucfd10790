import './App.css';
import {useState, useEffect} from 'react';
import {BsTrash, BsBookmarkCheck, BsBookmarkCheckFill} from "react-icons/bs";

const API = "http://localhost:5000";

function App() {
  const [title,setTitle] = useState("");
  const [page,setPage] = useState("");
  const [time,setTime] = useState("");
  const [tpc, setTpc] = useState([]);
  const [loading, setLoading] =useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const tpc = {
      id: Math.random(),
      title,
      page,
      time,
      done: false,
    }
    console.log(tpc);

    setTitle("");
    setPage("");
    setTime("");
  };


  return (
    <div className="App">
      <div className="tpc-header">
      <img src="/tpc.jpg" />
      </div>
      <div className='form-tpc'>
        <h2>REACT - André Castanheira v3</h2>
        <form onSubmit={handleSubmit}>
          <div className='form-control'>
            <label htmlFor="title"> Insira a disciplina da nova TPC:</label>
            <input 
            type="text" 
            name="tilte" 
            placeholder='Disciplina' 
            onChange={(e) => setTitle(e.target.value)}
            value={title || ""}
            required
            />
          </div>
          <div className='form-control'>
            <label htmlFor="page"> Insira as páginas:</label>
            <input 
            type="text" 
            name="page" 
            placeholder='Páginas' 
            onChange={(e) => setPage(e.target.value)}
            value={page || ""}
            required
            />
          </div>
          <div className='form-control'>
            <label htmlFor="time"> Duração de execução:</label>
            <input 
            type="text" 
            name="time" 
            placeholder='Tempo estimado (em minutos)' 
            onChange={(e) => setTime(e.target.value)}
            value={time || ""}
            required
            />
          </div>
          <input type="submit" value="Criar TPC" />
        </form>
      </div>
      <div className='list-tpc'>
        <h2>Lista de TPCs:</h2>
        {tpc.length === 0 && <p>Não há TPCs armazenados!</p>}
      </div>
 
    </div>
  );
}

export default App;
