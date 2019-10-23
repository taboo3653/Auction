import React, {useState} from 'react'
import Carousel from 'react-bootstrap/Carousel'
import getSizedImageUrl from '../../../../utils/getSizedImageUrl'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons'
import { emptyImgUrl } from '../../../../utils/variables'
import './index.scss'


const LotCarousel = ({imagesSrc}) => {

    if(imagesSrc.length === 0)
      imagesSrc.push(emptyImgUrl);
    const srcArray = imagesSrc.map((imageSrc)=>getSizedImageUrl(imageSrc, 600));


    const [index, setIndex] = useState(0);
    const [direction, setDirection] = useState(null);
  
    const handleSelect = (selectedIndex, e) => {
      setIndex(selectedIndex);
      setDirection(e.direction);
    };
  
    return (
      <Carousel 
        className = "lot-carousel" 
        activeIndex={index} 
        direction={direction} 
        onSelect={handleSelect}
        nextIcon ={ <FontAwesomeIcon size="lg" icon={faChevronRight} color="gray" />}
        prevIcon ={ <FontAwesomeIcon size="lg" icon={faChevronLeft} color="gray" />}
      >
        {
            srcArray.map((src, index)=> (
            <Carousel.Item className = "lot-carousel__item" key = {index}>
                <img 
                className="d-block"
                src={src}
                alt={index+ "slide"}
                />
                
            </Carousel.Item>
            ))
        }
       
      </Carousel>
    );
  }

  export default LotCarousel