import './AddressForm.less';

import React from 'react';

import { Form, Input } from 'antd';

import CountrySelect from '../components/CountrySelect.js';

function AddressForm(props) {
  const { form, addAddress } = props;

  const onFinish = (values) => {
    addAddress(values);
    form.resetFields();
  };

  return (
    <Form form={form} id='address-form' layout='vertical' onFinish={onFinish}>
      <Form.Item
        label='Country'
        name='country'
        rules={[
          {
            required: true,
            message: 'Please select a country',
          },
        ]}
        className='bookstore-address-form-input-narrow'>
        <CountrySelect />
      </Form.Item>
      <Form.Item
        label='Full Name'
        name='name'
        rules={[
          {
            required: true,
            message: 'Please enter a name',
          },
        ]}
        className='bookstore-address-form-input-narrow'>
        <Input name='name' />
      </Form.Item>
      <Form.Item
        label='Address Line 1'
        name='address1'
        rules={[
          {
            required: true,
            message: 'Please enter an address',
          },
        ]}>
        <Input
          name='address1'
          placeholder='Street Address, P.O. Box, Company Name, etc.'
        />
      </Form.Item>
      <Form.Item label='Address Line 2' name='address2'>
        <Input
          name='address2'
          placeholder='Apartment, Suite, Unit, Building, Floor, etc.'
        />
      </Form.Item>
      <div className='bookstore-address-form-input-row'>
        <Form.Item
          label='City'
          name='city'
          rules={[
            {
              required: true,
              message: 'Please enter a city',
            },
          ]}>
          <Input name='city' />
        </Form.Item>
        <Form.Item
          label='State/Province/Region'
          name='state'
          rules={[
            {
              required: true,
              message: 'Please enter a state/province/region',
            },
          ]}>
          <Input name='state' />
        </Form.Item>
        <Form.Item
          label='Zip Code'
          name='zip'
          rules={[
            {
              required: true,
              message: 'Please enter a zip code',
            },
          ]}>
          <Input name='zip' />
        </Form.Item>
      </div>
      <Form.Item
        label='Phone Number'
        name='phoneNumber'
        className='bookstore-address-form-input-narrow'
        style={{ marginBottom: '8px' }}>
        <Input type='tel' name='phoneNumber' />
      </Form.Item>
    </Form>
  );
}

export default AddressForm;
