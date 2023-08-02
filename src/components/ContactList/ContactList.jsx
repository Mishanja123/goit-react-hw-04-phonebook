import PropTypes from "prop-types";
import css  from "./ContactList.module.css";

export const ContactList = ({ filteredContacts, deleteContact }) => {
  return (
    <ul className= {css.contactList}>
      {filteredContacts.map(({contactName, contactNumber, contactId}) => {
        return (
          <li key={contactId} className={css.contactItem}>
            <p>{contactName}: {contactNumber}</p>
            <button type="button" onClick={deleteContact} id={contactId} className= {css.deleteBtn}>Delete</button>
          </li>
        )
      })}
    </ul>
)
}

ContactList.propTypes = {
  filteredContacts: PropTypes.arrayOf(PropTypes.object).isRequired,
  deleteContact: PropTypes.func.isRequired
}