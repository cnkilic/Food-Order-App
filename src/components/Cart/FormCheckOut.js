import classes from "./FormCheckOut.module.css";
import useCartFormCheckout from "../../hooks/cart-FormCheckout";

// Different functions can be created according to the input validation control
const inputEmptyCheck = (value) => {
  return value.trim() !== "";
};
const fiveCharCheck = (value) => {
  return value.trim().length === 5 && value.trim() !== "";
};
const FormCheckout = (props) => {
  const {
    value: nameState,
    valueIsValid: nameIsValid,
    valueHasError: nameHasError,
    valueChangeHandler: nameChangeHandler,
    valueBlurHandler: nameBlurHandler,
    valueClasses: nameClasses,
  } = useCartFormCheckout(inputEmptyCheck);
  const {
    value: streetState,
    valueIsValid: streetIsValid,
    valueHasError: streetHasError,
    valueChangeHandler: streetChangeHandler,
    valueBlurHandler: streetBlurHandler,
    valueClasses: streetClasses,
  } = useCartFormCheckout(inputEmptyCheck);
  const {
    value: postalState,
    valueIsValid: postalIsValid,
    valueHasError: postalHasError,
    valueChangeHandler: postalChangeHandler,
    valueBlurHandler: postalBlurHandler,
    valueClasses: postalClasses,
  } = useCartFormCheckout(fiveCharCheck);
  const {
    value: cityState,
    valueIsValid: cityIsValid,
    valueHasError: cityHasError,
    valueChangeHandler: cityChangeHandler,
    valueBlurHandler: cityBlurHandler,
    valueClasses: cityClasses,
  } = useCartFormCheckout(inputEmptyCheck);

  //   const streetChangeHandler = (event) => {};
  //   const postalChangeHandler = (event) => {};
  //   const cityChangeHandler = (event) => {};

  let formValidity = false;
  if (nameIsValid && streetIsValid && postalIsValid && cityIsValid) {
    formValidity = true;
  }

  const formSubmitHandler = (event) => {
    event.preventDefault();
    const inputObject = {
      name: nameState,
      street: streetState,
      postal: postalState,
      city: cityState,
    };

    props.onConfirm(inputObject);
  };

  return (
    <form className={classes.form} onSubmit={formSubmitHandler}>
      <div className={nameClasses}>
        <label htmlFor="name">Your Name</label>
        <input
          onChange={nameChangeHandler}
          onBlur={nameBlurHandler}
          type="text"
          id="name"
          value={nameState}
        />
        {nameHasError && (
          <p className={classes.errorText}>Please enter a valid name!</p>
        )}
      </div>

      <div className={streetClasses}>
        <label htmlFor="street">Street</label>
        <input
          onChange={streetChangeHandler}
          onBlur={streetBlurHandler}
          type="text"
          id="street"
          value={streetState}
        />
        {streetHasError && (
          <p className={classes.errorText}>Please enter a valid street!</p>
        )}
      </div>

      <div className={postalClasses}>
        <label htmlFor="postal">Postal</label>
        <input
          onChange={postalChangeHandler}
          onBlur={postalBlurHandler}
          type="text"
          id="postal"
          value={postalState}
        />
        {postalHasError && (
          <p className={classes.errorText}>Please enter a valid postal!</p>
        )}
      </div>

      <div className={cityClasses}>
        <label htmlFor="city">City</label>
        <input
          onChange={cityChangeHandler}
          onBlur={cityBlurHandler}
          type="text"
          id="city"
          value={cityState}
        />
        {cityHasError && (
          <p className={classes.errorText}>Please enter a valid city!</p>
        )}
      </div>

      <div className={classes.actions}>
        <button type="button" onClick={props.onCancel}>
          Cancel
        </button>
        <button
          className={formValidity ? classes.submit : ""}
          disabled={!formValidity}
          type="submit"
        >
          Confirm
        </button>
      </div>
    </form>
  );
};

export default FormCheckout;
