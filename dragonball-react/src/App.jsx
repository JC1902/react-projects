import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Inicio from './components/Inicio';
import Personajes from './components/Personajes';
import './App.css'
import Transformaciones from './components/Transformaciones';
import Detail from './components/Details';

function App() {

  

  return (
    <>
      <BrowserRouter>
        <Header />
        <div className='bg-gradient-to-br from-orange-500 to-yellow-500' >
          <Routes>
            <Route path='/' element={ <Inicio /> } ></Route>
            <Route path='/personajes' element={ <Personajes tipo="characters" /> } ></Route>
            <Route path='/transformaciones' element={ <Transformaciones /> } ></Route>
            <Route path='/planetas' element={ <Personajes tipo="planets" /> } ></Route>
            <Route path='/personajes/:id' element={ <Detail /> } ></Route>
          </Routes>
        </div>
      </BrowserRouter>
    </>
  )
}

export default App
