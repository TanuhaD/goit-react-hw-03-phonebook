import { nanoid } from 'nanoid';
import React, { Component } from 'react';
import { FormAddContact, Contacts, Filter } from './';

export class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    contactsToShow: [],
    filter: '',
  };

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
      contactsToShow: [...this.state.contactsToShow].filter(
        ({ id }) => id !== idToDelete
      ),
    });
  };

  filterContacts = filterValue => {
    const contactsToShow = filterValue
      ? [...this.state.contacts].filter(({ name }) =>
          name.toLowerCase().includes(filterValue)
        )
      : [];
    this.setState({ filter: filterValue, contactsToShow });
  };

  render() {
    const { contacts, contactsToShow } = this.state;
    return (
      <div>
        <FormAddContact addContact={this.addContact} />
        <Contacts
          contacts={
            contactsToShow.length || this.state.filter
              ? [...contactsToShow]
              : [...contacts]
          }
          deleteContact={this.deleteContact}
        >
          <Filter filterHandler={this.filterContacts} />
        </Contacts>
      </div>
    );
  }
}

export default App;
