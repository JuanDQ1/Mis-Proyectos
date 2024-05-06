import React, { useState, useEffect } from "react";
import "../styles/ticket.css";

const TiquetesHome = () => {
  const [name, setName] = useState("");
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");
  const [date, setDate] = useState("");
  const [generatedTickets, setGeneratedTickets] = useState([]);
  const [originSuggestions, setOriginSuggestions] = useState([]);
  const [destinationSuggestions, setDestinationSuggestions] = useState([]);

  useEffect(() => {
    if (origin) {
      fetch(`https://backend-nine-iota-96.vercel.app/tiquetes/paises?query=${origin}`)
        .then((response) => response.json())
        .then((data) => setOriginSuggestions(data))
        .catch((error) =>
          console.error("Error fetching origin suggestions:", error)
        );
    }
  }, [origin]);

  useEffect(() => {
    if (destination) {
      fetch(`https://backend-nine-iota-96.vercel.app/tiquetes/paises?query=${destination}`)
        .then((response) => response.json())
        .then((data) => setDestinationSuggestions(data))
        .catch((error) =>
          console.error("Error fetching destination suggestions:", error)
        );
    }
  }, [destination]);

  // Función para manejar la selección de una sugerencia de origen
  const handleOriginSelection = (selectedName) => {
    setOrigin(selectedName);
    // Limpiar las sugerencias de origen después de seleccionar una
    setOriginSuggestions([]);
  };

  // Función para manejar la selección de una sugerencia de destino
  const handleDestinationSelection = (selectedName) => {
    setDestination(selectedName);
    // Limpiar las sugerencias de destino después de seleccionar una
    setDestinationSuggestions([]);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Verificar que el origen y el destino sean diferentes
    if (origin === destination) {
      alert("El origen y el destino deben ser diferentes");
      return;
    }

    // Construir el objeto del tiquete
    const ticket = {
      name,
      origin,
      destination,
      date,
    };
    

    // Realizar la solicitud POST al endpoint para guardar el tiquete
    fetch("https://backend-nine-iota-96.vercel.app/tiquetes/tiquete", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(ticket),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error al guardar el tiquete");
        }
        return response.json();
      })
      .then((data) => {
        alert("¡Boleto generado!");
        // Actualizar el estado para mostrar el boleto generado
        setGeneratedTickets([...generatedTickets, data]);
        // Limpiar los campos del formulario
        setName("");
        setOrigin("");
        setDestination("");
        setDate("");
        
      })
      .catch((error) => {
        console.error("Error al guardar el tiquete:", error);
        // Manejar el error, mostrar un mensaje al usuario, etc.
      });
  };

  return (
    <div className="ticket-form">
      <h1>Vuelos Quijano</h1>
      <form onSubmit={handleSubmit} className="form-horizontal">
        <div className="form-inline">
          <div className="form-field">
            <input
              type="text"
              id="name"
              placeholder="Nombre"
              value={name}
              onChange={(event) => setName(event.target.value)}
            />
          </div>
          <div className="form-field">
            <input
              type="text"
              id="origin"
              placeholder="Origen"
              value={origin}
              onChange={(event) => setOrigin(event.target.value)}
            />
            <ul>
              {originSuggestions.map((suggestion) => (
                <li
                  key={suggestion._id}
                  onClick={() => handleOriginSelection(suggestion.name)} // Manejar la selección de la sugerencia
                >
                  {suggestion.name}
                </li>
              ))}
            </ul>
          </div>
          <div className="form-field">
            <input
              type="text"
              id="destination"
              placeholder="Destino"
              value={destination}
              onChange={(event) => setDestination(event.target.value)}
            />
            <ul>
              {destinationSuggestions.map((suggestion) => (
                <li
                  key={suggestion._id}
                  onClick={() => handleDestinationSelection(suggestion.name)} // Manejar la selección de la sugerencia
                >
                  {suggestion.name}
                </li>
              ))}
            </ul>
          </div>
          <div className="form-field">
            <input
              type="date"
              id="date"
              value={date}
              onChange={(event) => setDate(event.target.value)}
            />
          </div>
        </div>
        <div className="contenedor-boton">
          <button type="submit" className="generate-ticket-button">
            Generar Boleto
          </button>
        </div>
      </form>

      {generatedTickets.map((ticket, index) => (
        <div key={index} className="generated-ticket-container">
          <h2>¡Boleto generado!</h2>
          <p>Nombre: {ticket.name}</p>
          <p>Origen: {ticket.origin}</p>
          <p>Destino: {ticket.destination}</p>
          <p>Fecha: {ticket.date}</p>
        </div>
      ))}
    </div>
  );
};

export default TiquetesHome;
