import './CheckoutPage.less';

import React from 'react';

import { Breadcrumb, Button, Col, Row, Typography } from 'antd';

import CartList from '../components/CartList.js';
import CartSummary from '../components/CartSummary.js';
import CheckoutSelect from '../components/CheckoutSelect.js';

const { Paragraph, Title } = Typography;

/**
 * The checkout page. Gather's payment and shipping information from a user before
 * order placement.
 */
function CheckoutPage(props) {
  return (
    <Row justify='center'>
      <Col span={24} className='bookstore-column'>
        <Breadcrumb className='bookstore-breadcrumb'>
          <Breadcrumb.Item href='/'>Home</Breadcrumb.Item>
          <Breadcrumb.Item href='/cart'>Cart</Breadcrumb.Item>
          <Breadcrumb.Item href='#'>Checkout</Breadcrumb.Item>
        </Breadcrumb>
        <div className='bookstore-page-section'>
          <div className='bookstore-checkout-module-container'>
            <div className='bookstore-checkout-module'>
              <Title className='bookstore-checkout-module-title'>
                Shipping Address
              </Title>
              <CheckoutSelect
                defaultChoice={0}
                choices={[
                  ['Alexander Costa', '490 S Barnett Shoals Rd', 'Apt 911',
                   'Athens, GA 30605-7654', 'United States'],
                  ['Alexander Costa', '10886 Bossier Dr',
                   'Johns Creek, GA 30022-7959', 'United States'],
                  ['Alexander Costa', '3689 Hermitage Dr NW',
                   'Berkeley Lake, GA 30096-3115', 'United States'],
                ]}
                renderChoice={e => <Paragraph ellipsis={{ rows: 1 }} style={{ display: 'inline' }}><b>{e[0]}</b> {e.slice(1).join(' ')}</Paragraph>}
                renderDefault={e => [
                  <Title
                    key='title'
                    className='bookstore-checkout-module-title'
                    level={4}
                    style={{ marginBottom: '0px' }}>
                    {e[0]}
                  </Title>,
                  <Paragraph key='content' style={{ marginBottom: '0px', whiteSpace: 'pre-line' }}>
                  {e.slice(1).join('\n')}
                  </Paragraph>
                ]}
              />
            </div>

            <div className='bookstore-checkout-module'>
              <Title className='bookstore-checkout-module-title'>
                Payment Information
              </Title>
              <CheckoutSelect
                defaultChoice={0}
                choices={[
                  ['Discover', '5028', 'Alexander L Costa', '03/2022'],
                  ['Visa', '7491', 'Alexander L Costa', '07/2024'],
                ]}
                renderChoice={e => (
                  <Paragraph style={{ display: 'inline' }}>
                    <b>{e[0]}</b> ending in {e[1]} {e.slice(2).join(' ')}
                  </Paragraph>
                )}
                renderDefault={e => (
                  <Paragraph style={{ marginBottom: '0px' }}><b>{e[0]}</b> ending in {e[1]}</Paragraph>
                )}
              />
            </div>

            <CartList title='Review Cart' />
          </div>

          <CartSummary
            action={
              <Button type='primary' size='large' block>
                PLACE ORDER
              </Button>
            }
          />
        </div>
      </Col>
    </Row>
  );
}

export default CheckoutPage;
