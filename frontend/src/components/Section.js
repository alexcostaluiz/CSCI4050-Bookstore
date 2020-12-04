import './Section.less';

import React from 'react';

import { Col, Row, Typography } from 'antd';

const { Title } = Typography;

/**
 * Sections for all users.
 *
 * @type {!Array<String>}
 */
const sections = ['Bestsellers', 'Featured'];

/**
 * Sections for registered users.
 *
 * @type {!Array<String>}
 */
const signedInSections = [
  'Recently Viewed',
  'Favorite Category',
  'Favorite Author',
];

/**
 * A horizontal section component. Displays a title above the specified children.
 *
 * @param {string} props.title The title of this section.
 * @param {!Array<ReactNode>} props.children An array of child components that should
 *     be displayed within this section.
 */
function Section(props) {
  const { title, children } = props;

  return (
    <Row className='bookstore-section'>
      <Col span={24}>
        <Title
          className='bookstore-section-title'
          level={2}
          style={{ padding: '15px' }}>
          {title}
        </Title>
        {children}
      </Col>
    </Row>
  );
}

export { Section as default, sections, signedInSections };
