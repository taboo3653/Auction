import React, { useEffect } from "react";
import { connect } from "react-redux";
import { LotCards as LotCardsComponent } from "../components";
import { fetchAllLots } from "../redux/actions";

const LotCards = ({ fetchAllLots, items }) => {
  useEffect(() => {
    fetchAllLots();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    console.log(items);
  }, [items]);

  return <LotCardsComponent items = {items} />;
};

export default connect(
  ({ lots }) => ({
    items: lots.items
  }),
  {
    fetchAllLots
  }
)(LotCards);
