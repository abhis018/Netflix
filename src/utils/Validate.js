import React from 'react'

export const checkValidData = (email, password) => {
  
    const isEmailValid = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/.test(email);
    const isPasswordValid = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(password);

    if(!isEmailValid)
        return "Email ID is not Valid";
    if(!isPasswordValid)
        return "Password is not Valid";

    return null;

};

