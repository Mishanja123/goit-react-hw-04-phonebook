import { Component } from "react";

import { Section } from './Section/Section';
import { ContactsForm } from './ContactsForm/ContactsForm';
import { Filter } from './Filter/Filter';
import { ContactList } from './ContactList/ContactList';
export class App extends Component  {

  state = {
    contacts: [],
    filter: '',
  }
  componentDidMount() {
    const savedContacts = localStorage.getItem('contacts');
    if (savedContacts) {
      this.setState({ contacts: JSON.parse(savedContacts) });
    }
  }
  componentDidUpdate() {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
  }

  addContact = (contactName, contactNumber, contactId) => {
    if (this.checkName(contactName)) {
      this.state.contacts.push({ contactName, contactNumber,contactId });
    this.setState((prevState) =>({
      contacts: prevState.contacts,
    }))
    }
  }

  checkName = (name) => {
    if (this.state.contacts.find(contact => contact.contactName === name
    )) {
      alert(`${name}is already in contacts`);
      return false;
    }
    return true;
  }

  handleChange = ({target}) => {
    this.setState({
      filter: target.value
    })
  }

  filterContacts = (contacts) => {
    return contacts.filter(contact => contact.contactName.toLowerCase().includes(this.state.filter.toLowerCase()))
  }

  deleteContact = ({ target }) => {
    this.setState((prevState) => ({

        contacts: prevState.contacts.filter((contact) => contact.contactId !== target.id)

    }))
  }

  render() {
    const { contacts } = this.state;
    const filteredContacts = this.filterContacts(contacts)

    return (
      <>
        <Section title="Phonebook">
          <ContactsForm
            addContact = {this.addContact} 
          />
        </Section>
        
        <Section title="Contacts"> 
          <Filter
            filter={this.state.filter}
            handleChange={ this.handleChange } 
          />

          <ContactList
            filteredContacts={filteredContacts}
            deleteContact={ this.deleteContact} 
          />
        </Section>
      </>
    );
  }
};

// export class App extends Component  {

//   state = {
//     contacts: [
//     {contactId: 'id-1', contactName: 'Rosie Simpson', contactNumber: '459-12-56'},
//     {contactId: 'id-2', contactName: 'Hermione Kline', contactNumber: '443-89-12'},
//     {contactId: 'id-3', contactName: 'Eden Clements', contactNumber: '645-17-79'},
//     {contactId: 'id-4', contactName: 'Annie Copeland', contactNumber: '227-91-26'},
//   ],
//   filter: '',
// }
//   addContact = data => {
//     const { contacts } = this.state;
//     const newContact = {
//       id: nanoid(),
//       ...data,
//     };

//     contacts.some(({ name }) => name === data.name)
//       ? alert(`${data.name} is already in contacts`)
//       : this.setState(prevState => ({
//           contacts: [...prevState.contacts, newContact],
//         }));
//   };

//   deleteContact = userId => {
//     this.setState(prevState => ({
//       contacts: prevState.contacts.filter(contact => contact.id !== userId),
//     }));
//   };

//   handleChangeFilter = ({ currentTarget: { value } }) => {
//     this.setState({ filter: value });
//   };

//   getFilterContacts = () => {
//     const { filter, contacts } = this.state;
//     const FilterlowerCase = filter.toLowerCase();
//     return contacts.filter(({ name }) =>
//       name.toLowerCase().includes(FilterlowerCase)
//     );
//   };

//   render () {
//     const { filter } = this.state;
//     return (
//       <>
//         <Section title="Phonebook">
//           <ContactsForm addContact={this.addContact} />
//         </Section>
//         <Section title="Contacts">
//           <Filter value={filter} handleChangeFilter={this.handleChangeFilter} />

//           <ContactList
//             contacts={this.getFilterContacts()}
//             deleteContact={this.deleteContact}
//           />
//         </Section>
//       </>
//     );
//   }
// };
