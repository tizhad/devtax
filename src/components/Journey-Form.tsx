import React, {useState} from 'react';
import './Journey-Form.scss';
import {Errors, FormValues} from "../shared/types";
import {toast, ToastContainer} from 'react-toastify';

function JourneyForm() {
    const [formValues, setFormValues] = useState<FormValues>({
        firstName: '',
        lastName: '',
        passengerCount: '',
        phoneNumber: '',
        from: '',
        to: '',
        toAirport: false,
        dateTime: '',
    });

    const [errors, setErrors] = useState<Errors>({});
    const [message, setMessage] = useState('');

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFormValues({
            ...formValues,
            [event.target.name]:
                event.target.type === 'checkbox'
                    ? event.target.checked
                    : event.target.value,
        });
    };

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        const newErrors: Errors = validate(formValues);
        setErrors(newErrors);

        if (Object.keys(newErrors).length === 0) {
            setFormValues({
                firstName: '',
                lastName: '',
                passengerCount: '',
                phoneNumber: '',
                from: '',
                to: '',
                toAirport: false,
                dateTime: '',
            });
            toast.success('Form successfully submitted!');
        }
    };

    const validate = (values: FormValues): Errors => {
        let errors: Errors = {};
        const fields = [
            'firstName',
            'lastName',
            'passengerCount',
            'phoneNumber',
            'from',
            'to',
            'dateTime',
        ];

        fields.forEach((field) => {
            if (!values[field]) {
                errors[field] = `${field.charAt(0).toUpperCase() + field.slice(1)} is required`;
            }
        });

        return errors;
    };

    return (
        <div>
            <div className="form">
                <form onSubmit={handleSubmit} className="form">
                    <h1>Create New Journey</h1>
                    {Object.keys(errors).length > 0 && (
                        <p className="error">Please fill in all required fields</p>
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
                        onChange={handleChange}
                    />
                    <input
                        placeholder="Phone Number"
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
                    <button type="submit" className="btn">
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
