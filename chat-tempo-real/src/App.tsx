import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import TelaInicial from './pages/TelaInicial';
import TelaCriacaoUsuario from './pages/TelaCriacaoUsuario';
import TelaLogin from './pages/TelaLogin';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element = {<TelaInicial/>}/>
        <Route path='/criarConta' element = {<TelaCriacaoUsuario/>}/>
        <Route path='/login' element = {<TelaLogin/>}/>
        <Route/>
      </Routes>
    </Router>
  )
}

export default App;
