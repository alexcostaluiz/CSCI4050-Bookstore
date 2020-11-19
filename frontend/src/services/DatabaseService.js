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
    return response.ok;
  },

  retrieveBooks: async () => {
    const response = await fetch('/books/get');
    const json = await response.json();
    return json;
  },

  updateBook: async (values) => {
    const response = await fetch('/books/update', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(values),
    });
    if (response.ok) {
      message.success('Book successfully updated!');
    } else {
      message.error('Failed to update book.');
    }
    return response.ok;
  },

  archiveBook: async (values) => {
    const response = await fetch('/books/archive', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(values),
    });
    if (response.ok) {
      message.success('Book successfully archived!');
    } else {
      message.error('Failed to archive book.');
    }
    return response.ok;
  },

  unarchiveBook: async (values) => {
    const response = await fetch('/books/unarchive', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(values),
    });
    if (response.ok) {
      message.success('Book successfully unarchived!');
    } else {
      message.error('Failed to unarchive book.');
    }
    return response.ok;
  },

  createPromotion: async (values) => {
    const response = await fetch('/promos/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(values),
    });
    if (response.ok) {
      message.success('Promotion successfully created!');
    } else {
      message.error('Failed to create promotion.');
    }
    return response.ok;
  },

  retrievePromotions: async () => {
    const response = await fetch('/promos/get');
    const json = await response.json();
    return json;
  },

  updatePromotion: async (values) => {
    const response = await fetch('/promos/update', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(values),
    });
    if (response.ok) {
      message.success('Promotion successfully updated!');
    } else {
      message.error('Failed to update promotion.');
    }
    return response.ok;
  },

  deletePromotion: async (values) => {
    const response = await fetch('/promos/delete', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(values),
    });
    if (response.ok) {
      message.success('Promotion successfully deleted!');
    } else {
      message.error('Failed to delete promotion.');
    }
    return response.ok;
  },

  activatePromotion: async (values) => {
    const response = await fetch('/promos/email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(values),
    });
    if (response.ok) {
      message.success('Promotion successfully activated!');
    } else {
      message.error('Failed to activate promotion.');
    }
    return response.ok;
  },

  createUser: async (values) => {
    const response = await fetch('/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(values),
    });
    if (response.ok) {
      message.success('User successfully created!');
    } else {
      message.error('Failed to create user.');
    }
    return response.ok;
  },

  retrieveUsers: async () => {
    const response = await fetch('/users/get');
    const json = await response.json();
    return json;
  },

  updateUser: async (values) => {
    const response = await fetch('/users/update', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(values),
    });
    if (response.ok) {
      message.success('User successfully updated!');
    } else {
      message.error('Failed to update user.');
    }
    return response.ok;
  },

  deleteUser: async (values) => {
    const response = await fetch('/users/delete', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(values),
    });
    if (response.ok) {
      message.success('User successfully deleted!');
    } else {
      message.error('Failed to delete user.');
    }
    return response.ok;
  },

  promoteUser: async (values) => {
    const response = await fetch('/users/promote', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: values.emailAddress,
    });
    if (response.ok) {
      message.success('User successfully promoted!');
    } else {
      message.error('Failed to promote user.');
    }
    return response.ok;
  },

  demoteUser: async (values) => {
    const response = await fetch('/users/demote', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: values.emailAddress,
    });
    if (response.ok) {
      message.success('User successfully demoted!');
    } else {
      message.error('Failed to demote user.');
    }
    return response.ok;
  },

  suspendUser: async (values) => {
    const response = await fetch('/users/suspend', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: values.emailAddress,
    });
    if (response.ok) {
      message.success('User successfully suspended!');
    } else {
      message.error('Failed to suspend user.');
    }
    return response.ok;
  },

  unsuspendUser: async (values) => {
    const response = await fetch('/users/unsuspend', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: values.emailAddress,
    });
    if (response.ok) {
      message.success('User successfully unsuspended!');
    } else {
      message.error('Failed to unsuspend user.');
    }
    return response.ok;
  },

  retrieveCategories: async () => {
    const response = await fetch('/books/get/categories');
    const json = await response.json();
    return json;
  },
};

export default DB;
