import 'react-credit-cards/es/styles-compiled.css';

import React, { useState } from 'react';

import { Form, Input } from 'antd';

import Cards from 'react-credit-cards';

function CardForm(props) {
  const { addCard, form } = props;

  const [number, setNumber] = useState('');
  const [name, setName] = useState('');
  const [expiry, setExpiry] = useState('');
  const [focus, setFocus] = useState('');

  const handleFocusChange = (e) => {
    setFocus(e.target.name);
  };

  const onCardChange = (type, isValid) => {
    form.setFieldsValue({cardType: type.issuer, valid: isValid});
    if (isValid) {
      form.validateFields(['number']);
    }
  };

  const onFinish = (values) => {
    addCard(values);
    form.resetFields();
    setNumber('');
    setName('');
    setExpiry('');
    setFocus('');
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
        style={{ marginLeft: '32px', width: '100%' }}>
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
              message: 'Expiry date expected in format "MM/YY"'
            },
          ]}
          hasFeedback
          style={{ marginBottom: '0px' }}>
          <Input
            name='expiry'
            onChange={(e) => setExpiry(e.target.value)}
            onFocus={handleFocusChange}
          />
        </Form.Item>
        <Form.Item name='cardType' hidden>
          <Input
            name='cardType'
            type='hidden'
          />
        </Form.Item>
        <Form.Item name='valid' hidden>
          <Input
            name='valid'
            type='hidden'
          />
        </Form.Item>
      </Form>
    </div>
  );
}

export default CardForm;
