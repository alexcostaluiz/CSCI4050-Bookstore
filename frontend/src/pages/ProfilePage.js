import './ProfilePage.less';

import React, { useState } from 'react';

import {
  Layout,
  Menu,
  Typography,
  Input,
  Card,
  Space,
  Button,
  Form,
  Select,
  Table,
  notification,
  Popconfirm,
} from 'antd';

import {
  UserOutlined,
  KeyOutlined,
  CreditCardOutlined,
  EyeInvisibleOutlined,
  EyeTwoTone,
} from '@ant-design/icons';

import 'react-credit-cards/es/styles-compiled.css';
import Cards from 'react-credit-cards';

const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;
const { Paragraph } = Typography;

const passwordNotification = () => {
  notification.open({
    message: 'Password Updated!',
    onClick: () => {
      console.log('Notification Clicked!');
    },
  });
};

const addressNotification = () => {
  document.getElementById('street').readOnly = true;
  document.getElementById('city').readOnly = true;
  document.getElementById('state').readOnly = true;
  document.getElementById('zip').readOnly = true;
  notification.open({
    message: 'Address Updated!',
    onClick: () => {
      console.log('Notification Clicked!');
    },
  });
};
const editProfile = () => {
  document.getElementById('first-name').readOnly = false;
  document.getElementById('last-name').readOnly = false;
};

const submitEditProfile = () => {
  document.getElementById('first-name').readOnly = true;
  document.getElementById('last-name').readOnly = true;
};

const editAddress = () => {
  document.getElementById('street').readOnly = false;
  document.getElementById('city').readOnly = false;
  document.getElementById('state').readOnly = false;
  document.getElementById('zip').readOnly = false;
};

const onFinish = (values) => {
  console.log(values);
};

class EditableTable extends React.Component {
  constructor(props) {
    super();
    this.columns = [
      { title: 'Your Credit and Debit Cards', dataIndex: 'name', key: 'name' },
      { title: 'Expires', dataIndex: 'date', key: 'date' },
      {
        title: 'operation',
        dataIndex: 'operation',
        render: (text, record) =>
          this.state.dataSource.length >= 1 ? (
            <Popconfirm
              title='Sure to delete?'
              onConfirm={() => this.handleDelete(record.key)}>
              <Button type='link'>Delete</Button>
            </Popconfirm>
          ) : null,
      },
    ];
    this.state = {
      dataSource: [
        {
          key: 0,
          name: 'MasterCard Ending in 7155',
          date: '05/2023',
          description: (
            <Card>
              <div className='payment-container'>
                <div className='card-name-div'>
                  <Paragraph className='card-name'>Name on card</Paragraph>
                  <Paragraph>Alex Costa</Paragraph>
                </div>
                <div className='billing-address-div'>
                  <Paragraph className='billing-address'>
                    Billing address
                  </Paragraph>
                  <Paragraph className='billing-name'>Alex Costa</Paragraph>
                  <Paragraph>1005 Macon Hwy</Paragraph>
                  <Paragraph>Athens GA</Paragraph>
                  <Paragraph>30606</Paragraph>
                </div>
              </div>
            </Card>
          ),
        },
        {
          key: 1,
          name: 'Visa Ending in 2081',
          date: '06/2021',
          description: (
            <Card>
              <div className='payment-container'>
                <div className='card-name-div'>
                  <Paragraph className='card-name'>Name on card</Paragraph>
                  <Paragraph>Alex Costa</Paragraph>
                </div>
                <div className='billing-address-div'>
                  <Paragraph className='billing-address'>
                    Billing address
                  </Paragraph>
                  <Paragraph className='billing-name'>Alex Costa</Paragraph>
                  <Paragraph>1005 Macon Hwy</Paragraph>
                  <Paragraph>Athens GA</Paragraph>
                  <Paragraph>30606</Paragraph>
                </div>
              </div>
            </Card>
          ),
        },
      ],
      count: 2,
    };
  }

  handleDelete = (key) => {
    const dataSource = [...this.state.dataSource];
    this.setState({
      dataSource: dataSource.filter((item) => item.key !== key),
    });
  };
  handleAdd = () => {
    const { count, dataSource } = this.state;
    const newData = {
      key: count,
      name:
        'Card Ending in' +
        document.getElementById('card-form').elements[0].value +
        '',
      date: '' + document.getElementById('card-form').elements[2].value,
      description: (
        <Card>
          <div className='payment-container'>
            <div className='card-name-div'>
              <Paragraph className='card-name'>Name on card</Paragraph>
              <Paragraph>
                {document.getElementById('card-form').elements[1].value}
              </Paragraph>
            </div>
            <div className='billing-address-div'>
              <Paragraph className='billing-address'>Billing address</Paragraph>
              <Paragraph className='billing-name'>
                {document.getElementById('address-form').elements[0].value +
                  ' ' +
                  document.getElementById('address-form').elements[1].value}
              </Paragraph>
              <Paragraph>
                {document.getElementById('address-form').elements[2].value}
              </Paragraph>
              <Paragraph>
                {document.getElementById('address-form').elements[4].value +
                  ' ' +
                  document.getElementById('address-form').elements[5].value}
              </Paragraph>
              <Paragraph>
                {document.getElementById('address-form').elements[6].value}
              </Paragraph>
            </div>
          </div>
        </Card>
      ),
    };
    this.setState({
      dataSource: [...dataSource, newData],
      count: count + 1,
    });
    notification.open({
      message: 'Card Added!',
      onClick: () => {
        console.log('Notification Clicked!');
      },
    });
  };

  handleSave = (row) => {
    const newData = [...this.state.dataSource];
    const index = newData.findIndex((item) => row.key === item.key);
    const item = newData[index];
    newData.splice(index, 1, { ...item, ...row });
    this.setState({
      dataSource: newData,
    });
  };

