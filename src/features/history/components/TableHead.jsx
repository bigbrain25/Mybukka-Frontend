import React from 'react';
import Row from 'Components/grid/Row';
import PropTypes from 'prop-types';

// eslint-disable-next-line max-len
const Col = ({ children }) => <div className="col-2 pt-1 pb-1 bold">{children}</div>;

const TableHead = () => (
  <Row classNames="flex border d-xl-flex d-lg-flex d-md-none d-none">
    <Col className="col-2">Status</Col>
    <Col className="col-2">PickUp</Col>
    <Col className="col-2">DropOff</Col>
    <Col className="col-2">Order</Col>
    <Col className="col-2">Price</Col>
    <Col className="col-2">Courier</Col>
  </Row>
);

export default TableHead;

TableHead.propTypes = {};


Col.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired
};

