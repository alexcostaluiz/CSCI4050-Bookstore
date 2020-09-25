import React from 'react';

import { Row, Col, Layout, Typography } from 'antd';

const { Footer: AntFooter } = Layout;
const { Paragraph } = Typography;

function Footer(props) {
  return (
    <AntFooter style={{background: 'white'}}>
      <Row justify='center'>
        <Col>
          <Paragraph>Copyright © 2020 Group A7.</Paragraph>
        </Col>
      </Row>
    </AntFooter>
  );
}

export default Footer;
