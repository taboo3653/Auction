import React from 'react'
import Form from 'react-bootstrap/Form'
import PropTypes from "prop-types";
import classNames from "classnames";


import './index.scss'

const errorStyles = {
    right: 'right',
    bottom: 'bottom',
    none: 'none'
  }

const FormTextField = ({errors, errorStyle, ...props}) => {

     

    const baseErrorClass = 'form-text-field__error'
    const errorClasses = classNames( 
        baseErrorClass, 
        (errorStyle) ? 
            `${baseErrorClass}_${errorStyle}`:
            `${baseErrorClass}_none`);

    return (
        <div className = "form-text-field">
            <Form.Control 
                {...props}
            />
            <Form.Control.Feedback 
                type="invalid" 
                className = {errorClasses}
                >
                <span>{errors}</span>
            </Form.Control.Feedback>
        </div>
    )
}

FormTextField.propTypes = {
    errors: PropTypes.string,
    errorStyle: PropTypes.oneOf(Object.keys(errorStyles))
  };

  FormTextField.errorStyles = errorStyles;

export default FormTextField;


