const AnotherComponent = () => {

    const handleClick=() => {
        console.log("Clickou no botão!");
    };

    return (
        <div>
            <p>Segunda tarefa A</p>
            <button onClick={handleClick}>Evento de click</button>
            <hr />
            <button onClick={() => console.log("teste")}>Evento no Elemento</button>
        </div>
    );
};

export default AnotherComponent;
