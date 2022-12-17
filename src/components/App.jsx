import { nanoid } from 'nanoid';
import React, { Component } from 'react';
import { FormAddContact, Contacts, Filter } from './';

export class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };

  componentDidMount() {
    const contacts = localStorage.getItem('contacts');
    if (contacts) {
      this.setState({
        contacts: JSON.parse(contacts),
      });
    }
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevState.contacts.length !== this.state.contacts.length) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
  }
  addContact = ({ name, number }) => {
    const isNameInContacts = this.state.contacts.some(
      contact => contact.name.toLowerCase() === name.toLowerCase()
    );
    if (isNameInContacts) {
      alert('Не можна!!!');
      return false;
    }
    const newContact = {
      name,
      number,
      id: nanoid(),
    };
    this.setState(({ contacts }) => {
      const newContacts = [...contacts, newContact];
      return {
        contacts: newContacts,
      };
    });
    return true;
  };

  deleteContact = idToDelete => {
    this.setState({
      contacts: [...this.state.contacts].filter(({ id }) => id !== idToDelete),
    });
  };

  setFilter = filterValue => {
    this.setState({
      filter: filterValue.toLowerCase().trim(),
    });
  };

  filterContacts = () => {
    const { filter, contacts } = this.state;
    return filter
      ? contacts.filter(({ name }) => name.toLowerCase().includes(filter))
      : contacts;
  };

  render() {
    return (
      <div>
        <FormAddContact addContact={this.addContact} />
        <Contacts
          contacts={this.filterContacts()}
          deleteContact={this.deleteContact}
        >
          <Filter filterHandler={this.setFilter} />
        </Contacts>
      </div>
    );
  }
}

export default App;
