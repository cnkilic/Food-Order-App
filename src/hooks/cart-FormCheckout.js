import { useState } from "react";
import classes from "../components/Cart/FormCheckOut.module.css";

const useCartFormCheckout = (valueCheck) => {
  const [valueState, setNameState] = useState("");
  const [isTouched, setIsTouched] = useState(false);

  const valueIsValid = valueCheck(valueState);
  const valueHasError = !valueIsValid && isTouched;

  const valueChangeHandler = (event) => {
    setNameState(event.target.value);
  };
  const valueBlurHandler = (event) => {
    setIsTouched(true);
  };

  const valueClasses = valueHasError
    ? ` ${classes.control} ${classes.invalid} `
    : classes.control;



  return {
    value: valueState,
    valueIsValid: valueIsValid,
    valueHasError: valueHasError,
    valueChangeHandler: valueChangeHandler,
    valueBlurHandler: valueBlurHandler,
    valueClasses: valueClasses,
  };
};

export default useCartFormCheckout;
