import { useState, useEffect } from "react";

import { Section } from './Section/Section';
import { ContactsForm } from './ContactsForm/ContactsForm';
import { Filter } from './Filter/Filter';
import { ContactList } from './ContactList/ContactList';


export const App = () => {

  const [contacts, setContacts] = useState([])
  const [filter, setFilter] = useState('')
 
  
  useEffect(() => {
    setContacts(JSON.parse(localStorage.getItem('contacts')) || [])
  }, []);
  
  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts))
  }, [contacts])

  const addContact = (contactName, contactNumber, contactId) => {
    if (checkName(contactName)) {
      setContacts(contacts.push({ contactName, contactNumber,contactId }));
      // setContacts(prevContacts => prevContacts = contacts)
      setContacts(prevContacts => {
        return{...prevContacts, ...contacts}
      })

    }
  }

  const checkName = (name) => {
    if (contacts.find(contact => contact.contactName === name
    )) {
      alert(`${name}is already in contacts`);
      return false;
    }
    return true;
  }

  const handleChange = (event) => {
    const targetValue = event.target.value
    setFilter(filter = targetValue)
  }

  const filterContacts = (contacts) => {
    return contacts.filter(contact => contact.contactName.toLowerCase().includes(setFilter(filter.toLowerCase())));
  }

  const deleteContact = (event) => {
    const delateValue = event.turget.value
    if(delateValue === contacts) {
      setContacts(contacts = contacts.filter((contact) => contact.contactId !== event.target.id))
    }
  }

    return (
      <>
        <Section title="Phonebook">
          <ContactsForm
            addContact = {addContact} 
          />
        </Section>
        
        <Section title="Contacts"> 
          <Filter
            filter={filter}
            handleChange={handleChange} 
          />

          <ContactList
            filteredContacts={filterContacts}
            deleteContact={deleteContact} 
          />
        </Section>
      </>
    );
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
