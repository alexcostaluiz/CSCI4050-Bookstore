import './BrowsePage.less';

import React, { useEffect, useState } from 'react';

import { useHistory } from 'react-router-dom';

import {
  Breadcrumb,
  Col,
  InputNumber,
  Row,
  Select,
  Spin,
  Typography,
} from 'antd';

import dayjs from 'dayjs';

import BookThumbnail from '../components/BookThumbnail.js';
import DB from '../services/DatabaseService.js';

const { Title, Text } = Typography;

function BrowsePage(props) {
  const { title = 'Browse Product Catalog', results } = props;

  const history = useHistory();

  const [books, setBooks] = useState([]);
  const [sort, setSort] = useState('title-desc');
  const [categories, setCategories] = useState([]);
  const [tags, setTags] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);

  const [priceLow, setPriceLow] = useState(Number.NEGATIVE_INFINITY);
  const [priceHigh, setPriceHigh] = useState(Number.POSITIVE_INFINITY);

  useEffect(() => {
    (async () => {
      const categories = await DB.retrieveCategories();
      const tags = await DB.retrieveTags();
      setCategories(categories);
      setTags(tags);
    })();
  }, []);

  useEffect(() => {
    if (results) {
      setBooks(results);
    } else {
      (async () => {
        const books = await DB.retrieveBooks();
        setBooks(books.filter((b) => !b.archived));
      })();
    }
  }, [results]);

  const sorts = {
    'title-desc': (a, b) => {
      if (a.title < b.title) return -1;
      if (a.title > b.title) return 1;
      return 0;
    },
    'title-asc': (a, b) => {
      if (a.title < b.title) return 1;
      if (a.title > b.title) return -1;
      return 0;
    },
    'price-desc': (a, b) => {
      return b.sellPrice - a.sellPrice;
    },
    'price-asc': (a, b) => {
      return a.sellPrice - b.sellPrice;
    },
    'date-desc': (a, b) => {
      if (dayjs(a.pubDate).isBefore(dayjs(b.pubDate))) return 1;
      if (dayjs(a.pubDate).isAfter(dayjs(b.pubDate))) return -1;
      return 0;
    },
    'date-asc': (a, b) => {
      if (dayjs(a.pubDate).isBefore(dayjs(b.pubDate))) return -1;
      if (dayjs(a.pubDate).isAfter(dayjs(b.pubDate))) return 1;
      return 0;
    },
  };

  const filter = (b) => {
    if (selectedTags.length > 0 || selectedCategories.length > 0) {
      if (selectedTags.length > 0) {
        for (const tag of b.tags) {
          if (selectedTags.includes(tag)) return true;
        }
      }

      if (selectedCategories.length > 0) {
        for (const cat of b.categories) {
          if (selectedCategories.includes(cat)) return true;
        }
      }

      return false;
    }
    return true;
  };

  const filterPrice = (b) => {
    return b.sellPrice >= priceLow && b.sellPrice <= priceHigh;
  };

  console.log(priceLow, priceHigh);

  return (
    <Row justify='center'>
      <Col span={24} className='bookstore-column'>
        <Breadcrumb className='bookstore-breadcrumb'>
          <Breadcrumb.Item onClick={() => history.push('/')}>
            Home
          </Breadcrumb.Item>
          <Breadcrumb.Item onClick={() => {}}>Browse</Breadcrumb.Item>
        </Breadcrumb>
        <div className='bookstore-page-section'>
          <div
            className='bookstore-browse-container'
            style={{ marginRight: '32px' }}>
            <Title style={{ fontWeight: '900' }}>Filter</Title>
            <Title level={5}>Categories</Title>
            <Select
              mode='multiple'
              onChange={(v) => setSelectedCategories(v)}
              style={{ width: '200px', marginBottom: '16px' }}>
              {categories.map((cat) => (
                <Select.Option value={cat}>
                  {cat.replaceAll('_', ' ')}
                </Select.Option>
              ))}
            </Select>
            <Title level={5}>Tags</Title>
            <Select
              mode='multiple'
              onChange={(v) => setSelectedTags(v)}
              style={{ width: '200px', marginBottom: '16px' }}>
              {tags.map((tag) => (
                <Select.Option value={tag}>
                  {tag[0] + tag.slice(1).toLowerCase()}
                </Select.Option>
              ))}
            </Select>
            <Title level={5}>Price Range</Title>
            <div style={{ whiteSpace: 'nowrap' }}>
              <InputNumber
                onChange={(v) =>
                  setPriceLow(
                    isNaN(v) || v === '' || v === null
                      ? Number.NEGATIVE_INFINITY
                      : v
                  )
                }
              />{' '}
              to{' '}
              <InputNumber
                onChange={(v) =>
                  setPriceHigh(
                    isNaN(v) || v === '' || v === null
                      ? Number.POSITIVE_INFINITY
                      : v
                  )
                }
              />
            </div>
          </div>

          <div className='bookstore-browse-container' style={{ width: '100%' }}>
            {books.length === 0 ? (
              <Spin />
            ) : (
              <div>
                <Title style={{ fontWeight: '900' }}>{title}</Title>
                <div
                  style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Text>
                    {books.filter(filter).filter(filterPrice).length} results
                  </Text>
                  <div>
                    <Text>
                      <b>Sort By</b>
                    </Text>
                    <Select
                      defaultValue='title-desc'
                      onChange={(v) => setSort(v)}
                      style={{ width: '160px', marginLeft: '16px' }}>
                      <Select.Option key='title-desc'>Title A-Z</Select.Option>
                      <Select.Option key='title-asc'>Title Z-A</Select.Option>
                      <Select.Option key='price-desc'>
                        Price High-Low
                      </Select.Option>
                      <Select.Option key='price-asc'>
                        Price Low-High
                      </Select.Option>
                      <Select.Option key='date-desc'>
                        Newest to Oldest
                      </Select.Option>
                      <Select.Option key='date-asc'>
                        Oldest to Newest
                      </Select.Option>
                    </Select>
                  </div>
                </div>
                <div className='bookstore-browse-grid'>
                  {books
                    .filter(filter)
                    .filter(filterPrice)
                    .sort(sorts[sort])
                    .map((b) => (
                      <BookThumbnail book={b} key={b.id} />
                    ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </Col>
    </Row>
  );
}

export default BrowsePage;
