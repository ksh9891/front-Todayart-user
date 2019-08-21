import React from 'react';
import "./FormCheckText.css";

const FormCheckText = ({sendMsg, isCheck}) => {
    const classNameHelper = boolean => {
        switch (boolean) {
            case true:
                return 'valid-feedback';
            case false:
                return 'invalid-feedback';
            default:
                return 'feedback';
        }
    };

    return (
      <div className={`${classNameHelper(isCheck)}`}>
          {sendMsg}
      </div>
  )
};

export default FormCheckText;