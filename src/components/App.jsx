import { ContactsForm } from './ContactsForm/ContactsForm';
import React, { Component } from 'react';
import { ContactsList } from './ContactsList/ContactsList';
import { Filter } from './Filter/Filter';
import toast, { Toaster } from 'react-hot-toast';
import { Sec } from 'App.styled';
import PropTypes from 'prop-types';

export class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };

  handleAddContact = contact => {
    if (this.state.contacts.some(item => item.name === contact.name)) {
      toast.error('Contact already exists');
      return true;
    }
    this.setState(prevState => {
      return {
        contacts: [...prevState.contacts, contact],
      };
    });
    return false;
  };

  handleDeleteContact = id => {
    this.setState(prevState => {
      return {
        contacts: prevState.contacts.filter(contact => contact.id !== id),
      };
    });
  };

  handleChangeFilter = e => {
    this.setState({ filter: e.target.value });
  };

  handleFilterContacts = () => {
    return this.state.contacts.filter(contact =>
      contact.name
        .toLowerCase()
        .includes(this.state.filter.toLowerCase().trim())
    );
  };

  render() {
    return (
      <Sec>
        <ContactsForm addContact={this.handleAddContact} />

        <Filter
          value={this.state.filter}
          handleChange={this.handleChangeFilter}
        />
        <ContactsList
          contacts={this.handleFilterContacts()}
          deleteContact={this.handleDeleteContact}
        />
        <Toaster />
      </Sec>
    );
  }
}
App.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    })
  ),
  filter: PropTypes.string,
};
