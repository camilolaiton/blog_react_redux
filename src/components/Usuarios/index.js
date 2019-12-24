import React, { Component } from 'react';
import { Badge} from 'react-bootstrap';

import { connect } from 'react-redux';
import * as usuariosActions from '../../actions/usuariosActions';

import Spinner from '../General/Spinner';
import Fatal from '../General/Fatal';
import Tabla from './tabla';

class Usuario extends Component {

  componentDidMount() {
    
    if(!this.props.usuarios.length) {
      this.props.traerTodos();
    }
  }

  renderTable = () => {
    
    if(this.props.cargando) {
      return (
        <Spinner />
      );
    }

    if( this.props.error ) {
      return(
        <Fatal error={ this.props.error }/>
      );
    }
    
    return (
      <Tabla />
    );
  }
  
  render() {
    console.log(this.props);

    return (
        <React.Fragment>
            <div className="App">
              <div className="center">
                <Badge pill variant="info">Usuarios</Badge>
                <br/><br/>
                { this.renderTable() }
              </div>
            </div>
        </React.Fragment>
    );
  }
}

const mapStateToProps = (reducers) => {
  return reducers.usuariosReducer;
};

export default connect(mapStateToProps, usuariosActions)(Usuario);
