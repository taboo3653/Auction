import React from 'react'
import Form from 'react-bootstrap/Form'
import PropTypes from "prop-types";

import './index.scss'

const FormTextField = ({errors, ...props}) => {
    return (
        <div className = "form-text-field">
            <Form.Control 
                {...props}
            />
            <Form.Control.Feedback type="invalid" className = "form-text-field__error">
                <span>{errors}</span>
            </Form.Control.Feedback>
        </div>
    )
}

FormTextField.propTypes = {
    errors: PropTypes.string  
  };

export default FormTextField;


