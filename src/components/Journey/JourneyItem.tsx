import React from "react";
import {Journey} from "../../shared/types";

interface JourneyItemProps {
    journey: Journey;
}

export function JourneyItem({journey}: JourneyItemProps) {
    return (
        <div className="journey">
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
    );
}

export default JourneyItem;