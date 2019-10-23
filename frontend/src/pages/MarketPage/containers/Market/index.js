import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { LotCards, Loader} from '../../../../components'
import { fetchAllLots, removeLots } from "../../../../redux/actions";
import { socket } from '../../../../core'

import "./index.scss"


const Market = ({ fetchAllLots, removeLots, items }) => {

  const [isLoading, setIsLoading] = useState(false);



  useEffect(() => {
    const fetchData = () => {
      setIsLoading(true);
      fetchAllLots().finally(() => setIsLoading(false))
    }

    fetchData();
    socket.on('SERVER:LOT_ADDED', fetchData);
    
    return () => {
      socket.off('SERVER:LOT_ADDED', fetchData);
      removeLots();
    }

  }, [fetchAllLots, removeLots]);


  return (
    <>
      {(!isLoading) ? (
        <LotCards items = {items} />
        ):
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
)(Market);
