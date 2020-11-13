import React from 'react';

import { Typography } from 'antd';

const { Text } = Typography;

function Address(props) {
  const {
    name,
    address1,
    address2,
    city,
    state,
    zip,
    country,
    phoneNumber,
  } = props;

  return (
    <div>
      <Text>
        <b>{name}</b>
      </Text>
      <br />
      <Text>{address1}</Text>
      <br />
      {address2 && [<Text key='a2'>{address2}</Text>, <br key='br1' />]}
      <Text>
        {city}, {state} {zip}
      </Text>
      <br />
      <Text>{country}</Text>
      <br />
      {phoneNumber && [<Text key='ph'>Phone number: {phoneNumber}</Text>, <br key='br2' />]}
    </div>
  );
}

export default Address;
