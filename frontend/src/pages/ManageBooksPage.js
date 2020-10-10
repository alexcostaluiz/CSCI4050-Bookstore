import React, { useContext, useState, useEffect, useRef } from 'react';

import { Table, Input, Button, Popconfirm, Form } from 'antd';

const EditableContext = React.createContext();

const EditableRow = ({ index, ...props }) => {
  const [form] = Form.useForm();
  return (
    <Form form={form} component={false}>
      <EditableContext.Provider value={form}>
        <tr {...props} />
      </EditableContext.Provider>
    </Form>
  );
};

const EditableCell = ({
  title,
  editable,
  children,
  dataIndex,
  record,
  handleSave,
  ...restProps
}) => {
  const [editing, setEditing] = useState(false);
  const inputRef = useRef();
  const form = useContext(EditableContext);
  useEffect(() => {
    if (editing) {
      inputRef.current.focus();
    }
  }, [editing]);

  const toggleEdit = () => {
    setEditing(!editing);
    form.setFieldsValue({
      [dataIndex]: record[dataIndex],
    });
  };

  const save = async (e) => {
    try {
      const values = await form.validateFields();
      toggleEdit();
      handleSave({ ...record, ...values });
    } catch (errInfo) {
      console.log('Save failed:', errInfo);
    }
  };

  let childNode = children;

  if (editable) {
    childNode = editing ? (
      <Form.Item
        style={{
          margin: 0,
        }}
        name={dataIndex}
        rules={[
          {
            required: true,
            message: `${title} is required.`,
          },
        ]}>
        <Input ref={inputRef} onPressEnter={save} onBlur={save} />
      </Form.Item>
    ) : (
      <div
        className='editable-cell-value-wrap'
        style={{
          paddingRight: 24,
        }}
        onClick={toggleEdit}>
        {children}
      </div>
    );
  }

  return <td {...restProps}>{childNode}</td>;
};

class EditableTable extends React.Component {
  constructor(props) {
    super(props);
    this.columns = [
      {
        title: 'Title',
        dataIndex: 'title',
        width: '30%',
        editable: true,
      },
      {
        title: 'Author',
        dataIndex: 'author',
        width: '30%',
        editable: true,
      },
      {
        title: 'ISBN-13',
        dataIndex: 'isbn',
        editable: true,
      },
      {
        title: 'Publication Date',
        dataIndex: 'pd',
        editable: true,
      },
      {
        title: 'Publisher',
        dataIndex: 'publisher',
        editable: true,
      },
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
          key: '0',
          title: 'A Promised Land',
          author: 'Barack Obama',
          isbn: '978-1-524-76316-9',
          pd: 'November 17, 2020',
          publisher: 'Crown Publishing Group',
        },
        {
          key: '1',
          title: 'A Promised Land',
          author: 'Barack Obama',
          isbn: '978-1-524-76316-9',
          pd: 'November 17, 2020',
          publisher: 'Crown Publishing Group',
        },
        {
          key: '2',
          title: 'A Promised Land',
          author: 'Barack Obama',
          isbn: '978-1-524-76316-9',
          pd: 'November 17, 2020',
          publisher: 'Crown Publishing Group',
        },
      ],
      count: 3,
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
      title: 'A Promised Land',
      author: 'Barack Obama',
      isbn: '978-1-524-76316-9',
      pd: 'November 17, 2020',
      publisher: 'Crown Publishing Group',
    };
    this.setState({
      dataSource: [...dataSource, newData],
      count: count + 1,
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
    const components = {
      body: {
        row: EditableRow,
        cell: EditableCell,
      },
    };
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
        <Button
          onClick={this.handleAdd}
          type='primary'
          style={{
            marginBottom: 16,
          }}>
          Add a row
        </Button>
        <Table
          components={components}
          rowClassName={() => 'editable-row'}
          bordered
          dataSource={dataSource}
          columns={columns}
        />
      </div>
    );
  }
}

function ManageBooks(props) {
  return <EditableTable />;
}

export default ManageBooks;
