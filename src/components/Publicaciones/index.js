import React, { Component } from 'react';
import { Card } from 'react-bootstrap';
import { connect } from 'react-redux';
import Spinner from '../General/Spinner';
import Fatal from '../General/Fatal';
import Comentarios from './Comentarios';

import * as usuariosActions from '../../actions/usuariosActions';
import * as publicacionesActions from '../../actions/publicacionesActions';

const { traerTodos: usuariosTraerTodos } = usuariosActions;
const { 
        traerPorUsuario: publicacionesTraerPorUsuario, abrirCerrar, traerComentarios,
    } = publicacionesActions;

class Publicaciones extends Component {

    async componentDidMount() {

        const {                     /*Reestructuración de variables del props*/
            usuariosTraerTodos,
            publicacionesTraerPorUsuario,
            match: { params: { key } }
        } = this.props;

        if(!this.props.usuariosReducer.usuarios.length) {
            await usuariosTraerTodos();
        }

        if(this.props.usuariosReducer.error) {
            return;
        }

        if(!('publicaciones_key' in this.props.usuariosReducer.usuarios[key]))  {
            publicacionesTraerPorUsuario(key);
        }
    }

    ponerUsuario = () => {
        const { 
            usuariosReducer,
            match: { params: { key } }
        } = this.props;

        if(usuariosReducer.error) {
            return <Fatal mensaje={ usuariosReducer.error } />
        }

        if(usuariosReducer.cargando || !usuariosReducer.usuarios.length) {
            return <Spinner />
        }
        
        const nombre = usuariosReducer.usuarios[key].name;

        return <h1>Publicaciones de { nombre }</h1>
    };

    ponerPublicaciones = () => {
        const {
            usuariosReducer,
            usuariosReducer: { usuarios },
            publicacionesReducer,
            publicacionesReducer: { publicaciones },
            match: { params: {key} },
        } = this.props;

        if (!usuarios.length) return;
        if (usuariosReducer.error) return;

        if (publicacionesReducer.cargando) {
            return <Spinner />;
        }

        if (publicacionesReducer.error) {
            return <Fatal mensaje={ publicacionesReducer.error } />;
        }
        
        if (!publicaciones.length) return;

        if (!('publicaciones_key' in usuarios[key])) return;//Esta en proceso de buscar la key

        const {
            publicaciones_key 
        } = usuarios[key];

        console.log("Publicaciones: ", publicaciones_key);
        

        console.log("PUBLICACIONES: ", publicaciones[publicaciones_key]);

        return this.mostrarInfo(
            publicaciones[publicaciones_key],
            publicaciones_key
        );
    }

    mostrarInfo = (publicaciones, pub_key) => (

        publicaciones.map((publicacion, com_key)  => (
            
            <Card key={ publicacion.id } style={{ width: '18rem' }} onClick={ ()=>this.mostrarComentarios(pub_key, com_key, publicacion.comentarios)}>
                <Card.Body>
                    <Card.Title>
                        { publicacion.title }
                    </Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">Publicación</Card.Subtitle>
                    <Card.Text>
                        { publicacion.body }
                        <br/>
                        {
                            (publicacion.abierto) ? <Comentarios comentarios={publicacion.comentarios}/>:''
                        }
                    </Card.Text>
                    {/* <Card.Link href="#">Card Link</Card.Link>
                    <Card.Link href="#">Another Link</Card.Link> */}
                </Card.Body>
            </Card>
            
        ))
    );

    mostrarComentarios = (pub_key, com_key, comentarios) => {
        console.log("Comentarios: ", comentarios);
        
        this.props.abrirCerrar(pub_key, com_key);

        if (!comentarios.length) {
            this.props.traerComentarios(pub_key, com_key);
        }
    };

    render() {
        console.log(this.props);
        return (
            <div className="center">
                { this.ponerUsuario() }
                { this.ponerPublicaciones() }
            </div>
        );
    }
}

const mapStateToProps = ({ usuariosReducer, publicacionesReducer }) => {
    return {
        usuariosReducer,
        publicacionesReducer,
    };
}

const mapDispatchToProps = {
    usuariosTraerTodos,
    publicacionesTraerPorUsuario,
    abrirCerrar,
    traerComentarios
};

export default connect(mapStateToProps, mapDispatchToProps)(Publicaciones);