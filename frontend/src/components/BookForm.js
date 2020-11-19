import './BookForm.less';

import React from 'react';

import {
  Button,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Modal,
  Select,
  Typography,
  Upload,
} from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';

const { Text, Title } = Typography;

function BookForm(props) {
  let { addBook = () => {} } = props;

  const [form] = Form.useForm();

  const onFinish = (values) => {
    delete values.coverPicPath;
    values.authors = ['Alex Costa', 'Barack Obama'];

    values.pubDate = values.pubDate.format('YYYY-MM-DD');

    console.log(values);
    console.log(JSON.stringify(values));
    addBook(values);
    // form.resetFields();
  };

  const getFile = (e) => {
    console.log(e.fileList);
    return e.fileList;
  };

  return (
    <Form
      form={form}
      id='book-form'
      layout='vertical'
      onFinish={onFinish}
      requiredMark={false}>
      <Title style={{ fontWeight: '900' }}>Add Book</Title>

      <Form.Item
        label='Book Cover'
        name='coverPicPath'
        valuePropName='fileList'
        getValueFromEvent={getFile}
        rules={[{ required: true, message: 'Please upload a cover picture' }]}>
        <Upload listType='picture-card' accept='image/*'>
          <div>
            <PlusOutlined />
            <br />
            <Text>Upload</Text>
          </div>
        </Upload>
      </Form.Item>

      <div className='bookstore-book-form-field-container'>
        <Form.Item
          label='Title'
          name='title'
          hasFeedback
          rules={[
            {
              whitespace: true,
              required: true,
              message: 'Please enter a book title',
            },
          ]}>
          <Input />
        </Form.Item>
        <Form.Item
          label='ISBN-13'
          name='isbn'
          hasFeedback
          rules={[
            {
              whitespace: true,
              required: true,
              message: 'Please enter an ISBN-13',
            },
          ]}>
          <Input />
        </Form.Item>
      </div>

      <Text className='bookstore-book-form-label'>Authors</Text>
      <Form.List
        name='authors'
        rules={[
          {
            validator: async (_, authors) => {
              if (!authors || authors.length < 1) {
                return Promise.reject(
                  new Error('Please enter at least one author')
                );
              }
              return Promise.resolve();
            },
          },
        ]}>
        {(fields, { add, remove }, { errors }) => (
          <>
            {fields.map((field, index) => (
              <div
                className='bookstore-book-form-field-container'
                key={field.key}
                style={{ marginBottom: '16px' }}>
                <Form.Item
                  {...field}
                  name={[field.name, 'name']}
                  fieldKey={[field.key, 'name']}
                  key={field.key + 'name'}
                  hasFeedback
                  style={{ marginBottom: '0px' }}
                  rules={[
                    {
                      whitespace: true,
                      required: true,
                      message: 'Please enter a name',
                    },
                  ]}>
                  <Input placeholder='Name' />
                </Form.Item>
                <Form.Item
                  {...field}
                  name={[field.name, 'role']}
                  fieldKey={[field.key, 'role']}
                  key={field.key + 'role'}
                  style={{ marginBottom: '0px' }}>
                  <Input placeholder='Role' />
                </Form.Item>
                {fields.length > 1 ? (
                  <MinusCircleOutlined
                    onClick={() => remove(field.name)}
                    style={{
                      marginLeft: '8px',
                      height: '32px',
                      lineHeight: '36px',
                    }}
                  />
                ) : null}
              </div>
            ))}
            <Form.Item>
              <Button
                type='dashed'
                onClick={() => add()}
                icon={<PlusOutlined />}>
                ADD AUTHOR
              </Button>
              <Form.ErrorList errors={errors} />
            </Form.Item>
          </>
        )}
      </Form.List>

      <div className='bookstore-book-form-field-container'>
        <Form.Item label='Edition' name='edition'>
          <Input />
        </Form.Item>
        <Form.Item
          label='Pages'
          name='pages'
          hasFeedback
          rules={[{ required: true, message: 'Please enter a page count' }]}>
          <InputNumber style={{ width: '100%' }} />
        </Form.Item>
      </div>

      <Form.Item label='Description' name='description'>
        <Input.TextArea rows={4} />
      </Form.Item>

      <div className='bookstore-book-form-field-container'>
        <Form.Item
          label='Publisher'
          name='publisher'
          hasFeedback
          rules={[
            {
              whitespace: true,
              required: true,
              message: 'Please enter a publisher',
            },
          ]}>
          <Input />
        </Form.Item>
        <Form.Item
          label='Published Date'
          name='pubDate'
          hasFeedback
          rules={[{ required: true, message: 'Please enter a date' }]}>
          <DatePicker style={{ width: '100%' }} />
        </Form.Item>
      </div>

      <div className='bookstore-book-form-field-container'>
        <Form.Item label='Categories' name='categories'>
          <Select mode='multiple' />
        </Form.Item>
        <Form.Item label='Tags' name='tags'>
          <Select mode='tags' />
        </Form.Item>
      </div>

      <div className='bookstore-book-form-field-container'>
        <Form.Item
          label='Buy Price'
          name='buyPrice'
          hasFeedback
          rules={[{ required: true, message: 'Please enter a buy price' }]}>
          <InputNumber step={0.01} style={{ width: '100%' }} />
        </Form.Item>
        <Form.Item
          label='Sell Price'
          name='sellPrice'
          hasFeedback
          rules={[{ required: true, message: 'Please enter a sell price' }]}>
          <InputNumber step={0.01} style={{ width: '100%' }} />
        </Form.Item>
        <Form.Item
          label='Stock'
          name='stock'
          hasFeedback
          rules={[{ required: true, message: 'Please enter a stock' }]}>
          <InputNumber style={{ width: '100%' }} />
        </Form.Item>
        <Form.Item
          label='Min Threshold'
          name='minThresh'
          hasFeedback
          rules={[
            { required: true, message: 'Please enter a minimum threshold' },
          ]}>
          <InputNumber style={{ width: '100%' }} />
        </Form.Item>
      </div>

      <Form.Item style={{ margin: '16px 0px 0px 0px' }}>
        <Button
          className='bookstore-book-form-action'
          type='primary'
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

export default BookForm;
