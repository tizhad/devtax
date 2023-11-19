import React, {useState} from 'react';
import './Journey-Form.scss';
import {FormValues} from "../shared/types";
import {toast, ToastContainer} from 'react-toastify';
import {formValidation, initialFormValues} from "../utils/form-validation";

function JourneyForm() {
    const [formValues, setFormValues] = useState<FormValues>(initialFormValues
);

    const [error, setErrorMessage] = useState('');
    const [isFormValid, setIsFormValid] = useState(false);
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const name:string = event.target.name;
        const value = event.target.value;
        setFormValues({
            ...formValues,
            [name]: value,
        });

        const result = formValidation(event, formValues);

        if (result.errorMessage) {
            setErrorMessage(result.errorMessage);
            setIsFormValid(result.isFormValid);
        } else {
            setErrorMessage('');
            setIsFormValid(true);
        }
    };

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        toast.success('Form successfully submitted!');
    };

    return (
        <div>
            <div className="form">
                <form onSubmit={handleSubmit} className="form">
                    <h1>Create New Journey</h1>
                    {error && (
                        <p className="error">{error}</p>
                    )}
                    <input
                        placeholder="name"
                        type="text"
                        name="firstName"
                        value={formValues.firstName}
                        onChange={handleChange}
                    />
                    <input
                        placeholder="Last Name"
                        type="text"
                        name="lastName"
                        value={formValues.lastName}
                        onChange={handleChange}
                    />
                    <input
                        placeholder="Passenger Count"
                        type="number"
                        name="passengerCount"
                        value={formValues.passengerCount}
                        min="1"
                        max="4"
                        onChange={handleChange}
                    />
                    <input
                        placeholder="+31101023990"
                        type="tel"
                        name="phoneNumber"
                        value={formValues.phoneNumber}
                        onChange={handleChange}
                    />
                    <input
                        placeholder="From"
                        type="text"
                        name="from"
                        value={formValues.from}
                        onChange={handleChange}
                    />
                    <input
                        placeholder="To"
                        type="text"
                        name="to"
                        value={formValues.to}
                        onChange={handleChange}
                    />
                    <label>
                        To Airport?
                        <input
                            type="checkbox"
                            name="toAirport"
                            checked={formValues.toAirport}
                            onChange={handleChange}
                        />
                    </label>
                    <input
                        placeholder="Date and Time"
                        type="datetime-local"
                        name="dateTime"
                        value={formValues.dateTime}
                        onChange={handleChange}
                    />
                    <button type="submit" className="btn" disabled={!isFormValid}>
                        Submit
                    </button>
                </form>
            </div>
            <div className="msg">
                <ToastContainer/>
            </div>
        </div>
    );
}

export default JourneyForm;
