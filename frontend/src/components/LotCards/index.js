import React from "react";
import { LotCard} from '../../components'

import "./index.scss"


const LotCards = ({ items }) => {

  return (
         <div className = "lot-cards container">
           <div className ="row justify-content-center">
         {
             items.map((item) => (
               
                     <LotCard key = {item._id} {...item}  />
             ))

             
         }
         </div>
      </div>
    );
}

export default LotCards;
