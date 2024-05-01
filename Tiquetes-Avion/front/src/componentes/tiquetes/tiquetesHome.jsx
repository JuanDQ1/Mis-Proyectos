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
      <h1>Vuelos Quijano</h1>
      <form onSubmit={handleSubmit} className="form-horizontal">
        <div className="form-inline">
          <div className="form-field">
            <input
              type="text"
              id="name"
              placeholder='Nombre'
              value={name}
              onChange={(event) => setName(event.target.value)}
            />
          </div>
          <div className="form-field">
            <input
              type="text"
              id="origin"
              placeholder='Origen'
              value={origin}
              onChange={(event) => setOrigin(event.target.value)}
            />
          </div>
          <div className="form-field">
            <input
              type="text"
              id="destination"
              placeholder='Destino'
              value={destination}
              onChange={(event) => setDestination(event.target.value)}
            />
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
        <div className='contenedor-boton'>
          <button type="submit" className="generate-ticket-button">
            Generar Boleto
          </button>
        </div>
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