  render() {
    const { dataSource } = this.state;
    const columns = this.columns.map((col) => {
      if (!col.editable) {
        return col;
      }

      return {
        ...col,
        onCell: (record) => ({
          record,
          editable: col.editable,
          dataIndex: col.dataIndex,
          title: col.title,
          handleSave: this.handleSave,
        }),
      };
    });
    return (
      <div>
        <Table
          //components={components}
          rowClassName={() => 'editable-row'}
          bordered
          dataSource={dataSource}
          expandable={{
            expandedRowRender: (record) => (
              <p style={{ margin: 0 }}>{record.description}</p>
            ),
            rowExpandable: (record) => record.name !== 'Not Expandable',
          }}
          columns={columns}
        />

        <Card title='Add New Debit/Credit Card'>
          <PaymentForm />
        </Card>
        <Button
          onClick={this.handleAdd}
          type='primary'
          style={{
            marginTop: 16,
            float: 'right',
          }}>
          Add Payment Method
        </Button>
      </div>
    );
  }
}

class PaymentForm extends React.Component {
  state = {
    cvc: '',
    expiry: '',
    focus: '',
    name: '',
    number: '',
  };

  handleInputFocus = (e) => {
    this.setState({ focus: e.target.name });
  };

  handleInputChange = (e) => {
    const { name, value } = e.target;

    this.setState({ [name]: value });
  };

