import { nanoid } from 'nanoid'
import PropTypes from "prop-types";

import css  from "./ContactsForm.module.css";


export const ContactsForm = ({addContact}) => {

 const onFormSubmit = (event) => {
    event.preventDefault();
    const contactName = event.currentTarget.elements.name.value
    const contactNumber = event.currentTarget.elements.number.value
    const contactId = nanoid()
    addContact(contactName, contactNumber, contactId)
    event.currentTarget.reset()
  }


    return (
      <form className= {css.form} action="add contact" onSubmit={onFormSubmit}>
        <label htmlFor="name" className={css.label}>
          Name
          <input
          className={css.input}
          type="text"
          name="name"
          pattern="^[a-zA-Zа-яА-Я]+(([' \-][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
          placeholder="Enter name"
        />
        </label>
        <label htmlFor="number" className={css.label}>
          Number
          <input 
          className={css.input}
          type="tel"
          name="number"
          pattern="\+?\d{1,4}?[ .\-\s]?\(?\d{1,3}?\)?[ .\-\s]?\d{1,4}[ .\-\s]?\d{1,4}[ .\-\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
          placeholder="Enter number"
        />
        </label>
        <button type="submit" className={css.btn} >Add contact</button>
    </form>
  )
}

ContactsForm.propTypes = {
  addContact: PropTypes.func.isRequired
}