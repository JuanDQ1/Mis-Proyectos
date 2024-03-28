import { useState } from 'react'
import './App.css'
import Form from './componentes/login/Form';
import {BrowserRouter, Routes, Route} from 'react-router-dom'; 
import MeseroHome from './componentes/mesero/meseroHome';
import AdminHome from './componentes/admin/adminHome';
import Menu from './componentes/admin/menu';
import UsuariosHome from './componentes/admin/usuariosHome';
import CocinaHome from './componentes/cocina/cocinaHome';
import VentasHome from './componentes/admin/ventasHome';


function App() {
  const [user, setUser] = useState(null);
  return (  
    <BrowserRouter>
      {/* <Navigation/> */}
      <Routes>
        <Route index element={<Form callback={setUser}/>}></Route>
        
        <Route path='/Menu' element={<Menu/>}></Route>
        <Route path='/meseroHome' element={<MeseroHome user={user}/>}></Route>
        <Route path='/adminHome' element={<AdminHome user={user}/>}></Route>
        <Route path='/usuariosHome' element={<UsuariosHome user={user}/>}></Route>
        <Route path='/cocinaHome' element={<CocinaHome user={user}/>}></Route>
        <Route path='/ventasHome' element={<VentasHome user={user}/>}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