  render() {
    return (
      <Card className='payment-form'>
        <div id='PaymentForm'>
          <Space>
            <Card className='add-card'>
              <Cards
                cvc={this.state.cvc}
                expiry={this.state.expiry}
                focused={this.state.focus}
                name={this.state.name}
                number={this.state.number}
                issuer={this.state.issuer}
              />
            </Card>
            <Card bordered={false}>
              <Form id='card-form' onFinish={onFinish}>
                <Space direction='vertical'>
                  <Form.Item>
                    <Input
                      id='card-number'
                      type='tel'
                      name='number'
                      placeholder='Card Number'
                      onChange={this.handleInputChange}
                      onFocus={this.handleInputFocus}
                    />
                  </Form.Item>
                  <Form.Item>
                    <Input
                      id='card-name'
                      name='name'
                      placeholder='Name'
                      onChange={this.handleInputChange}
                      onFocus={this.handleInputFocus}
                    />
                  </Form.Item>
                  <Space>
                    <Form.Item>
                      <Input
                        id='exp-date'
                        type='date'
                        name='expiry'
                        placeholder='Valid Thru'
                        onChange={this.handleInputChange}
                        onFocus={this.handleInputFocus}
                      />
                    </Form.Item>
                    <Form.Item>
                      <Input
                        id='card-cvc'
                        type='tel'
                        name='cvc'
                        placeholder='CVC'
                        onChange={this.handleInputChange}
                        onFocus={this.handleInputFocus}
                      />
                    </Form.Item>
                  </Space>
                </Space>
              </Form>
            </Card>
          </Space>
          <Card title='Billing Address'>
            <Form layout='vertical' id='address-form'>
              <Form.Item
                label='First Name'
                rules={[
                  {
                    required: true,
                    message: 'Please input your first name!',
                  },
                ]}>
                <Input />
              </Form.Item>
              <Form.Item
                label='Last Name'
                rules={[
                  {
                    required: true,
                    message: 'Please input your last name!',
                  },
                ]}>
                <Input />
              </Form.Item>
              <Form.Item
                label='Street Address'
                rules={[
                  {
                    required: true,
                    message: 'Please input your street address!',
                  },
                ]}>
                <Input id='billing-street' placeholder='input placeholder' />
              </Form.Item>
              <Form.Item label='Street Address Line 2'>
                <Input placeholder='input placeholder' />
              </Form.Item>
              <Form.Item
                rules={[
                  {
                    required: true,
                    message: 'Please input your city!',
                  },
                ]}>
                <Space direction='horizontal'>
                  <Form.Item label='City'>
                    <Input id='billing-city' placeholder='input placeholder' />
                  </Form.Item>
                  <Form.Item
                    label='State/Province'
                    rules={[
                      {
                        required: true,
                        message: 'Please input your state!',
                      },
                    ]}>
                    <Input id='billing-state' placeholder='input placeholder' />
                  </Form.Item>
                </Space>
              </Form.Item>
              <Form.Item
                rules={[
                  {
                    required: true,
                    message: 'Please input your zip code!',
                  },
                ]}>
                <Space direction='horizontal'>
                  <Form.Item label='Postal/ZipCode'>
                    <Input id='billing-zip' placeholder='input placeholder' />
                  </Form.Item>
                  <Form.Item id='billing-country' label='Country'>
                    <Select
                      placeholder='Select province'
                      defaultValue='United States of America'>
                      <option value='Afganistan'>Afghanistan</option>
                      <option value='Albania'>Albania</option>
                      <option value='Algeria'>Algeria</option>
                      <option value='American Samoa'>American Samoa</option>
                      <option value='Andorra'>Andorra</option>
                      <option value='Angola'>Angola</option>
                      <option value='Anguilla'>Anguilla</option>
                      <option value='Antigua/Barbuda'>Antigua/Barbuda</option>
                      <option value='Argentina'>Argentina</option>
                      <option value='Armenia'>Armenia</option>
                      <option value='Aruba'>Aruba</option>
                      <option value='Australia'>Australia</option>
                      <option value='Austria'>Austria</option>
                      <option value='Azerbaijan'>Azerbaijan</option>
                      <option value='Bahamas'>Bahamas</option>
                      <option value='Bahrain'>Bahrain</option>
                      <option value='Bangladesh'>Bangladesh</option>
                      <option value='Barbados'>Barbados</option>
                      <option value='Belarus'>Belarus</option>
                      <option value='Belgium'>Belgium</option>
                      <option value='Belize'>Belize</option>
                      <option value='Benin'>Benin</option>
                      <option value='Bermuda'>Bermuda</option>
                      <option value='Bhutan'>Bhutan</option>
                      <option value='Bolivia'>Bolivia</option>
                      <option value='Bonaire'>Bonaire</option>
                      <option value='Bosnia/Herzegovina'>
                        Bosnia/Herzegovina
                      </option>
                      <option value='Botswana'>Botswana</option>
                      <option value='Brazil'>Brazil</option>
                      <option value='British Indian Ocean Ter'>
                        British Indian Ocean Ter
                      </option>
                      <option value='Brunei'>Brunei</option>
                      <option value='Bulgaria'>Bulgaria</option>
                      <option value='Burkina Faso'>Burkina Faso</option>
                      <option value='Burundi'>Burundi</option>
                      <option value='Cambodia'>Cambodia</option>
                      <option value='Cameroon'>Cameroon</option>
                      <option value='Canada'>Canada</option>
                      <option value='Canary Islands'>Canary Islands</option>
                      <option value='Cape Verde'>Cape Verde</option>
                      <option value='Cayman Islands'>Cayman Islands</option>
                      <option value='Central African Republic'>
                        Central African Republic
                      </option>
                      <option value='Chad'>Chad</option>
                      <option value='Channel Islands'>Channel Islands</option>
                      <option value='Chile'>Chile</option>
                      <option value='China'>China</option>
                      <option value='Christmas Island'>Christmas Island</option>
                      <option value='Cocos Island'>Cocos Island</option>
                      <option value='Colombia'>Colombia</option>
                      <option value='Comoros'>Comoros</option>
                      <option value='Congo'>Congo</option>
                      <option value='Cook Islands'>Cook Islands</option>
                      <option value='Costa Rica'>Costa Rica</option>
                      <option value='Cote DIvoire'>Cote DIvoire</option>
                      <option value='Croatia'>Croatia</option>
                      <option value='Cuba'>Cuba</option>
                      <option value='Curaco'>Curacao</option>
                      <option value='Cyprus'>Cyprus</option>
                      <option value='Czech Republic'>Czech Republic</option>
                      <option value='Denmark'>Denmark</option>
                      <option value='Djibouti'>Djibouti</option>
                      <option value='Dominica'>Dominica</option>
                      <option value='Dominican Republic'>
                        Dominican Republic
                      </option>
                      <option value='East Timor'>East Timor</option>
                      <option value='Ecuador'>Ecuador</option>
                      <option value='Egypt'>Egypt</option>
                      <option value='El Salvador'>El Salvador</option>
                      <option value='Equatorial Guinea'>
                        Equatorial Guinea
                      </option>
                      <option value='Eritrea'>Eritrea</option>
                      <option value='Estonia'>Estonia</option>
                      <option value='Ethiopia'>Ethiopia</option>
                      <option value='Falkland Islands'>Falkland Islands</option>
                      <option value='Faroe Islands'>Faroe Islands</option>
                      <option value='Fiji'>Fiji</option>
                      <option value='Finland'>Finland</option>
                      <option value='France'>France</option>
                      <option value='French Guiana'>French Guiana</option>
                      <option value='French Polynesia'>French Polynesia</option>
                      <option value='French Southern Ter'>
                        French Southern Ter
                      </option>
                      <option value='Gabon'>Gabon</option>
                      <option value='Gambia'>Gambia</option>
                      <option value='Georgia'>Georgia</option>
                      <option value='Germany'>Germany</option>
                      <option value='Ghana'>Ghana</option>
                      <option value='Gibraltar'>Gibraltar</option>
                      <option value='Great Britain'>Great Britain</option>
                      <option value='Greece'>Greece</option>
                      <option value='Greenland'>Greenland</option>
                      <option value='Grenada'>Grenada</option>
                      <option value='Guadeloupe'>Guadeloupe</option>
                      <option value='Guam'>Guam</option>
                      <option value='Guatemala'>Guatemala</option>
                      <option value='Guinea'>Guinea</option>
                      <option value='Guyana'>Guyana</option>
                      <option value='Haiti'>Haiti</option>
                      <option value='Hawaii'>Hawaii</option>
                      <option value='Honduras'>Honduras</option>
                      <option value='Hong Kong'>Hong Kong</option>
                      <option value='Hungary'>Hungary</option>
                      <option value='Iceland'>Iceland</option>
                      <option value='Indonesia'>Indonesia</option>
                      <option value='India'>India</option>
                      <option value='Iran'>Iran</option>
                      <option value='Iraq'>Iraq</option>
                      <option value='Ireland'>Ireland</option>
                      <option value='Isle of Man'>Isle of Man</option>
                      <option value='Israel'>Israel</option>
                      <option value='Italy'>Italy</option>
                      <option value='Jamaica'>Jamaica</option>
                      <option value='Japan'>Japan</option>
                      <option value='Jordan'>Jordan</option>
                      <option value='Kazakhstan'>Kazakhstan</option>
                      <option value='Kenya'>Kenya</option>
                      <option value='Kiribati'>Kiribati</option>
                      <option value='Korea North'>Korea North</option>
                      <option value='Korea Sout'>Korea South</option>
                      <option value='Kuwait'>Kuwait</option>
                      <option value='Kyrgyzstan'>Kyrgyzstan</option>
                      <option value='Laos'>Laos</option>
                      <option value='Latvia'>Latvia</option>
                      <option value='Lebanon'>Lebanon</option>
                      <option value='Lesotho'>Lesotho</option>
                      <option value='Liberia'>Liberia</option>
                      <option value='Libya'>Libya</option>
                      <option value='Liechtenstein'>Liechtenstein</option>
                      <option value='Lithuania'>Lithuania</option>
                      <option value='Luxembourg'>Luxembourg</option>
                      <option value='Macau'>Macau</option>
                      <option value='Macedonia'>Macedonia</option>
                      <option value='Madagascar'>Madagascar</option>
                      <option value='Malaysia'>Malaysia</option>
                      <option value='Malawi'>Malawi</option>
                      <option value='Maldives'>Maldives</option>
                      <option value='Mali'>Mali</option>
                      <option value='Malta'>Malta</option>
                      <option value='Marshall Islands'>Marshall Islands</option>
                      <option value='Martinique'>Martinique</option>
                      <option value='Mauritania'>Mauritania</option>
                      <option value='Mauritius'>Mauritius</option>
                      <option value='Mayotte'>Mayotte</option>
                      <option value='Mexico'>Mexico</option>
                      <option value='Midway Islands'>Midway Islands</option>
                      <option value='Moldova'>Moldova</option>
                      <option value='Monaco'>Monaco</option>
                      <option value='Mongolia'>Mongolia</option>
                      <option value='Montserrat'>Montserrat</option>
                      <option value='Morocco'>Morocco</option>
                      <option value='Mozambique'>Mozambique</option>
                      <option value='Myanmar'>Myanmar</option>
                      <option value='Nambia'>Nambia</option>
                      <option value='Nauru'>Nauru</option>
                      <option value='Nepal'>Nepal</option>
                      <option value='Netherland Antilles'>
                        Netherland Antilles
                      </option>
                      <option value='Netherlands'>
                        Netherlands (Holland, Europe)
                      </option>
                      <option value='Nevis'>Nevis</option>
                      <option value='New Caledonia'>New Caledonia</option>
                      <option value='New Zealand'>New Zealand</option>
                      <option value='Nicaragua'>Nicaragua</option>
                      <option value='Niger'>Niger</option>
                      <option value='Nigeria'>Nigeria</option>
                      <option value='Niue'>Niue</option>
                      <option value='Norfolk Island'>Norfolk Island</option>
                      <option value='Norway'>Norway</option>
                      <option value='Oman'>Oman</option>
                      <option value='Pakistan'>Pakistan</option>
                      <option value='Palau Island'>Palau Island</option>
                      <option value='Palestine'>Palestine</option>
                      <option value='Panama'>Panama</option>
                      <option value='Papua New Guinea'>Papua New Guinea</option>
                      <option value='Paraguay'>Paraguay</option>
                      <option value='Peru'>Peru</option>
                      <option value='Phillipines'>Philippines</option>
                      <option value='Pitcairn Island'>Pitcairn Island</option>
                      <option value='Poland'>Poland</option>
                      <option value='Portugal'>Portugal</option>
                      <option value='Puerto Rico'>Puerto Rico</option>
                      <option value='Qatar'>Qatar</option>
                      <option value='Republic of Montenegro'>
                        Republic of Montenegro
                      </option>
                      <option value='Republic of Serbia'>
                        Republic of Serbia
                      </option>
                      <option value='Reunion'>Reunion</option>
                      <option value='Romania'>Romania</option>
                      <option value='Russia'>Russia</option>
                      <option value='Rwanda'>Rwanda</option>
                      <option value='St Barthelemy'>St Barthelemy</option>
                      <option value='St Eustatius'>St Eustatius</option>
                      <option value='St Helena'>St Helena</option>
                      <option value='St Kitts-Nevis'>St Kitts-Nevis</option>
                      <option value='St Lucia'>St Lucia</option>
                      <option value='St Maarten'>St Maarten</option>
                      <option value='St Pierre/Miquelon'>
                        St Pierre/Miquelon
                      </option>
                      <option value='St Vincent/Grenadines'>
                        St Vincent/Grenadines
                      </option>
                      <option value='Saipan'>Saipan</option>
                      <option value='Samoa'>Samoa</option>
                      <option value='Samoa American'>Samoa American</option>
                      <option value='San Marino'>San Marino</option>
                      <option value='Sao Tome/Principe'>
                        Sao Tome/Principe
                      </option>
                      <option value='Saudi Arabia'>Saudi Arabia</option>
                      <option value='Senegal'>Senegal</option>
                      <option value='Seychelles'>Seychelles</option>
                      <option value='Sierra Leone'>Sierra Leone</option>
                      <option value='Singapore'>Singapore</option>
                      <option value='Slovakia'>Slovakia</option>
                      <option value='Slovenia'>Slovenia</option>
                      <option value='Solomon Islands'>Solomon Islands</option>
                      <option value='Somalia'>Somalia</option>
                      <option value='South Africa'>South Africa</option>
                      <option value='Spain'>Spain</option>
                      <option value='Sri Lanka'>Sri Lanka</option>
                      <option value='Sudan'>Sudan</option>
                      <option value='Suriname'>Suriname</option>
                      <option value='Swaziland'>Swaziland</option>
                      <option value='Sweden'>Sweden</option>
                      <option value='Switzerland'>Switzerland</option>
                      <option value='Syria'>Syria</option>
                      <option value='Tahiti'>Tahiti</option>
                      <option value='Taiwan'>Taiwan</option>
                      <option value='Tajikistan'>Tajikistan</option>
                      <option value='Tanzania'>Tanzania</option>
                      <option value='Thailand'>Thailand</option>
                      <option value='Togo'>Togo</option>
                      <option value='Tokelau'>Tokelau</option>
                      <option value='Tonga'>Tonga</option>
                      <option value='Trinidad/Tobago'>Trinidad/Tobago</option>
                      <option value='Tunisia'>Tunisia</option>
                      <option value='Turkey'>Turkey</option>
                      <option value='Turkmenistan'>Turkmenistan</option>
                      <option value='Turks/Caicos Is'>Turks/Caicos Is</option>
                      <option value='Tuvalu'>Tuvalu</option>
                      <option value='Uganda'>Uganda</option>
                      <option value='United Kingdom'>United Kingdom</option>
                      <option value='Ukraine'>Ukraine</option>
                      <option value='United Arab Erimates'>
                        United Arab Emirates
                      </option>
                      <option value='United States of America'>
                        United States of America
                      </option>
                      <option value='Uraguay'>Uruguay</option>
                      <option value='Uzbekistan'>Uzbekistan</option>
                      <option value='Vanuatu'>Vanuatu</option>
                      <option value='Vatican City State'>
                        Vatican City State
                      </option>
                      <option value='Venezuela'>Venezuela</option>
                      <option value='Vietnam'>Vietnam</option>
                      <option value='Virgin Islands (Brit)'>
                        Virgin Islands (Brit)
                      </option>
                      <option value='Virgin Islands (USA)'>
                        Virgin Islands (USA)
                      </option>
                      <option value='Wake Island'>Wake Island</option>
                      <option value='Wallis/Futana Is'>Wallis/Futana Is</option>
                      <option value='Yemen'>Yemen</option>
                      <option value='Zaire'>Zaire</option>
                      <option value='Zambia'>Zambia</option>
                      <option value='Zimbabwe'>Zimbabwe</option>
                    </Select>
                  </Form.Item>
                </Space>
              </Form.Item>
            </Form>
          </Card>
        </div>
      </Card>
    );
  }
}

