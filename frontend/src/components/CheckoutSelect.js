import './CheckoutSelect.less';

import React, { useContext, useState } from 'react';
import { Button, Radio } from 'antd';
import Modal from 'antd/lib/modal/Modal';
import AuthContext from '../contexts/AuthContext';
import CardForm from './CardForm';
import DB from '../services/DatabaseService';
import AddressForm from './AddressForm';
import Title from 'antd/lib/typography/Title';

function CheckoutSelect(props) {
  const {
    defaultChoice,
    choices,
    renderChoice,
    renderDefault,
    setState,
  } = props;

  const [choice, setChoice] = useState(defaultChoice);
  const [choosing, setChoosing] = useState(false);
  setState(choices[choice]);
  const auth = useContext(AuthContext);
  const [editAddress, setEditAddress] = useState(false);
  const [editCard, setEditCard] = useState(false);
  const [addressFormLoading, setAddressFormLoading] = useState(false);
  const [cardFormLoading, setCardFormLoading] = useState(false);

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

  return (
    <div className='bookstore-checkout-module-select'>
      {!choosing
        ? [
            renderDefault(choices[choice]),
            choices.length > 0 ? (
              <Button
                key='action'
                className='bookstore-checkout-module-select-action'
                onClick={() => setChoosing(true)}
                type='primary'>
                CHANGE
              </Button>
            ) : (
              <div />
            ),
          ]
        : [
            <Radio.Group
              key='choices'
              value={choice}
              onChange={(e) => setChoice(e.target.value)}>
              {choices.map((e, i) => (
                <Radio value={i}>{renderChoice(e)}</Radio>
              ))}
            </Radio.Group>,
            <Button
              key='action'
              className='bookstore-checkout-module-select-action'
              onClick={() => {
                setChoosing(false);
                setState(choices[choice]);
              }}
              type='primary'>
              SAVE
            </Button>,
            <Button
              key='add'
              className='bookstore-checkout-module-select-action'
              type='link'
              onClick={() => {
                if (choices[choice].number != null) {
                  setEditCard(true);
                } else {
                  setEditAddress(true);
                }
              }}>
              Add New
            </Button>,
          ]}
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
    </div>
  );
}

export default CheckoutSelect;
