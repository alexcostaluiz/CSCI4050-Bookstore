import React from 'react';

import { Row, Col, Typography } from 'antd';

const { Title, Paragraph } = Typography;

function HomePage(props) {
  return (
    <Row>
      <Col>
        <Title>Welcome to Bookstore.</Title>
      </Col>
    </Row>
  );
}

export default HomePage;
