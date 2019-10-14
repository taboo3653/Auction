import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Link } from 'react-router-dom';
import { LotCard, Loader} from '../../components'
import { fetchAllLots } from "../../redux/actions";
import { socket } from '../../core'

import "./index.scss"


const LotCards = ({ fetchAllLots, items }) => {

  useEffect(() => {
    fetchAllLots();
    socket.on('SERVER:LOT_ADDED', fetchAllLots);

    return () => {
      socket.removeListener('SERVER:MARKET_UPDATED', fetchAllLots);
    }

  }, [fetchAllLots]);


  return (
    <>
      {(items && items.length) ? (
         <div className = "lot-cards">
         {
             items.map((item) => (
                 
                 <Link  to = {"/lot/"+item._id} key = {item._id}>
                     <LotCard {...item}  />
                 </Link>
             ))
         }
      </div>):
        <Loader />
      }
    </>);
}

export default connect(
  ({ market }) => ({
    items: market.items
  }),
  {
    fetchAllLots
  }
)(LotCards);
