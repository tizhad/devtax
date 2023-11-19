import {useQuery} from "@apollo/client";
import React, {useState} from "react";
import {Journey} from "../../gql/graphql";
import {getAllJournalEntries, getDriverInfo} from "../../gql";
import "./Journeys.scss";
import JourneyForm from "../../components/Journey-Form";

export default function Journeys() {
    const {loading, error, data} = useQuery(getAllJournalEntries());
    const {data: userInfoResult} = useQuery(getDriverInfo());
    const [isFormOpen, setIsFormOpen] = useState(false);

    function onCreate(): void {
        console.log("create");
        setIsFormOpen(true);
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
            <div>
                <button className="button" onClick={onCreate}>
                    Create
                </button>
            </div>
            <div>
                {isFormOpen && <JourneyForm></JourneyForm>}
            </div>
            {!isFormOpen && data.journeyCollection.edges.map(({node: journey}: { node: Journey }) => (
                <div key={journey.id} className="journey">
                    <h2>
                        {journey.from_address} to {journey.to_address}
                    </h2>
                    <p>Fare: {journey.fare}</p>
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
