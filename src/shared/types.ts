export interface TravellerInfo {
    id: string;
    last_name: string;
    first_name: string;
    phone_number: string;
    flight_number: string;
    passenger_count: number;
}

export interface Journey {
    id: string;
    fare: number;
    hubType: string;
    inbound: boolean;
    created_at: string;
    to_address: string;
    from_address: string;
    traveller_info: TravellerInfo;
}

interface JourneyEdge {
    node: Journey;
}

interface JourneyCollection {
    edges: JourneyEdge[];
}

interface Data {
    journeyCollection: JourneyCollection;
}

interface ApiResponse {
    data: Data;
}

export interface FormValues {
    firstName: string;
    lastName: string;
    passengerCount: string;
    phoneNumber: string;
    from: string;
    to: string;
    toAirport: boolean;
    dateTime: string;

    [key: string]: string | boolean;
}
export interface Errors {
    [key: string]: string;
}
