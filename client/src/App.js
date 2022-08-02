import './App.css';
import PaginaInicial from './components/PaginaInicial'
import { Route } from 'react-router-dom'
import {RutaPrincipal} from './components/RutaPrincipal';
import CreatePokemon from './components/CreatePokemon';
import Details from './components/Details';


function App() {
  return (
      <div className="App">
        <Route exact path="/" component={PaginaInicial}></Route>
        <Route exact path="/create" component={CreatePokemon}></Route>
        <Route exact path="/home" component={RutaPrincipal}></Route>
        <Route exact path="/home/:id" component={Details}></Route>
      </div>
  );
}

export default App;
