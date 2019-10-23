import React from "react";

import { Link } from 'react-router-dom';
import { LotCard} from '../../components'

import "./index.scss"


const LotCards = ({ items }) => {

  return (
         <div className = "lot-cards">
         {
             items.map((item) => (
                 <Link  to = {"/lots/"+item._id} key = {item._id}>
                     <LotCard {...item}  />
                 </Link>
             ))
         }
      </div>
    );
}

export default LotCards;
