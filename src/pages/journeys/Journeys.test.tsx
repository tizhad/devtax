import React from "react";
import {fireEvent, render, screen} from "@testing-library/react";
import {MockedProvider} from "@apollo/client/testing";
import Journeys from "./Journeys";
import {getAllJourneysEntries} from "../../gql";
import {FilterType} from "../../shared/types";
import JourneyItem from "../../components/Journey/JourneyItem";

const loadingMocks = [
    {
        request: {
            query: getAllJourneysEntries(),
        },
        result: {},
    },
];


const dataMock = {
    request: {
        query: getAllJourneysEntries(),
    },
    result: {
        data: {
            journeyCollection: {
                edges: [
                    {
                        node: {
                            id: "1",
                            from_address: "Test Address 1",
                            to_address: "Test Address 2",
                            fare: 100,
                            inbound: true,
                            created_at: "2022-01-01T00:00:00Z",
                            status: FilterType.PENDING,
                            traveller_info: {
                                id: "1",
                                first_name: "Test",
                                last_name: "User",
                                flight_number: "Test Flight",
                                passenger_count: 1,
                                phone_number: "Test Phone",
                            },
                        },
                    },
                ],
            },
        },
    },
};


describe("Journeys", () => {
    it("renders journey information within JourneyItem", async () => {
        render(
            <MockedProvider mocks={[dataMock]} addTypename={false}>
                <JourneyItem journey={dataMock.result.data.journeyCollection.edges[0].node}/>
            </MockedProvider>
        );

        expect(await screen.findByText("PENDING")).toBeInTheDocument();
    });
    it("renders loading state", () => {
        render(
            <MockedProvider mocks={loadingMocks} addTypename={false}>
                <Journeys/>
            </MockedProvider>
        );

        expect(screen.getByText("Loading...")).toBeInTheDocument();
    });


    it("shows a button when status is CANCELLED", async () => {
        dataMock.result.data.journeyCollection.edges[0].node.status = FilterType.CANCELLED;
        render(
            <MockedProvider mocks={[dataMock]} addTypename={false}>
                <Journeys/>
            </MockedProvider>
        );
        expect(await screen.findByText("Delete")).toBeInTheDocument();
    });

    it("shows a button when status is IN Progress", async () => {
        dataMock.result.data.journeyCollection.edges[0].node.status = FilterType.IN_PROGRESS;
        render(
            <MockedProvider mocks={[dataMock]} addTypename={false}>
                <Journeys/>
            </MockedProvider>
        );
        expect(await screen.findByText("Complete Ride")).toBeInTheDocument();
    });

    it("should open a form when Create button clicks", async () => {
        render(
            <MockedProvider mocks={[dataMock]} addTypename={false}>
                <Journeys/>
            </MockedProvider>
        );
        const createBtn = await screen.findByText("Create");
        fireEvent.click(createBtn);
        expect(createBtn).toBeTruthy();
        expect(await screen.findByText("Create New Journey")).toBeInTheDocument();
    });

});