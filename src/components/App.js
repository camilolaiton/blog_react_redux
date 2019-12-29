import React from 'react';
import { BrowserRouter, Switch, Route} from 'react-router-dom';
import Menu from './menu';
import Usuario from './Usuarios';
import Tareas from './Tareas';
import TareasGuardar from './Tareas/Guardar';
import Publicaciones from './Publicaciones';
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
  return(
    <BrowserRouter>
      <Menu />
      
      <Switch>
        <Route exact path='/' component={ Usuario } />
        <Route exact path='/tareas' component={ Tareas } />
        <Route exact path='/tareas/guardar' component={ TareasGuardar } />
        <Route exact path='/tareas/guardar/:usu_id/:tar_id' component={ TareasGuardar } />
        <Route exact path='/publicaciones/:key' component={ Publicaciones } />
      </Switch>
      
    </BrowserRouter>
  );
};

export default App;