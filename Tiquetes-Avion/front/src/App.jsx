import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import TiquetesHome from './componentes/tiquetes/tiquetesHome';

function App() {
  const [user, setUser] = useState(null);
  return (  
    <BrowserRouter>
      
      <Routes>
        
        <Route index element={<TiquetesHome user={user}/>}></Route>
        
        
        <Route path='/tiquetesHome' element={<TiquetesHome user={user}/>}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

