import 'react-credit-cards/es/styles-compiled.css';

import React, { useContext, useState } from 'react';

import { Form, Input, Modal, Select, Typography } from 'antd';

import Cards from 'react-credit-cards';

import AddressForm from './AddressForm.js';
import AuthContext from '../contexts/AuthContext.js';
import DB from '../services/DatabaseService.js';

const { Title } = Typography;

function CardForm(props) {
  let { form, addCard = () => {} } = props;

  if (!form) {
    form = Form.useForm()[0];
  }

  const auth = useContext(AuthContext);

  const [number, setNumber] = useState('');
  const [name, setName] = useState('');
  const [expiry, setExpiry] = useState('');
  const [focus, setFocus] = useState('');

  const [addressFormVisible, setAddressFormVisible] = useState(false);
  const [addressFormLoading, setAddressFormLoading] = useState(false);

  const handleFocusChange = (e) => {
    setFocus(e.target.name);
  };

  const onCardChange = (type, isValid) => {
    form.setFieldsValue({ cardType: type.issuer, valid: isValid });
    if (isValid) {
      form.validateFields(['number']);
    }
  };

  const onFinish = (values) => {
    values.address = auth.user.addresses.find((a) => a.id === values.address);
    addCard(values);
    form.resetFields();
    setNumber('');
    setName('');
    setExpiry('');
    setFocus('');
  };

  const onBillingAddressSelect = (value) => {
    if (value === -1) {
      setAddressFormVisible(true);
    }
  };

  const onCancelAddressForm = () => {
    setAddressFormVisible(false);
    form.resetFields(['address']);
  };

  const onSubmitAddressForm = async (values) => {
    setAddressFormLoading(true);
    const address = await DB.createAddress(values, auth);
    setAddressFormLoading(false);
    if (address) {
      form.setFieldsValue({ address: address.id });
      setAddressFormVisible(false);
    }
  };

  return (
    <div className='bookstore-credit-card-form'>
      <Cards
        cvc=''
        expiry={expiry}
        focused={focus}
        name={name}
        number={number}
        callback={onCardChange}
        preview
      />
      <Form
        id='credit-card-form'
        form={form}
        onFinish={onFinish}
        layout='vertical'
        requiredMark={false}
        style={{ width: '100%', marginLeft: '32px' }}>
        <Form.Item
          label='Card Number'
          name='number'
          rules={[
            {
              required: true,
              message: 'Please input a card number',
            },
            ({ getFieldValue }) => ({
              validator(rule, value) {
                if (!value || getFieldValue('valid')) {
                  return Promise.resolve();
                }
                return Promise.reject('Please enter a valid card number');
              },
            }),
          ]}
          hasFeedback>
          <Input
            type='tel'
            name='number'
            onChange={(e) => setNumber(e.target.value)}
            onFocus={handleFocusChange}
          />
        </Form.Item>
        <Form.Item
          label='Name on Card'
          name='name'
          rules={[
            {
              required: true,
              message: 'Please input the name on card',
            },
          ]}
          hasFeedback>
          <Input
            name='name'
            onChange={(e) => setName(e.target.value)}
            onFocus={handleFocusChange}
          />
        </Form.Item>
        <Form.Item
          label='Valid Thru'
          name='expiry'
          rules={[
            {
              required: true,
              message: 'Please input an expiry date',
            },
            {
              pattern: /\d\d\/\d\d/,
              message: 'Expiry date expected in format "MM/YY"',
            },
          ]}
          hasFeedback>
          <Input
            name='expiry'
            onChange={(e) => setExpiry(e.target.value)}
            onFocus={handleFocusChange}
          />
        </Form.Item>
        <Form.Item name='cardType' hidden>
          <Input name='cardType' type='hidden' />
        </Form.Item>
        <Form.Item name='valid' hidden>
          <Input name='valid' type='hidden' />
        </Form.Item>
        <Form.Item
          label='Billing Address'
          name='address'
          rules={[
            {
              required: true,
              message: 'Please select or enter a billing address',
            },
          ]}>
          <Select
            placeholder='Select a billing address...'
            onChange={onBillingAddressSelect}
            allowClear>
            <Select.Option value={-1} style={{ color: '#FF1053' }}>
              Add new address
            </Select.Option>
            {auth.user.addresses.map((a) => (
              <Select.Option key={a.id} value={a.id}>
                {a.address1 +
                  (a.address2 ? ' ' + a.address2 : '') +
                  ', ' +
                  a.city +
                  ', ' +
                  a.state +
                  ', ' +
                  a.zip +
                  ' ' +
                  a.country}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
      </Form>
      <Modal
        title={
          <Title level={3} style={{ fontWeight: '900', margin: '0px' }}>
            Save New Billing Address
          </Title>
        }
        width={800}
        visible={addressFormVisible}
        okText='Save'
        onCancel={onCancelAddressForm}
        okButtonProps={{
          form: 'address-form',
          htmlType: 'submit',
          loading: addressFormLoading,
        }}>
        <AddressForm addAddress={onSubmitAddressForm} />
      </Modal>
    </div>
  );
}

export default CardForm;
