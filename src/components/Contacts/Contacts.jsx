import React from 'react';
import PropTypes from 'prop-types';
import css from './Contacts.module.css';

function Contacts({ contacts, deleteContact, children }) {
  const handleDeleteClick = ({ target }) => {
    deleteContact(target.dataset.id);
  };
  return (
    <>
      <h2 className={css.title}>Contacts</h2>
      <div className={css.container}>
        {children}
        <ul className={css.contactsList}>
          {contacts.map(({ id, name, number }) => {
            return (
              <li key={id} className={css.contactsItem}>
                {name} {number}
                <button
                  className={css.btn}
                  type="button"
                  data-id={id}
                  onClick={handleDeleteClick}
                >
                  Delete
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
}

Contacts.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    }).isRequired
  ).isRequired,
};

export default Contacts;
