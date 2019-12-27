import React from 'react';
import { Image } from 'react-bootstrap';
import Error404 from '../../images/404.gif'

const Fatal = (props) => {
    return (
        <div>
            <h2>{ props.mensaje }</h2>
            <Image src={Error404} alt="Imagen de error 404" fluid />
        </div>
    );
};

export default Fatal;