import React from 'react';
import "./FormCheckText.css";

const FormCheckText = ({isCheck}) => {
  return (
      <small className="form-text text-left text-waring">
          {isCheck > 8 ? 'true':'false' }
      </small>
  )
};

export default FormCheckText;