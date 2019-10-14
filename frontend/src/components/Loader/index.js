import React from 'react'
import Spinner from 'react-bootstrap/Spinner'

import './index.scss'

const Loader = () => (
    <div className ="loader">
        <Spinner 
            animation="grow" 
            variant="primary" 
        />
    </div>

)


export default Loader;