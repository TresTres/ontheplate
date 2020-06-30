// SimpleModal.js

import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import {
    Modal,
    Fade,
    Button
} from '@material-ui/core';


const SimpleModal = (props) => (

    <Modal className="modal" open={props.open} onClose={props.onClose}
        closeAfterTransition>
        <Fragment>
            <header className="modal__content">{props.title}</header>
            <section className="modal__content">
                <Fade in={props.open}>
                    {props.children}
                </Fade>
            </section>
            <section className="modal__actions">
                {props.canConfirm && 
                    <Button onClick={props.onConfirm}
                    >
                        {props.confirmText}
                    </Button>
                }
                {props.canCancel && 
                    <Button onClick={props.onClose}
                    >
                        {props.cancelText}
                    </Button>
                }
            </section>
        </Fragment>
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
