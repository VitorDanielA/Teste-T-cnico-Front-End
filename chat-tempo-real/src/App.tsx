import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import TelaInicial from './pages/TelaInicial';
import TelaCriacaoUsuario from './pages/TelaCriacaoUsuario';
import TelaLogin from './pages/TelaLogin';
import TelaChat from './pages/TelaChat';
import TrocarTelas from './pages/TrocarTelas';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element = {<TelaInicial/>}/>
        <Route path='/criarConta' element = {<TelaCriacaoUsuario/>}/>
        <Route path='/login' element = {<TelaLogin/>}/>
        <Route path='/telaChat' element = {<TelaChat user={''}/>}/>
        <Route path='/trocarTelas' element = {<TrocarTelas/>}/>
      </Routes>
    </Router>
  )
}

export default App;
