import React  from 'react'
import Image from 'react-bootstrap/Image'
import Spinner from 'react-bootstrap/Spinner'
import getSizedImageUrl from '../../utils/getSizedImageUrl'

import './index.scss'


const ImagesInputItem = ({ index, isLoading, imageSrc, handleRemove }) => {

    const src = getSizedImageUrl(imageSrc, 250);

    return (
        <div className="downloaded-image bg-secondary">
            {
                (isLoading) ?
                <Spinner animation="border" variant="dark" />:
                <>
                    <button
                        type="button"
                        className="close"
                        aria-label="Close"
                        onClick = {()=> handleRemove(index)}
                    >
                        <span aria-hidden="true">&times;</span>
                    </button>
                    <Image src={src} />
                </>
            }
            
        </div>
    )

}


export default ImagesInputItem;

