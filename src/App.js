import './App.css';
import {useState, useEffect} from 'react';
import {BsTrash, BsBookmarkCheck, BsBookmarkCheckFill} from "react-icons/bs";

const API = "http://localhost:5000";
//const API = "https://raw.githubusercontent.com/AndreCastanheira3373/formacao_ucfd10790/main/data/db.json";

function App() {
  const [title,setTitle] = useState("");
  const [page,setPage] = useState("");
  const [time,setTime] = useState("");
  const [tpcs, setTpcs] = useState([]);
  const [loading, setLoading] =useState(false);

  useEffect(() => {
    const loadData = async() => {
      setLoading(true);
      const res = await fetch(API + "/tpcs",)
      //const res = await fetch(API)
      .then((res) => res.json())
      .then((data) => data)
      .catch((err) => console.log(err));

    setLoading(false);
    setTpcs(res);
    };
    loadData();
  },[]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const tpc = {
      id: Math.random(),
      title,
      page,
      time,
      done: false,
    };
    
    await fetch(API+"/tpcs", {
    //await fetch(API, {
      method: "POST",
      body: JSON.stringify(tpc),
      headers: {
        "Content-Type": "application/json",
      },
    });

    setTpcs((prevState) => [...prevState,tpc]);

    setTitle("");
    setPage("");
    setTime("");
  };

  const handleDelete = async (id) => {
    await fetch(API+"/tpcs/"+ id, {
    //await fetch(API+ id, {
      method: "DELETE",
    });
    setTpcs((prevState) => prevState.filter((tpc) => tpc.id !== id));
  };

  const handleEdit = async(tpc) => {
    tpc.done = !tpc.done;
    const data = await fetch(API+"/tpcs/"+ tpc.id, {
    //const data = await fetch(API+ tpc.id, {
      method: "PUT",
      body: JSON.stringify(tpc),
      headers: {
        "Content-Type": "application/json",
      }
    });
    setTpcs((prevState) => 
    prevState.map((t) => (t.id === data.id ? (t=data) : t))
    );
  }

  if(loading) {
    return <p>Carregando...</p>;
  }

  return (
    <>
    <div className="App">
      <div className="tpc-header">
      <img src="tpc.jpg" alt="TPC"/>
      </div>
      <div className='form-tpc'>
        <h2>REACT - André Castanheira v4</h2>
        <form onSubmit={handleSubmit}>
          <div className='form-control'>
            <label htmlFor="title">Disciplina:</label>
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
            <label htmlFor="page">Páginas:</label>
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
            <label htmlFor="time"> Duração:</label>
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
        {tpcs.length === 0 && <p>Não há TPCs armazenados!</p>}
        {tpcs.map((tpc) => (
          <div className="tpc" key={tpc.id}>
            <h3 className={tpc.done ?"tpc-done" : ""}>{tpc.title}</h3>
            <p>Páginas: {tpc.page} - Duração: {tpc.time} minutos</p>
            <div className="actions">
              <span onClick={() => handleEdit(tpc)}>
                {!tpc.done ? <BsBookmarkCheck/> : <BsBookmarkCheckFill/>}
              </span>
              <BsTrash onClick={() => handleDelete(tpc.id)} />
            </div>
          </div>
        ))}
      </div>
    </div>
    </>
  );
}

export default App;