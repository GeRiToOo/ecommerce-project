import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';

const SearchBox = ({ history }) => {
  const [keyword, setKeyword] = useState('');

  const submitHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      history.push(`/search/${keyword}`);
    } else {
      history.push('/');
    }
  };

  return (
    <Form className="mt-1" onSubmit={submitHandler} inline>
      <Form.Control
        type="text"
        name="q"
        onChange={(e) => setKeyword(e.target.value)}
        placeholder="Search products...."
        className="form-control-sm mr-sm-2 mt-xsm-5 mt-1"
      ></Form.Control>
      <Button
        className="btn btn-primary btn-sm mt-1"
        type="submit"
        variant="outline-success"
      >
        Search
      </Button>
    </Form>
  );
};

export default SearchBox;
