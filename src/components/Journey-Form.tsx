import React, {useState} from 'react';
import './Journey-Form.scss';
import {FormValues} from "../shared/types";
import {toast, ToastContainer} from 'react-toastify';
import {formValidation, initialFormValues} from "../utils/form-validation";
import {graphql} from "../gql";
import {useMutation} from "@apollo/client";

function JourneyForm({onClose}: { onClose: () => void }) {
    const [formValues, setFormValues] = useState<FormValues>(initialFormValues);
    const [createJourney, {loading, error}] = useMutation(graphql('CreateJourney'));
    const [createTraveller] = useMutation(graphql('CreateTraveller'));
    const [errorMsg, setErrorMessage] = useState('');
    const [isFormValid, setIsFormValid] = useState(false);
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const name: string = event.target.name;
        const value = event.target.type === 'checkbox'
            ? event.target.checked
            : event.target.value;

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

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        try {
            const travellerResult = await createTraveller({
                variables: {
                    input: {
                        first_name: formValues.firstName,
                        last_name: formValues.lastName,
                        flight_number: 'KL123',
                        passenger_count: parseInt(formValues.passengerCount),
                        phone_number: formValues.phoneNumber,
                        created_at: formValues.dateTime,
                    },
                },
            });
            onClose();
            const travellerUuid = travellerResult.data.insertIntotraveller_infoCollection.records[0].id;
            const journeyResult = await createJourney({
                variables: {
                    input: {
                        fare: 100,
                        inbound: formValues.toAirport,
                        from_address: formValues.from,
                        to_address: formValues.to,
                        traveller_info: travellerUuid,
                    },
                },
            });
        } catch (error) {
            toast.error('Error submitting form!')
        }
        toast.success('Form successfully submitted!');
    };

    return (
        <div>
            <div className="form">
                <form onSubmit={handleSubmit} className="form">
                    <h1>Create New Journey</h1>
                    {error && (
                        <p className="error">{errorMsg}</p>
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
                    <div>
                        <button type="submit" className="btn"
                                disabled={!isFormValid}>
                            Submit
                        </button>
                        <button type="button" className="btn" onClick={onClose}>
                            Cancel
                        </button>
                    </div>

                </form>
            </div>
            <div className="msg">
                <ToastContainer/>
            </div>
        </div>
    );
}

export default JourneyForm;
