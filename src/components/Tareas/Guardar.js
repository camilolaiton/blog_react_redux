import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import Spinner from '../General/Spinner';
import Fatal from '../General/Fatal';

import * as tareasActions from '../../actions/tareasActions';

class Guardar extends Component {

    componentDidMount() {
        const {
            match: { params: { usu_id, tar_id } },
            tareas,
            cambioUsuarioId,
            cambioTitulo,
            limpiarForma,
        } = this.props;

        if (usu_id && tar_id) {
            const tarea = tareas[usu_id][tar_id];
            cambioUsuarioId(tarea.userId);
            cambioTitulo(tarea.title);
        } else {
            limpiarForma();
        }
    }

    cambioUsuarioId = (event) => {
        this.props.cambioUsuarioId(event.target.value);
    };

    cambioTitulo = (event) => {
        this.props.cambioTitulo(event.target.value);
    }

    guardar = (event) => {
        const { 
            usuario_id, 
            titulo, 
            agregar,
            match: { params: { usu_id, tar_id } },
            tareas,
            editar,
        } = this.props;

        const nueva_tarea = {
            userId: usuario_id,
            title: titulo,
            completed: false,
        };

        if(usu_id && tar_id) {
            const tarea = tareas[usu_id][tar_id];
            const tarea_editada = {
                ...nueva_tarea,
                completed: tarea.completed,
                id: tarea.id
            };
            editar(tarea_editada);
        } else {
            agregar(nueva_tarea);
        }
        
    }

    deshabilitar = () => {
        const { usuario_id, titulo, cargando } = this.props;

        if (cargando) {
            return true;
        }

        if (!usuario_id || !titulo) {
            return true;
        }

        return false;
    };

    mostrarAccion = () => {
        const { error, cargando } = this.props;

        if (error) {
            return <Fatal mensaje={error} />;
        }

        if (cargando) {
            return <Spinner />;
        }
    };

    render() {
        console.log(this.props)
        return (
            <div>

                {
                    (this.props.regresar) ? <Redirect to='/tareas'/> : ''
                }

                <h1>
                    Guardar tarea
                </h1>

                Usuario id:
                <input 
                    type='number' 
                    value={ this.props.usuario_id }
                    onChange={ this.cambioUsuarioId }
                />
                <br /><br />
                
                Titulo:
                <input 
                    value={ this.props.titulo }
                    onChange={ this.cambioTitulo }
                />
                <br /><br />
                <button 
                    onClick={ this.guardar }
                    disabled={ this.deshabilitar() }
                >
                    Guardar
                </button>

                { this.mostrarAccion() }

            </div>
        );
    }
}

const mapStateToProps = ({ tareasReducer }) => tareasReducer;

export default connect(mapStateToProps, tareasActions)(Guardar);