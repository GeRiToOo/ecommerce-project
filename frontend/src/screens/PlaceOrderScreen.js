import React, { useEffect } from 'react';
import {
  Button,
  Row,
  Col,
  ListGroup,
  Image,
  Card,
  Alert,
} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import CheckoutSteps from '../components/CheckoutSteps';
import { createOrder } from '../actions/orderActions';

const PlaceOrderScreen = ({ history }) => {
  const dispatch = useDispatch();
  // Get cart details from Global State
  const cart = useSelector((state) => state.cart);

  // if missing shipping or payment information navigate user to ...
  if (!cart.shippingAddress.address) {
    history.push('/shipping');
  } else if (!cart.paymentMethod) {
    history.push('/payment');
  }

  // Calculate prices for ORDER SUMMARY
  const addDecimals = (num) => {
    return (Math.round(num * 100) / 100).toFixed(2);
  };

  cart.itemsPrice = addDecimals(
    cart.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0)
  );
  cart.shippingPrice = addDecimals(cart.itemsPrice > 100 ? 0 : 3.99);
  cart.taxPrice = addDecimals(Number((0.2 * cart.itemsPrice).toFixed(2)));
  cart.totalPrice = (
    Number(cart.itemsPrice) + Number(cart.shippingPrice)
  ).toFixed(2);
  // * * * * * END CALCULATIONS * * * *

  const orderCreate = useSelector((state) => state.orderCreate);
  const { order, success, error } = orderCreate;

  useEffect(() => {
    if (success) {
      history.push(`/orders/${order._id}`);
    }
    // eslint-disable-next-line
  }, [history, success]);

  const placeOrderHandler = () => {
    dispatch(
      createOrder({
        orderItems: cart.cartItems,
        shippingAddress: cart.shippingAddress,
        paymentMethod: cart.paymentMethod,
        itemsPrice: Number(cart.itemsPrice),
        shippingPrice: Number(cart.shippingPrice),
        taxPrice: parseInt(cart.taxPrice),
        totalPrice: Number(cart.totalPrice),
        createdAt: Date.now(),
      })
    );
  };

  return (
    <>
      <CheckoutSteps step1 step2 step3 step4 />
      <Row>
        <Col md={7}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>Shipping Details</h2>
              <strong> Delivery to:</strong>
              <p>{cart.shippingAddress.name}</p>
              <strong> Address:</strong>
              <p>{cart.shippingAddress.address},</p>
              <p>{cart.shippingAddress.city},</p>
              <p>{cart.shippingAddress.postCode},</p>
              <p>{cart.shippingAddress.country}</p>
              <strong> Contact Number:</strong>
              <p>{cart.shippingAddress.phoneNumber}</p>
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Payment Method</h2>
              <strong> Method</strong>
              <p>{cart.paymentMethod}</p>
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={5}>
          <Card>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h2>Order Summary</h2>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row className="p-3">
                  <Col>Items:</Col>
                  <Col>£ {cart.itemsPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row className="p-3">
                  <Col>Tax:</Col>
                  <Col>£ {cart.taxPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row className="p-3">
                  <Col>Shipping:</Col>
                  <Col> £ {cart.shippingPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>
                    <h3>Total:</h3>
                  </Col>
                  <Col>
                    <h3>£ {cart.totalPrice}</h3>
                  </Col>
                </Row>
              </ListGroup.Item>
              {error && (
                <ListGroup.Item>
                  <Alert variant="danger"> {error}</Alert>
                </ListGroup.Item>
              )}
              <ListGroup.Item>
                <Button
                  type="button"
                  className="btn-block"
                  disabled={cart.cartItems === 0}
                  onClick={placeOrderHandler}
                >
                  Process to Payment
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
      <Row>
        <Col>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>Order Summary</h2>
              {cart.cartItems.length === 0 ? (
                <Alert>Your cart is empty</Alert>
              ) : (
                <ListGroup variant="flush">
                  {cart.cartItems.map((item, index) => (
                    <ListGroup.Item key={index}>
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

export default PlaceOrderScreen;
