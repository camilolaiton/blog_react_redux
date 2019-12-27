import React from 'react';
import { connect } from 'react-redux';
import Spinner from '../General/Spinner';
import Fatal from '../General/Fatal';

const comentarios = (props) => {

    console.log(props.comentarios);
    
    if (props.com_error) {
        return <Fatal mensaje={ props.error }/>;
    }

    if (props.com_cargando) {
        return <Spinner />;
    }

    const ponerComentarios = () => (
        props.comentarios.map((comentario) => (
            <li>
                <b>
                    <u>
                        { comentario.email }
                    </u>
                </b>
                <br />
                { comentario.body }
            </li>
        ))
    );

    return (
        <ul>
            { ponerComentarios() }
        </ul>
    );
};

const mapStateToProps = ({ publicacionesReducer }) => publicacionesReducer;

export default connect(mapStateToProps)(comentarios);