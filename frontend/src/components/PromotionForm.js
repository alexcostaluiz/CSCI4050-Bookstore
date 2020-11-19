import './BookForm.less';

import React, { useState } from 'react';

import {
  Button,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Modal,
  Typography,
} from 'antd';

const { Title } = Typography;

function PromotionForm(props) {
  const { initialValues, onSubmit = () => {}, title } = props;
  
  const [form] = Form.useForm();

  const [loading, setLoading] = useState(false);

  const onFinish = async (values) => {
    setLoading(true);
    values.startDate = values.startDate.format('YYYY-MM-DD HH:mm:ss');
    values.endDate = values.endDate.format('YYYY-MM-DD HH:mm:ss');
    const ok = await onSubmit(values);
    if (ok) {
      Modal.destroyAll();
    }
    setLoading(false);
  };
  
  return (
    <Form
      form={form}
      id='promotion-form'
      layout='vertical'
      initialValues={initialValues}
      onFinish={onFinish}
      requiredMark={false}>
      <Title style={{ fontWeight: '900' }}>{title}</Title>
      
      <Form.Item name='id' hidden>
        <Input />
      </Form.Item>
      <Form.Item name='emailed' hidden>
        <Input />
      </Form.Item>

      <div className='bookstore-book-form-field-container'>
        <Form.Item
          label='Code'
          name='promoCode'
          hasFeedback
          rules={[{ required: true, message: 'Please enter a promo code' }]}>
          <Input />
        </Form.Item>
        <Form.Item
          label='Discount'
          name='discount'
          hasFeedback
          rules={[{ required: true, message: 'Please enter a discount' }]}>
          <InputNumber step={0.01} style={{ width: '100%' }} />
        </Form.Item>
      </div>
      
      <Form.Item
        label='Description'
        name='description'
        hasFeedback
        rules={[{ required: true, message: 'Please enter a description' }]}>
        <Input.TextArea rows={2} />
      </Form.Item>
      
      <div className='bookstore-book-form-field-container'>
        <Form.Item
          label='Start Date & Time'
          name='startDate'
          hasFeedback
          rules={[{ required: true, message: 'Please enter a start date and time' }]}>
          <DatePicker showTime format='YYYY-MM-DD HH:mm:ss' style={{ width: '100%' }} />
        </Form.Item>
        <Form.Item
          label='End Date & Time'
          name='endDate'
          hasFeedback
          rules={[{ required: true, message: 'Please enter an end date and time' }]}>
          <DatePicker showTime format='YYYY-MM-DD HH:mm:ss' style={{ width: '100%' }} />
        </Form.Item>
      </div>
      
      <Form.Item style={{ margin: '16px 0px 0px 0px' }}>
        <Button
          className='bookstore-book-form-action'
          type='primary'
          loading={loading}
          htmlType='submit'>
          SAVE
        </Button>
        <Button
          className='bookstore-book-form-action'
          onClick={() => Modal.destroyAll()}>
          CANCEL
        </Button>
      </Form.Item>      
    </Form>
  );
}

export default PromotionForm;
