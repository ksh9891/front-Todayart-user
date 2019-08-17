import React from 'react';
import "./FormCheckText.css";

const FormCheckText = (event) => {
    let check = (event.length > 1);
  return (
      <small className="form-text text-left text-waring">
          {(isCheck) ? "hi" : "bye"}
      </small>
  )
};

export default FormCheckText;