import React, { useEffect } from 'react';
import { Row, Col, ListGroup, Image, Card, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../components/Loader';
import { getOrderDetails } from '../actions/orderActions';

const OrderScreen = ({ match }) => {
  const orderId = match.params.id;
  const dispatch = useDispatch();

  // GET order details from global State
  const orderDetails = useSelector((state) => state.orderDetails);
  const { order, loading, error } = orderDetails;

  if (!loading) {
    // Calculate prices for ORDER SUMMARY
    const addDecimals = (num) => {
      return (Math.round(num * 100) / 100).toFixed(2);
    };
    order.itemsPrice = addDecimals(
      order.orderItems.reduce((acc, item) => acc + item.price * item.qty, 0)
    );
    order.taxPrice = addDecimals(Number((0.2 * order.itemsPrice).toFixed(2)));
  }
  // END of calculations

  useEffect(() => {
    if (!order || order._id !== orderId) {
      dispatch(getOrderDetails(orderId));
    }
  }, [dispatch, order, orderId]);

  useEffect(() => {
    dispatch(getOrderDetails(orderId));
  }, [dispatch, orderId]);

  return loading ? (
    <Loader />
  ) : error ? (
    <Alert variant="danger">{error}</Alert>
  ) : (
    <>
      <h1>Order Details</h1>
      <Row>
        <Col md={7}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <p>Order #: {order._id}</p>
            </ListGroup.Item>
            <ListGroup.Item>
              <h2>Shipping</h2>
              <strong> Email:</strong>
              <p>{order.user.email}</p>
              <strong> Address:</strong>
              <p>{order.shippingAddress.address},</p>
              <p>{order.shippingAddress.city},</p>
              <p>{order.shippingAddress.postCode},</p>
              <p>{order.shippingAddress.country}</p>
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Payment Method</h2>
              <strong> Method</strong>
              <p>{order.paymentMethod}</p>

              {order.isPaid ? (
                <Alert className="mt-3" variant="success">
                  Successfully Paid on {order.paidAt}
                </Alert>
              ) : (
                <Alert className="mt-3" variant="danger">
                  Order Not Paid
                </Alert>
              )}
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={5}>
          <Card>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h2>Order Item(s)</h2>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row className="p-3">
                  <Col>Items:</Col>
                  <Col>£ {order.itemsPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row className="p-3">
                  <Col>Tax:</Col>
                  <Col>£ {order.taxPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row className="p-3">
                  <Col>Shipping:</Col>
                  <Col> £ {order.shippingPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>
                    <h3>Total:</h3>
                  </Col>
                  <Col>
                    <h3>£ {order.totalPrice}</h3>
                  </Col>
                </Row>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
      <Row>
        <Col>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>Order Item(s)</h2>
              {order.orderItems.length === 0 ? (
                <Alert>Order is empty</Alert>
              ) : (
                <ListGroup variant="flush">
                  {order.orderItems.map((item, index) => (
                    <ListGroup.Item key="index">
                      <Row className="pt-3">
                        <Col md={2}>
                          <Image
                            src={item.image}
                            alt={item.name}
                            fluid
                            rounded
                            className="mb-3"
                          />
                        </Col>
                        <Col
                          md={2}
                          className="col align-self-center justify-content-center pb-3"
                        >
                          <Link to={`/product/${item.product}`}>
                            {item.name}
                          </Link>
                        </Col>
                        <Col md={6}>
                          <Row className="row justify-content-center pt-3 pb-3">
                            <Col
                              md={3}
                              className="col align-self-center justify-content-center"
                            >
                              Qty: {item.qty}
                            </Col>
                            <Col
                              className="col align-self-center justify-content-center"
                              md={4}
                            >
                              Price: £{item.price}
                            </Col>
                            <Col
                              className="col align-self-center justify-content-center"
                              md={5}
                            >
                              Total: £{(item.qty * item.price).toFixed(2)}
                            </Col>
                          </Row>
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              )}
            </ListGroup.Item>
          </ListGroup>
        </Col>
      </Row>
    </>
  );
};

export default OrderScreen;
