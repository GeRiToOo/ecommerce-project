import React, { useEffect } from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Table, Button, Alert } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../components/Loader';
import { listOrders } from '../actions/orderActions';

const OrderListScreen = ({ history }) => {
  const dispatch = useDispatch();

  // GET user list from the global store
  const orderList = useSelector((state) => state.orderList);
  const { loading, error, orders } = orderList;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(listOrders());
    } else {
      history.pushState('/login');
    }
  }, [dispatch, history, userInfo]);

  return (
    <>
      <h1>Orders</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Alert variant="danger">{error}</Alert>
      ) : (
        <Table striped bordered hover responsive className="table-sm">
          <thead>
            <tr>
              <th>ID</th>
              <th>User</th>
              <th>Date</th>
              <th>Total</th>
              <th>Paid</th>
              <th>Delivered</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id}>
                <td>{order._id}</td>
                <td>{order.user && order.user.name}</td>
                <td>{order.createdAt.substring(0, 10)}</td>
                <td>{order.totalPrice}</td>
                <td className="text-center">
                  {order.isPaid ? (
                    <>
                      <i
                        className="fas fa-check-circle"
                        style={{ fontSize: '20px', color: 'green' }}
                      ></i>{' '}
                      {order.createdAt.substring(0, 10)}
                    </>
                  ) : (
                    <>
                      <i
                        className="fas fa-times-circle"
                        style={{ fontSize: '20px', color: 'red' }}
                      ></i>{' '}
                      Not Paid
                    </>
                  )}
                </td>
                <td className="text-center">
                  {order.isDelivered ? (
                    <>
                      <i
                        className="fas fa-check-circle"
                        style={{ fontSize: '20px', color: 'green' }}
                      ></i>{' '}
                      {order.deliveredAt.substring(0, 10)}
                    </>
                  ) : (
                    <>
                      <i
                        className="fas fa-times-circle"
                        style={{ fontSize: '20px', color: 'red' }}
                      ></i>{' '}
                      Not Delivered
                    </>
                  )}
                </td>
                <td>
                  <LinkContainer to={`/orders/${order._id}`}>
                    <Button variant="light" className="btn-sm">
                      Details
                    </Button>
                  </LinkContainer>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </>
  );
};

export default OrderListScreen;
