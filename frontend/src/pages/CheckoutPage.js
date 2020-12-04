import './CheckoutPage.less';

import React, { useContext, useState } from 'react';

import { Breadcrumb, Button, Col, Empty, Row, Typography } from 'antd';

import CartList from '../components/CartList.js';
import CartSummary from '../components/CartSummary.js';
import CheckoutSelect from '../components/CheckoutSelect.js';
import AuthContext from '../contexts/AuthContext';
import CartContext from '../contexts/CartContext';
import Modal from 'antd/lib/modal/Modal';
import AddressForm from '../components/AddressForm';
import CardForm from '../components/CardForm';
import DB from '../services/DatabaseService';
import dayjs from 'dayjs';
import Search from 'antd/lib/input/Search';
import { useHistory } from 'react-router-dom';

const { Paragraph, Title } = Typography;

/**
 * The checkout page. Gather's payment and shipping information from a user before
 * order placement.
 */
function CheckoutPage(props) {
  const auth = useContext(AuthContext);
  const cart = useContext(CartContext);
  const history = useHistory();
  const [editAddress, setEditAddress] = useState(false);
  const [editCard, setEditCard] = useState(false);
  const [addressFormLoading, setAddressFormLoading] = useState(false);
  const [cardFormLoading, setCardFormLoading] = useState(false);
  const [placingOrder, setPlacingOrder] = useState(false);

  const [address, setAddress] = useState(null);
  const [card, setCard] = useState(null);
  const [promo, setPromo] = useState(null);
  const [orderDate, setOrderDate] = useState(null);

  const onSubmitAddressForm = async (values) => {
    setAddressFormLoading(true);
    await DB.createAddress(values, auth);
    setAddressFormLoading(false);
    setEditAddress(false);
  };

  const onSubmitCardForm = async (values) => {
    setCardFormLoading(true);
    await DB.createCard(values, auth);
    setCardFormLoading(false);
    setEditCard(false);
  };

  const checkout = async () => {
    setPlacingOrder(true);
    setOrderDate(dayjs(Date.now()).format('YYYY-MM-DD HH:mm:ss'));
    console.log(orderDate);
    const values = {
      address: address,
      payment: card,
      promo: promo,
      orderDate: dayjs(Date.now()).format('YYYY-MM-DD HH:mm:ss'),
    };
    const response = await DB.checkout(values, auth);
    const id = await response.json();
    setPlacingOrder(false);
    history.push({
      pathname: '/checkout/confirm',
      state: { ...values, id },
    });
  };

  const searchPromo = async (code) => {
    const promo = await DB.fetchPromo(code);
    setPromo(promo);
  };

  if (auth.user != null && auth.user.id != null) {
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
                  setState={setAddress}
                  defaultChoice={0}
                  choices={auth.user.addresses}
                  renderChoice={(e) => (
                    <Paragraph
                      ellipsis={{ rows: 1 }}
                      style={{ display: 'inline' }}>
                      <b>{e.name}</b> {e.address1}, {e.address2} {e.city},{' '}
                      {e.state} {e.zip} {e.country}
                    </Paragraph>
                  )}
                  renderDefault={(e) =>
                    auth.user.addresses.length > 0
                      ? [
                          <Title
                            key='title'
                            className='bookstore-checkout-module-title'
                            level={4}
                            style={{ marginBottom: '0px' }}>
                            {e.name}
                          </Title>,
                          <Paragraph
                            key='content'
                            style={{
                              marginBottom: '0px',
                              whiteSpace: 'pre-line',
                            }}>
                            {e.address1}, {e.address2} {e.city}, {e.state}{' '}
                            {e.zip} {e.country}
                          </Paragraph>,
                        ]
                      : [
                          <Empty
                            description='No addresses available'
                            image={Empty.PRESENTED_IMAGE_SIMPLE}
                          />,
                          <Button
                            key='add'
                            className='bookstore-checkout-module-select-action'
                            type='link'
                            onClick={() => setEditAddress(true)}>
                            Add New
                          </Button>,
                        ]
                  }
                />
              </div>

              <div className='bookstore-checkout-module'>
                <Title className='bookstore-checkout-module-title'>
                  Payment Information
                </Title>
                <CheckoutSelect
                  setState={setCard}
                  defaultChoice={0}
                  choices={auth.user.savedCards}
                  renderChoice={(e) => (
                    <Paragraph style={{ display: 'inline' }}>
                      <b>{e.cardType}</b> ending in {e.number.slice(-4)}{' '}
                      {e.name} {e.expiry}
                    </Paragraph>
                  )}
                  renderDefault={(e) =>
                    auth.user.savedCards.length > 0 ? (
                      <Paragraph style={{ marginBottom: '0px' }} key={e}>
                        <b>{e.cardType}</b> ending in {e.number.slice(-4)}
                      </Paragraph>
                    ) : (
                      [
                        <Empty
                          description='No cards available'
                          image={Empty.PRESENTED_IMAGE_SIMPLE}
                        />,
                        <Button
                          key='add'
                          className='bookstore-checkout-module-select-action'
                          type='link'
                          onClick={() => setEditCard(true)}>
                          Add New
                        </Button>,
                      ]
                    )
                  }
                />
              </div>

              <CartList title='Review Cart' />
            </div>
            
            <div>
              <CartSummary
                promo={promo}
                action={
                  <Button
                    type='primary'
                    size='large'
                    block
                    onClick={checkout}
                    loading={placingOrder}
                    disabled={
                      address == null || card == null || cart.get().length === 0
                    }>
                    PLACE ORDER
                  </Button>
                }
              />
              
              <div style={{ marginTop: '25px' }}>
                <Search
                  placeholder='Input promo code'
                  allowClear
                  enterButton='Search'
                  size='large'
                  onSearch={searchPromo}
                  className='bookstore-checkout-module'
                />
              </div>
            </div>
            
          </div>

          <Modal
            title={
              <Title level={3} style={{ fontWeight: '900', margin: '0px' }}>
                Save New Billing Address
              </Title>
            }
            width={800}
            visible={editAddress}
            okText='Save'
            onCancel={() => setEditAddress(false)}
            okButtonProps={{
              form: 'address-form',
              htmlType: 'submit',
              loading: addressFormLoading,
            }}>
            <AddressForm addAddress={onSubmitAddressForm} />
          </Modal>
          <Modal
            title={
              <Title level={3} style={{ fontWeight: '900', margin: '0px' }}>
                Save New Card
              </Title>
            }
            width={800}
            visible={editCard}
            okText='Save'
            onCancel={() => setEditCard(false)}
            okButtonProps={{
              form: 'credit-card-form',
              htmlType: 'submit',
              loading: cardFormLoading,
            }}>
            <CardForm addCard={onSubmitCardForm} />
          </Modal>
        </Col>
      </Row>
    );
  } else {
    return <div></div>;
  }
}

export default CheckoutPage;
