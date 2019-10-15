import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Link } from 'react-router-dom';
import { LotCard, Loader} from '../../components'
import { fetchAllLots, removeLots } from "../../redux/actions";
import { socket } from '../../core'

import "./index.scss"


const LotCards = ({ fetchAllLots, removeLots, items }) => {

  const [isLoading, setIsLoading] = useState(false);



  useEffect(() => {
    const fetchData = () => {
      setIsLoading(true);
      fetchAllLots().finally(() => setIsLoading(false))
    }

    fetchData();
    socket.on('SERVER:LOT_ADDED', fetchData);
    
    return () => {
      socket.removeListener('SERVER:LOT_ADDED', fetchData);
      removeLots();
    }

  }, [fetchAllLots, removeLots]);


  return (
    <>
      {(!isLoading) ? (
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
    fetchAllLots,
    removeLots
  }
)(LotCards);
