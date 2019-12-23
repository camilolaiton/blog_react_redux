import React from 'react';
import { Table } from 'react-bootstrap';
import { connect } from 'react-redux';

const tabla = (props) => {

    const renderRows = () => {
        return props.usuarios.map( (user) => {
          return (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.website}</td>
            </tr>
          );
        });
      }

    return (
        <React.Fragment>
            <Table striped bordered hover size="sm">
                <thead>
                    <tr>
                    <th>
                        Nombre
                    </th>
                    <th>
                        Email
                    </th>
                    <th>
                        Domain
                    </th>
                    </tr>
                </thead>

                <tbody>
                    { renderRows() }
                </tbody>
            </Table>
        </React.Fragment>
    );
};

const mapStateToProps = (reducers) => {
    return reducers.usuariosReducer;
}

export default connect(mapStateToProps)(tabla);