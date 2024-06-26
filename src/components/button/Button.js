import React from 'react';
import style from "./Button.module.css";

const Button = (props) => {
    return <button className={`${style.button} ${props.secondary ? style.buttonSecondary : ''}`}>{props.children}</button>;
};

export default Button;