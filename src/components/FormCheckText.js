import React from 'react';
import "./FormCheckText.css";

const FormCheckText = ({isCheck, validType}) => {
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

    const message = () => {
        switch (validType) {
            case 'email':
                return isCheck ? '사용가능한 이메일 입니다.' : '올바르지 않은 형식';
            case 'nickname':
                return isCheck ? '사용가능한 닉네임 입니다.' : '올바르지 않은 형식(특수문자)';
            default:
                return 'ㅁㄴㅇㅁㄴㅇ';
        }
    }

    return (
      <div className={`${classNameHelper(isCheck)}`}>
          {message}
      </div>
  )
};

export default FormCheckText;