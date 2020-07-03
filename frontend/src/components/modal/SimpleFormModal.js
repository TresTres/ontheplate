// SimpleFormModal.js

import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import {
    Modal,
    Fade,
    Button,
    Typography
} from '@material-ui/core';

import './SimpleFormModal.css';

const SimpleFormModal = (props) => (

    <Modal className="modal" open={props.open} onClose={props.onClose}
        closeAfterTransition>
        <form className="modal__form" onSubmit={props.onConfirm}>
            <Typography variant="h3" align="center"
						className="modal__content" gutterBottom>
						{props.title}
			</Typography>
            <div className="modal__content">
                <Fade in={props.open}>
                    {props.children}
                </Fade>
            </div>
            <div className="modal__actions">
                {props.canConfirm && 
                    <Button variant="contained" 
                        type="submit">
                        {props.confirmText}
                    </Button>
                }
                {props.canCancel && 
                    <Button variant="contained" 
                        onClick={props.onClose}>
                        {props.cancelText}
                    </Button>
                }
            </div>
        </form>
    </Modal>
);

export default SimpleFormModal;

SimpleFormModal.propTypes = {
    canCancel: PropTypes.bool, 
    canConfirm: PropTypes.bool,
    cancelText: PropTypes.string,
    confirmText: PropTypes.string,
    open: PropTypes.bool,
    onClose: PropTypes.func,
    title: PropTypes.string,
    children: PropTypes.object
};
