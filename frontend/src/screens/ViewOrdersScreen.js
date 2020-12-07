import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { listMyOrders } from '../actions/orderActions';

const ViewOrdersScreen = ({ history }) => {
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const orderListMy = useSelector((state) => state.orderListMy);
  console.log(orderListMy.orders);

  const { loading: loadingOrders, error: errorOrders, orders } = orderListMy;

  return <>Hello this is view orders</>;
};

export default ViewOrdersScreen;
