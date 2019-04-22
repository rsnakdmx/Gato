import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

class WarningModal extends Component
{
    constructor(props, context)
    {
        super(props, context);
        this.handleShow = this.handleShow.bind(this);
        this.handleClose = this.handleClose.bind(this);

        this.state =
        {
            show: true
        };
    }

    handleClose()
    {
        this.setState({ show: false });
    }

    handleShow()
    {
        this.setState({ show: true });
    }

    render()
    {
        return (
            <Modal show={ this.state.show } onHide={ this.handleClose }>
                <Modal.Header>
                    <Modal.Title>Juego terminado</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    { this.props.msg }
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="dark" onClick={ this.handleClose }>Cerrar</Button>
                </Modal.Footer>
            </Modal>
        );
    }
}

export default WarningModal;