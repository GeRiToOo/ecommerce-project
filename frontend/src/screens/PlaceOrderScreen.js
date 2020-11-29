import React, { useState } from 'react';
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

const PlaceOrderScreen = () => {
  const cart = useSelector((state) => state.cart);

  return (
    <>
      <CheckoutSteps step1 step2 step3 step4 />
      <Row>
        <Col md={8}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>Shipping</h2>
              <strong> Address:</strong>
              <p>{cart.shippingAddress.address},</p>
              <p>{cart.shippingAddress.city},</p>
              <p>{cart.shippingAddress.postCode},</p>
              <p>{cart.shippingAddress.country}</p>
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Payment Method</h2>
              <strong> Method</strong>
              <p>{cart.paymentMethod}</p>
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={4}>
          <Card>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h2>Order Summary</h2>
              </ListGroup.Item>
              <Row className="p-3">
                <Col>Items:</Col>
                <Col>£</Col>
              </Row>
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

export default PlaceOrderScreen;
