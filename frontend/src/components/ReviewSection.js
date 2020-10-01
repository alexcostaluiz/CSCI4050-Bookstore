import './ReviewSection.less';

import React from 'react';

import { Checkbox, Input, List, Rate, Select, Switch, Typography } from 'antd';

import Review, { reviews } from './Review.js';
import Section from './Section.js';

const { Paragraph, Title } = Typography;

function ReviewSection(props) {
  return (
    <Section title='Customer Reviews'>
      <div className='bookstore-reviews-container'>
        <div className='bookstore-reviews-summary-container'>
          <div className='bookstore-reviews-summary'>
            <Paragraph>Review Summary Bar Chart</Paragraph>
          </div>
          <div className='bookstore-reviews-summary'>
            <Paragraph>i'm not sure what goes here yet</Paragraph>
          </div>
        </div>
        <div className='bookstore-reviews-list-container'>
          <div className='bookstore-reviews-list-controls-top'>
            <Input.Search
              className='bookstore-reviews-list-controls-search'
              placeholder='Search for keywords'
            />
            <Paragraph className='bookstore-reviews-list-controls-top-label'>
              Sort By:
            </Paragraph>
            <Select
              className='bookstore-reviews-list-controls-sort'
              defaultValue='-relevant'>
              <Select.Option value='-relevant'>Most Relevant</Select.Option>
              <Select.Option value='-rating'>Highest Rating</Select.Option>
              <Select.Option value='+rating'>Lowest Rating</Select.Option>
              <Select.Option value='-helpful'>Most Helpful</Select.Option>
              <Select.Option value='+helpful'>Least Helpful</Select.Option>
              <Select.Option value='-chrono'>Newest</Select.Option>
              <Select.Option value='+chrono'>Oldest</Select.Option>
            </Select>
          </div>
          <div className='bookstore-reviews-list-wrapper'>
            <div className='bookstore-reviews-list-controls-side'>
              <Title
                className='bookstore-reviews-list-controls-header'
                level={3}>
                Filters
              </Title>
              <Paragraph className='bookstore-reviews-list-controls-radio-label'>
                Hide Any Spoilers
              </Paragraph>
              <Switch className='bookstore-reviews-list-controls-radio' />
              <Paragraph className='bookstore-reviews-list-controls-side-label'>
                Stars
              </Paragraph>
              <Checkbox.Group
                className='bookstore-reviews-list-controls-checkbox-group'
                value={[]}>
                {[5, 4, 3, 2, 1].map((i) => (
                  <Checkbox
                    key={i + ' star'}
                    className='bookstore-reviews-list-controls-checkbox'
                    value={i + ' star'}>
                    <Rate
                      className='bookstore-reviews-list-controls-rating'
                      defaultValue={i}
                      count={i}
                      disabled
                    />
                  </Checkbox>
                ))}
              </Checkbox.Group>
              <Paragraph className='bookstore-reviews-list-controls-side-label'>
                Recommendation
              </Paragraph>
              <Checkbox.Group
                options={['Recommended', 'Not recommended']}
                className='bookstore-reviews-list-controls-checkbox-group'
                value={[]}
              />
            </div>
            <List
              className='bookstore-reviews-list'
              itemLayout='column'
              size='large'
              pagination={{
                pageSize: 3,
                pageSizeOptions: [3, 5, 10, 20, 50],
                hideOnSinglePage: true,
              }}
              dataSource={reviews}
              renderItem={(item) => <Review {...item} />}
            />
          </div>
        </div>
      </div>
    </Section>
  );
}

export default ReviewSection;
