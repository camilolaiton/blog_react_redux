import React from 'react';
import { BrowserRouter, Switch, Route} from 'react-router-dom';
import Menu from './menu';
import Usuario from './Usuarios';
import Publicaciones from './Publicaciones';
import 'bootstrap/dist/css/bootstrap.min.css';

const Tareas = () => {
  return (
    <div>
      Tareas
    </div>
  );
};


const App = () => {
  return(
    <BrowserRouter>
      <Menu />
      
      <Switch>
        <Route exact path='/' component={ Usuario } />
        <Route exact path='/tareas' component={ Tareas } />
        <Route exact path='/publicaciones/:key' component={ Publicaciones } />
      </Switch>
      
    </BrowserRouter>
  );
};

export default App;