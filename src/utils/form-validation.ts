import React from "react";
import {FormValues} from "../shared/types";

interface Result {
    errorMessage: string;
    toAirportValue: boolean;
    isFormValid: boolean;
}

export function formValidation(event: React.ChangeEvent<HTMLInputElement>, formValues: FormValues) {
    const result: Result = {
        errorMessage: '',
        toAirportValue: formValues.toAirport,
        isFormValid: false
    };
    if (event.target.name === 'passengerCount' && parseInt(event.target.value) < 1 || parseInt(event.target.value) > 4) {
        result.errorMessage = 'Passenger count must be between 1 and 4';
    }
    if (Object.values(formValues).includes('')) {
        result.errorMessage = 'All fields are required';
        result.isFormValid = false;
    }
    if (event.target.name === 'toAirport') {
        result.toAirportValue = !result.toAirportValue;
    }
    return result;
}

export function initialFormValues() {
    return {
        firstName: '',
        lastName: '',
        passengerCount: '',
        phoneNumber: '',
        from: '',
        to: '',
        toAirport: false,
        dateTime: ''
    };
}