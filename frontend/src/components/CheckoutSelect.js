import './CheckoutSelect.less';

import React, { useState } from 'react';

import { Button, Radio, Typography } from 'antd';

const { Paragraph, Title } = Typography;

function CheckoutSelect(props) {
  const { defaultChoice, choices, renderChoice, renderDefault } = props;

  const [choice, setChoice] = useState(defaultChoice);
  const [choosing, setChoosing] = useState(false);

  return (
    <div className='bookstore-checkout-module-select'>
      {!choosing
        ? [
            renderDefault(choices[choice]),
            <Button
              key='action'
              className='bookstore-checkout-module-select-action'
              onClick={() => setChoosing(true)}
              type='primary'>
              CHANGE
            </Button>,
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
              onClick={() => setChoosing(false)}
              type='primary'>
              SAVE
            </Button>,
            <Button
              key='add'
              className='bookstore-checkout-module-select-action'
              type='link'>
              Add New
            </Button>,
          ]}
    </div>
  );
}

export default CheckoutSelect;
