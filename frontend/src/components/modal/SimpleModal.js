// SimpleModal.js

import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import {
    Modal,
    Fade,
    Button,
    Typography
} from '@material-ui/core';

import './SimpleModal.css';

const SimpleModal = (props) => (

    <Modal className="modal" open={props.open} onClose={props.onClose}
        closeAfterTransition>
        <div className="modal__paper">
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
                        onClick={props.onConfirm}>
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
        </div>
    </Modal>
);

export default SimpleModal;

SimpleModal.propTypes = {
    canCancel: PropTypes.bool, 
    canConfirm: PropTypes.bool,
    cancelText: PropTypes.string,
    confirmText: PropTypes.string,
    open: PropTypes.bool,
    onClose: PropTypes.func,
    title: PropTypes.string,
    children: PropTypes.object
};
