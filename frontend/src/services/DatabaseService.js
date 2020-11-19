import { message } from 'antd';

const DB = {
  updatePersonalInfo: async (values, auth) => {
    const response = await fetch('/edit/personalInfo', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(values),
    });
    if (response.ok) {
      auth.fetchUser();
      message.success('Profile information successfully updated!');
    }
  },

  updatePassword: async (values, auth, form) => {
    delete values.confirm;
    const response = await fetch('/edit/password', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(values),
    });
    if (response.ok) {
      auth.fetchUser();
      form.resetFields();
      message.success('Password successfully updated!');
    } else {
      message.error('Failed to update password. Invalid credentials.');
    }
  },

  createAddress: async (values, auth) => {
    const response = await fetch('/edit/saveAddress', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(values),
    });
    if (response.ok) {
      auth.fetchUser();
      message.success('Address sucessfully saved!');
      const address = await response.json();
      return address;
    }
    return null;
  },

  deleteAddress: async (values, auth) => {
    const response = await fetch('/edit/deleteAddress', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(values),
    });
    if (response.ok) {
      auth.fetchUser();
      message.success('Address sucessfully deleted!');
    }
  },

  createCard: async (values, auth) => {
    const response = await fetch('/edit/saveCard', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(values),
    });
    if (response.ok) {
      auth.fetchUser();
      message.success('Card sucessfully saved!');
      const card = await response.json();
      return card;
    }
    return null;
  },

  deleteCard: async (values, auth) => {
    delete values.description;
    const response = await fetch('/edit/deleteCard', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(values),
    });
    if (response.ok) {
      auth.fetchUser();
      message.success('Card successfully deleted!');
    }
  },

  retrieveBooks: async () => {
    const response = await fetch('/books/get');
    const json = await response.json();
    console.log(json);
    return json;
  },

  createBook: async (values) => {
    const response = await fetch('/books/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(values),
    });
    if (response.ok) {
      message.success('Book successfully created!');
    } else {
      message.error('Failed to create book.');
    }
  },
};

export default DB;
