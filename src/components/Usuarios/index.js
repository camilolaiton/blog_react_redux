import React, { Component } from 'react';
import { Jumbotron, Badge} from 'react-bootstrap';

import { connect } from 'react-redux';
import * as usuariosActions from '../../actions/usuariosActions';

import Spinner from '../General/Spinner';
import Fatal from '../General/Fatal';
import Tabla from './tabla';

class Usuario extends Component {

  componentDidMount() {
  
    this.props.traerTodos();
  
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
    console.log(this.props.cargando);
    console.log(this.props.error);

    return (
        <React.Fragment>
            <Jumbotron>
                <h1>Hello!</h1>
                <p>
                    This is a simple hero unit, a simple jumbotron-style component for calling
                    extra attention to featured content or information.
                </p>
            </Jumbotron>
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
