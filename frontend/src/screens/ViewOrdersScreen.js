import React, { useEffect } from 'react';
import {
  Form,
  Button,
  Row,
  Col,
  Alert,
  ListGroup,
  Table,
} from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../components/Loader';
import { listMyOrders } from '../actions/orderActions';

const ViewOrdersScreen = ({ history }) => {
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const orderListMy = useSelector((state) => state.orderListMy);
  const { loading: loadingOrders, error: errorOrders, orders } = orderListMy;
  console.log(orderListMy.orders);

  useEffect(() => {
    dispatch(listMyOrders());
  }, []);

  return (
    <Row>
      <Col>
        <h2>Order History</h2>
        {loadingOrders ? (
          <Loader />
        ) : errorOrders ? (
          <Alert variant="danger">{errorOrders}</Alert>
        ) : (
          <Table striped bordered hover responsive className="table-sm">
            <thead>
              <tr>
                <th>ID</th>
                <th>Date</th>
                <th>TOTAL</th>
                <th>Status</th>
                <th>Delivery Status</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order._id}>
                  <td>{order._id}</td>
                  <td>{order.createdAt && order.createdAt.substring(0, 10)}</td>
                  <td>£ {order.totalPrice}</td>
                  <td>
                    {order.isPaid ? (
                      <p style={{ color: 'green' }}>
                        <i className="fas fa-check"></i> Paid on{' '}
                        {order.paidAt.substring(0, 10)}
                      </p>
                    ) : (
                      <p style={{ color: 'red' }}>
                        <i className="fas fa-times"></i> Not Paid
                      </p>
                    )}
                  </td>
                  <td>
                    {order.isDelivered ? (
                      order.deliveredAt.substring(0, 10)
                    ) : (
                      <p style={{ color: 'red' }}>
                        <i className="fas fa-times"></i> Not Delivered
                      </p>
                    )}
                  </td>
                  <td>
                    <LinkContainer to={`/orders/${order._id}`}>
                      <Button className="btn-sm" variant="light">
                        Details
                      </Button>
                    </LinkContainer>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </Col>
    </Row>
  );
};

export default ViewOrdersScreen;
