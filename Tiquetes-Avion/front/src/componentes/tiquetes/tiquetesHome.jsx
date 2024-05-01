import React, { useState } from 'react';
import '../styles/ticket.css';

const TiquetesHome = () => {
  const [name, setName] = useState('');
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');
  const [date, setDate] = useState('');
  const [generatedTicket, setGeneratedTicket] = useState(null);

  const handleSubmit = (event) => {
    event.preventDefault();
    const ticket = {
      name,
      origin,
      destination,
      date,
    };
    setGeneratedTicket(ticket);
  };

  return (
    <div className="ticket-form">
      <form onSubmit={handleSubmit}>
        <div className="form-field">
          <label htmlFor="name">Nombre:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
        </div>
        <div className="form-field">
          <label htmlFor="origin">Origen:</label>
          <input
            type="text"
            id="origin"
            value={origin}
            onChange={(event) => setOrigin(event.target.value)}
          />
        </div>
        <div className="form-field">
          <label htmlFor="destination">Destino:</label>
          <input
            type="text"
            id="destination"
            value={destination}
            onChange={(event) => setDestination(event.target.value)}
          />
        </div>
        <div className="form-field">
          <label htmlFor="date">Fecha:</label>
          <input
            type="date"
            id="date"
            value={date}
            onChange={(event) => setDate(event.target.value)}
          />
        </div>
        <button type="submit" className="generate-ticket-button">
          Generar Boleto
        </button>
      </form>
      
      {/* Contenedor para mostrar el boleto generado */}
      {generatedTicket && (
        <div className="generated-ticket-container">
          <h2>¡Boleto generado!</h2>
          <p>Nombre: {generatedTicket.name}</p>
          <p>Origen: {generatedTicket.origin}</p>
          <p>Destino: {generatedTicket.destination}</p>
          <p>Fecha: {generatedTicket.date}</p>
        </div>
      )}
    </div>
  );
};

export default TiquetesHome;
