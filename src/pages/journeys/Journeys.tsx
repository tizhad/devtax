import {useQuery} from "@apollo/client";
import React, {useState} from "react";
import {getAllJournalEntries, getDriverInfo} from "../../gql";
import "./Journeys.scss";
import JourneyForm from "../../components/Journey-Form";
import {Journey} from "../../shared/types";
import Dropdown from "../../components/Dropdown/Dropdown";

export default function Journeys() {
    const {loading, error, data} = useQuery(getAllJournalEntries());
    const {data: userInfoResult} = useQuery(getDriverInfo());
    const [isFormOpen, setIsFormOpen] = useState(false);

    function onCreate(): void {
        setIsFormOpen(true);
    }

    function closeForm() {
        setIsFormOpen(false);
    }

    function filterJourneys(filter: string) {
        if (filter === 'All') return data.journeyCollection.edges;
        return data.journeyCollection.edges.filter((journey: Journey) => journey.status === filter);
    }

    if (loading) return <p>Loading...</p>;
    if (error) {
        return (
            <p>Error loading data. Please check the console for details.</p>
        );
    }
    if (userInfoResult) console.log(userInfoResult);

    return (
        <div className="content">
            {!isFormOpen && (<div className="functions">
                <Dropdown handleChange={filterJourneys}></Dropdown>
                <button className="btn" onClick={onCreate}>
                    Create
                </button>
            </div>)}
            <div>
                {isFormOpen && <JourneyForm onClose={closeForm}></JourneyForm>}
            </div>
            {data.journeyCollection.edges.map(({node: journey}: { node: Journey }) => (
                <div key={journey.id} className="journey">
                    <h2>
                        {journey.from_address} to {journey.to_address}
                    </h2>
                    <p>Fare: {journey.fare}</p>
                    <span className="status">{journey.status}</span>

                    <p>Inbound: {journey.inbound ? "Yes" : "No"}</p>
                    <p>Created At: {journey.created_at}</p>
                    <h3>Traveller Info:</h3>
                    <p>
                        Name: {journey.traveller_info.first_name}{" "}
                        {journey.traveller_info.last_name}
                    </p>
                    <p>Flight Number: {journey.traveller_info.flight_number}</p>
                    <p>
                        Passenger Count: {journey.traveller_info.passenger_count}
                    </p>
                    <p>Phone Number: {journey.traveller_info.phone_number}</p>
                </div>
            ))}
        </div>
    );
}
