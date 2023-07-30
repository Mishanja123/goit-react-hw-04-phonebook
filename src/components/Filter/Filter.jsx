import PropTypes from "prop-types";
import css  from "./Filter.module.css";

export const Filter = ({filter, handleChange}) => {
    return (
        <form className={css.form}>
        <label htmlFor="filter" className= {css.lable}>
          Find contacts by name
        <input
        className={css.input}
          type="text"
          name="filter"
          pattern="^[a-zA-Zа-яА-Я]+(([' \-][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          onChange={handleChange}
          value={filter}
          placeholder="Enter contact Name"
        />
      </label>
      </form>
  )
}

Filter.propTypes = {
  filter: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired
}