function Profile(props) {
  const [selectedMenuItem, setSelectedMenuItem] = useState('1');
  const [selectedMenuItem1, setSelectedMenuItem1] = useState('1');
  const [form] = Form.useForm();

  const menuSwitch = (key) => {
    switch (key) {
      case '1':
        return (
          <Card
            title='Personal Info'
            icon={<UserOutlined />}
            extra={
              <Button type='primary' htmlType='submit' onClick={editProfile}>
                Edit Personal Info{' '}
              </Button>
            }>
            <Card type='inner' title='First Name'>
              <Form>
                <Form.Item
                  label='First Name'
                  name='firstName'
                  rules={[
                    {
                      required: true,
                      message: 'Please input your first name!',
                    },
                  ]}>
                  <Input id='first-name' defaultValue='Alex' readOnly />
                </Form.Item>
              </Form>
            </Card>
            <Card style={{ marginTop: 16 }} type='inner' title='Last Name'>
              <Form>
                <Form.Item
                  label='Last Name'
                  name='lastName'
                  rules={[
                    {
                      required: true,
                      message: 'Please input your last name!',
                    },
                  ]}>
                  <Input id='last-name' defaultValue='Costa' readOnly />
                </Form.Item>
              </Form>
            </Card>
            <Card style={{ marginTop: 16 }} type='inner' title='Email'>
              <Form>
                <Form.Item
                  label='E-mail'
                  name='emailAddress'
                  rules={[
                    {
                      type: 'email',
                      message: 'The input is not valid E-mail!',
                    },
                  ]}>
                  <Input
                    id='email'
                    defaultValue='alexcosta@example.com'
                    readOnly
                  />
                </Form.Item>
              </Form>
            </Card>
            <Space style={{ marginTop: 16 }}>
              <Button
                type='primary'
                htmlType='submit'
                onClick={submitEditProfile}>
                Submit{' '}
              </Button>
            </Space>
          </Card>
        );
      case '2':
        return (
          <Card title='Change Password'>
            <Card type='inner' title='Current Password'>
              <Space direction='vertical'>
                <Input.Password
                  placeholder='input password'
                  iconRender={(visible) =>
                    visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                  }
                />
              </Space>
            </Card>
            <Card style={{ marginTop: 16 }} type='inner' title='New Password'>
              <Space direction='vertical'>
                <Form>
                  <Form.Item
                    name='password'
                    label='New Password'
                    rules={[
                      {
                        required: true,
                        message: 'Please input your password!',
                      },
                    ]}
                    hasFeedback>
                    <Input.Password />
                  </Form.Item>
                  <Form.Item
                    name='confirm'
                    label='Confirm Password'
                    dependencies={['password']}
                    hasFeedback
                    rules={[
                      {
                        required: true,
                        message: 'Please confirm your password!',
                      },
                      ({ getFieldValue }) => ({
                        validator(rule, value) {
                          if (!value || getFieldValue('password') === value) {
                            return Promise.resolve();
                          }
                          return Promise.reject(
                            'The two passwords that you entered do not match!'
                          );
                        },
                      }),
                    ]}>
                    <Input.Password />
                  </Form.Item>
                </Form>
              </Space>
            </Card>
            <Space style={{ marginTop: 16 }}>
              <Button
                type='primary'
                htmlType='submit'
                onClick={passwordNotification}>
                Change Password{' '}
              </Button>
            </Space>
          </Card>
        );
      case '3':
        return (
          <div>
            <Card title='Payment Method'>
              <EditableTable />
            </Card>
          </div>
        );
      case '4':
        return (
          <Card
            title='Address'
            extra={
              <Button type='primary' htmlType='submit' onClick={editAddress}>
                Edit Address{' '}
              </Button>
            }>
            <Form form={form} layout='vertical' id='address-form'>
              <Form.Item label='Street Address'>
                <Input
                  id='street'
                  defaultValue='1005 Macon Hwy'
                  placeholder='input placeholder'
                  readOnly
                />
              </Form.Item>
              <Form.Item label='Street Address Line 2'>
                <Input placeholder='input placeholder' />
              </Form.Item>
              <Form.Item>
                <Space direction='horizontal'>
                  <Form.Item label='City'>
                    <Input
                      id='city'
                      defaultValue='Athens'
                      placeholder='input placeholder'
                      readOnly
                    />
                  </Form.Item>
                  <Form.Item label='State/Province'>
                    <Input
                      id='state'
                      defaultValue='GA'
                      placeholder='input placeholder'
                      readOnly
                    />
                  </Form.Item>
                </Space>
              </Form.Item>
              <Form.Item>
                <Space direction='horizontal'>
                  <Form.Item label='Postal/ZipCode'>
                    <Input
                      id='zip'
                      defaultValue='30606'
                      placeholder='input placeholder'
                      readOnly
                    />
                  </Form.Item>
                  <Form.Item label='Country'>
                    <Select
                      id='country'
                      placeholder='Select province'
                      defaultValue='United States of America'>
                      <option value='Afganistan'>Afghanistan</option>
                      <option value='Albania'>Albania</option>
                      <option value='Algeria'>Algeria</option>
                      <option value='American Samoa'>American Samoa</option>
                      <option value='Andorra'>Andorra</option>
                      <option value='Angola'>Angola</option>
                      <option value='Anguilla'>Anguilla</option>
                      <option value='Antigua/Barbuda'>Antigua/Barbuda</option>
                      <option value='Argentina'>Argentina</option>
                      <option value='Armenia'>Armenia</option>
                      <option value='Aruba'>Aruba</option>
                      <option value='Australia'>Australia</option>
                      <option value='Austria'>Austria</option>
                      <option value='Azerbaijan'>Azerbaijan</option>
                      <option value='Bahamas'>Bahamas</option>
                      <option value='Bahrain'>Bahrain</option>
                      <option value='Bangladesh'>Bangladesh</option>
                      <option value='Barbados'>Barbados</option>
                      <option value='Belarus'>Belarus</option>
                      <option value='Belgium'>Belgium</option>
                      <option value='Belize'>Belize</option>
                      <option value='Benin'>Benin</option>
                      <option value='Bermuda'>Bermuda</option>
                      <option value='Bhutan'>Bhutan</option>
                      <option value='Bolivia'>Bolivia</option>
                      <option value='Bonaire'>Bonaire</option>
                      <option value='Bosnia/Herzegovina'>
                        Bosnia/Herzegovina
                      </option>
                      <option value='Botswana'>Botswana</option>
                      <option value='Brazil'>Brazil</option>
                      <option value='British Indian Ocean Ter'>
                        British Indian Ocean Ter
                      </option>
                      <option value='Brunei'>Brunei</option>
                      <option value='Bulgaria'>Bulgaria</option>
                      <option value='Burkina Faso'>Burkina Faso</option>
                      <option value='Burundi'>Burundi</option>
                      <option value='Cambodia'>Cambodia</option>
                      <option value='Cameroon'>Cameroon</option>
                      <option value='Canada'>Canada</option>
                      <option value='Canary Islands'>Canary Islands</option>
                      <option value='Cape Verde'>Cape Verde</option>
                      <option value='Cayman Islands'>Cayman Islands</option>
                      <option value='Central African Republic'>
                        Central African Republic
                      </option>
                      <option value='Chad'>Chad</option>
                      <option value='Channel Islands'>Channel Islands</option>
                      <option value='Chile'>Chile</option>
                      <option value='China'>China</option>
                      <option value='Christmas Island'>Christmas Island</option>
                      <option value='Cocos Island'>Cocos Island</option>
                      <option value='Colombia'>Colombia</option>
                      <option value='Comoros'>Comoros</option>
                      <option value='Congo'>Congo</option>
                      <option value='Cook Islands'>Cook Islands</option>
                      <option value='Costa Rica'>Costa Rica</option>
                      <option value='Cote DIvoire'>Cote DIvoire</option>
                      <option value='Croatia'>Croatia</option>
                      <option value='Cuba'>Cuba</option>
                      <option value='Curaco'>Curacao</option>
                      <option value='Cyprus'>Cyprus</option>
                      <option value='Czech Republic'>Czech Republic</option>
                      <option value='Denmark'>Denmark</option>
                      <option value='Djibouti'>Djibouti</option>
                      <option value='Dominica'>Dominica</option>
                      <option value='Dominican Republic'>
                        Dominican Republic
                      </option>
                      <option value='East Timor'>East Timor</option>
                      <option value='Ecuador'>Ecuador</option>
                      <option value='Egypt'>Egypt</option>
                      <option value='El Salvador'>El Salvador</option>
                      <option value='Equatorial Guinea'>
                        Equatorial Guinea
                      </option>
                      <option value='Eritrea'>Eritrea</option>
                      <option value='Estonia'>Estonia</option>
                      <option value='Ethiopia'>Ethiopia</option>
                      <option value='Falkland Islands'>Falkland Islands</option>
                      <option value='Faroe Islands'>Faroe Islands</option>
                      <option value='Fiji'>Fiji</option>
                      <option value='Finland'>Finland</option>
                      <option value='France'>France</option>
                      <option value='French Guiana'>French Guiana</option>
                      <option value='French Polynesia'>French Polynesia</option>
                      <option value='French Southern Ter'>
                        French Southern Ter
                      </option>
                      <option value='Gabon'>Gabon</option>
                      <option value='Gambia'>Gambia</option>
                      <option value='Georgia'>Georgia</option>
                      <option value='Germany'>Germany</option>
                      <option value='Ghana'>Ghana</option>
                      <option value='Gibraltar'>Gibraltar</option>
                      <option value='Great Britain'>Great Britain</option>
                      <option value='Greece'>Greece</option>
                      <option value='Greenland'>Greenland</option>
                      <option value='Grenada'>Grenada</option>
                      <option value='Guadeloupe'>Guadeloupe</option>
                      <option value='Guam'>Guam</option>
                      <option value='Guatemala'>Guatemala</option>
                      <option value='Guinea'>Guinea</option>
                      <option value='Guyana'>Guyana</option>
                      <option value='Haiti'>Haiti</option>
                      <option value='Hawaii'>Hawaii</option>
                      <option value='Honduras'>Honduras</option>
                      <option value='Hong Kong'>Hong Kong</option>
                      <option value='Hungary'>Hungary</option>
                      <option value='Iceland'>Iceland</option>
                      <option value='Indonesia'>Indonesia</option>
                      <option value='India'>India</option>
                      <option value='Iran'>Iran</option>
                      <option value='Iraq'>Iraq</option>
                      <option value='Ireland'>Ireland</option>
                      <option value='Isle of Man'>Isle of Man</option>
                      <option value='Israel'>Israel</option>
                      <option value='Italy'>Italy</option>
                      <option value='Jamaica'>Jamaica</option>
                      <option value='Japan'>Japan</option>
                      <option value='Jordan'>Jordan</option>
                      <option value='Kazakhstan'>Kazakhstan</option>
                      <option value='Kenya'>Kenya</option>
                      <option value='Kiribati'>Kiribati</option>
                      <option value='Korea North'>Korea North</option>
                      <option value='Korea Sout'>Korea South</option>
                      <option value='Kuwait'>Kuwait</option>
                      <option value='Kyrgyzstan'>Kyrgyzstan</option>
                      <option value='Laos'>Laos</option>
                      <option value='Latvia'>Latvia</option>
                      <option value='Lebanon'>Lebanon</option>
                      <option value='Lesotho'>Lesotho</option>
                      <option value='Liberia'>Liberia</option>
                      <option value='Libya'>Libya</option>
                      <option value='Liechtenstein'>Liechtenstein</option>
                      <option value='Lithuania'>Lithuania</option>
                      <option value='Luxembourg'>Luxembourg</option>
                      <option value='Macau'>Macau</option>
                      <option value='Macedonia'>Macedonia</option>
                      <option value='Madagascar'>Madagascar</option>
                      <option value='Malaysia'>Malaysia</option>
                      <option value='Malawi'>Malawi</option>
                      <option value='Maldives'>Maldives</option>
                      <option value='Mali'>Mali</option>
                      <option value='Malta'>Malta</option>
                      <option value='Marshall Islands'>Marshall Islands</option>
                      <option value='Martinique'>Martinique</option>
                      <option value='Mauritania'>Mauritania</option>
                      <option value='Mauritius'>Mauritius</option>
                      <option value='Mayotte'>Mayotte</option>
                      <option value='Mexico'>Mexico</option>
                      <option value='Midway Islands'>Midway Islands</option>
                      <option value='Moldova'>Moldova</option>
                      <option value='Monaco'>Monaco</option>
                      <option value='Mongolia'>Mongolia</option>
                      <option value='Montserrat'>Montserrat</option>
                      <option value='Morocco'>Morocco</option>
                      <option value='Mozambique'>Mozambique</option>
                      <option value='Myanmar'>Myanmar</option>
                      <option value='Nambia'>Nambia</option>
                      <option value='Nauru'>Nauru</option>
                      <option value='Nepal'>Nepal</option>
                      <option value='Netherland Antilles'>
                        Netherland Antilles
                      </option>
                      <option value='Netherlands'>
                        Netherlands (Holland, Europe)
                      </option>
                      <option value='Nevis'>Nevis</option>
                      <option value='New Caledonia'>New Caledonia</option>
                      <option value='New Zealand'>New Zealand</option>
                      <option value='Nicaragua'>Nicaragua</option>
                      <option value='Niger'>Niger</option>
                      <option value='Nigeria'>Nigeria</option>
                      <option value='Niue'>Niue</option>
                      <option value='Norfolk Island'>Norfolk Island</option>
                      <option value='Norway'>Norway</option>
                      <option value='Oman'>Oman</option>
                      <option value='Pakistan'>Pakistan</option>
                      <option value='Palau Island'>Palau Island</option>
                      <option value='Palestine'>Palestine</option>
                      <option value='Panama'>Panama</option>
                      <option value='Papua New Guinea'>Papua New Guinea</option>
                      <option value='Paraguay'>Paraguay</option>
                      <option value='Peru'>Peru</option>
                      <option value='Phillipines'>Philippines</option>
                      <option value='Pitcairn Island'>Pitcairn Island</option>
                      <option value='Poland'>Poland</option>
                      <option value='Portugal'>Portugal</option>
                      <option value='Puerto Rico'>Puerto Rico</option>
                      <option value='Qatar'>Qatar</option>
                      <option value='Republic of Montenegro'>
                        Republic of Montenegro
                      </option>
                      <option value='Republic of Serbia'>
                        Republic of Serbia
                      </option>
                      <option value='Reunion'>Reunion</option>
                      <option value='Romania'>Romania</option>
                      <option value='Russia'>Russia</option>
                      <option value='Rwanda'>Rwanda</option>
                      <option value='St Barthelemy'>St Barthelemy</option>
                      <option value='St Eustatius'>St Eustatius</option>
                      <option value='St Helena'>St Helena</option>
                      <option value='St Kitts-Nevis'>St Kitts-Nevis</option>
                      <option value='St Lucia'>St Lucia</option>
                      <option value='St Maarten'>St Maarten</option>
                      <option value='St Pierre/Miquelon'>
                        St Pierre/Miquelon
                      </option>
                      <option value='St Vincent/Grenadines'>
                        St Vincent/Grenadines
                      </option>
                      <option value='Saipan'>Saipan</option>
                      <option value='Samoa'>Samoa</option>
                      <option value='Samoa American'>Samoa American</option>
                      <option value='San Marino'>San Marino</option>
                      <option value='Sao Tome/Principe'>
                        Sao Tome/Principe
                      </option>
                      <option value='Saudi Arabia'>Saudi Arabia</option>
                      <option value='Senegal'>Senegal</option>
                      <option value='Seychelles'>Seychelles</option>
                      <option value='Sierra Leone'>Sierra Leone</option>
                      <option value='Singapore'>Singapore</option>
                      <option value='Slovakia'>Slovakia</option>
                      <option value='Slovenia'>Slovenia</option>
                      <option value='Solomon Islands'>Solomon Islands</option>
                      <option value='Somalia'>Somalia</option>
                      <option value='South Africa'>South Africa</option>
                      <option value='Spain'>Spain</option>
                      <option value='Sri Lanka'>Sri Lanka</option>
                      <option value='Sudan'>Sudan</option>
                      <option value='Suriname'>Suriname</option>
                      <option value='Swaziland'>Swaziland</option>
                      <option value='Sweden'>Sweden</option>
                      <option value='Switzerland'>Switzerland</option>
                      <option value='Syria'>Syria</option>
                      <option value='Tahiti'>Tahiti</option>
                      <option value='Taiwan'>Taiwan</option>
                      <option value='Tajikistan'>Tajikistan</option>
                      <option value='Tanzania'>Tanzania</option>
                      <option value='Thailand'>Thailand</option>
                      <option value='Togo'>Togo</option>
                      <option value='Tokelau'>Tokelau</option>
                      <option value='Tonga'>Tonga</option>
                      <option value='Trinidad/Tobago'>Trinidad/Tobago</option>
                      <option value='Tunisia'>Tunisia</option>
                      <option value='Turkey'>Turkey</option>
                      <option value='Turkmenistan'>Turkmenistan</option>
                      <option value='Turks/Caicos Is'>Turks/Caicos Is</option>
                      <option value='Tuvalu'>Tuvalu</option>
                      <option value='Uganda'>Uganda</option>
                      <option value='United Kingdom'>United Kingdom</option>
                      <option value='Ukraine'>Ukraine</option>
                      <option value='United Arab Erimates'>
                        United Arab Emirates
                      </option>
                      <option value='United States of America'>
                        United States of America
                      </option>
                      <option value='Uraguay'>Uruguay</option>
                      <option value='Uzbekistan'>Uzbekistan</option>
                      <option value='Vanuatu'>Vanuatu</option>
                      <option value='Vatican City State'>
                        Vatican City State
                      </option>
                      <option value='Venezuela'>Venezuela</option>
                      <option value='Vietnam'>Vietnam</option>
                      <option value='Virgin Islands (Brit)'>
                        Virgin Islands (Brit)
                      </option>
                      <option value='Virgin Islands (USA)'>
                        Virgin Islands (USA)
                      </option>
                      <option value='Wake Island'>Wake Island</option>
                      <option value='Wallis/Futana Is'>Wallis/Futana Is</option>
                      <option value='Yemen'>Yemen</option>
                      <option value='Zaire'>Zaire</option>
                      <option value='Zambia'>Zambia</option>
                      <option value='Zimbabwe'>Zimbabwe</option>
                    </Select>
                  </Form.Item>
                </Space>
              </Form.Item>
              <Form.Item>
                <Button type='primary' onClick={addressNotification}>
                  Update Address
                </Button>
              </Form.Item>
            </Form>
          </Card>
        );
      default:
        break;
    }
  };
  const componentsSwtich = (key) => {
    switch (key) {
      case '1':
        return (
          <Layout>
            <Sider width={200} className='site-layout-background'>
              <Menu
                mode='inline'
                defaultSelectedKeys={['1']}
                defaultOpenKeys={['sub1']}
                style={{ height: '100%', borderRight: 0 }}
                onClick={(e) => setSelectedMenuItem1(e.key)}>
                <Menu.Item key='1' icon={<UserOutlined />}>
                  Personal Information
                </Menu.Item>
                <Menu.Item key='2' icon={<KeyOutlined />}>
                  Security
                </Menu.Item>
                <SubMenu
                  key='sub1'
                  icon={<CreditCardOutlined />}
                  title='Payment Info'>
                  <Menu.Item key='3'>Payment Method</Menu.Item>
                  <Menu.Item key='4'>Update Address</Menu.Item>
                </SubMenu>
              </Menu>
              <Layout style={{ padding: '0 24px 24px' }}>
                <Content
                  className='site-layout-background'
                  style={{
                    padding: 24,
                    margin: 0,
                    minHeight: 280,
                  }}>
                  <div></div>
                </Content>
              </Layout>
            </Sider>
            <Layout style={{ padding: '0 24px 24px' }}>
              <Content
                className='site-layout-background'
                style={{
                  padding: 24,
                  margin: 0,
                  minHeight: 280,
                }}>
                <div>{menuSwitch(selectedMenuItem1)}</div>
              </Content>
            </Layout>
          </Layout>
        );
      default:
        break;
    }
  };

  return (
    <Layout>
      <Header className='header'>
        <Menu
          mode='horizontal'
          defaultSelectedKeys={['1']}
          onClick={(e) => setSelectedMenuItem(e.key)}
          className='profile-nav'>
          <Menu.Item key='1'>Profile</Menu.Item>
        </Menu>
      </Header>
      <Layout style={{ padding: '0 24px 24px' }}>
        <Content
          className='site-layout-background'
          style={{
            padding: 24,
            margin: 0,
            minHeight: 280,
          }}>
          <div>{componentsSwtich(selectedMenuItem)}</div>
        </Content>
      </Layout>
    </Layout>
  );
}
export default Profile;
