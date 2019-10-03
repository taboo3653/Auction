import React, { useEffect } from "react";
import { connect } from "react-redux";
import { LotCards as LotCardsComponent } from "../components";
import { fetchAllLots } from "../redux/actions";
import Spinner from 'react-bootstrap/Spinner'


const LotCards = ({ fetchAllLots, items }) => {


  useEffect(() => {
    fetchAllLots();
  }, [fetchAllLots]);


  return (
    <>
      {(items && items.length) ?
        <LotCardsComponent items={items} /> :
        <Spinner animation="border" />
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
