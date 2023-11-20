import {useMutation, useQuery} from "@apollo/client";
import React, {useEffect, useState} from "react";
import {getAllJournalEntries, getDriverInfo, graphql} from "../../gql";
import "./Journeys.scss";
import JourneyForm from "../../components/Journey-Form";
import {Journey} from "../../shared/types";
import Dropdown from "../../components/Dropdown/Dropdown";
import {toast, ToastContainer} from "react-toastify";
import JourneyItem from "../../components/Journey/JourneyItem";

export default function Journeys() {
    const {loading, error, data} = useQuery(getAllJournalEntries());
    const {data: userInfoResult} = useQuery(getDriverInfo());
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [filteredData, setFilteredData] = useState([]);
    const [filter, setFilter] = useState('ALL');
    const [deleteJourneyMutation] = useMutation(graphql('DeleteJourney'));


    function onCreate(): void {
        setIsFormOpen(true);
    }

    useEffect(() => {
        if (data && data.journeyCollection && data.journeyCollection.edges) {
            setFilteredData(data.journeyCollection.edges);
        }
    }, [data]);

    function closeForm() {
        setIsFormOpen(false);
    }

    async function handleDelete(id: string) {
        try {
            await deleteJourneyMutation({variables: {id}})
                .then(() => {
                    setFilteredData(filteredData.filter(({node: journey}: { node: Journey }) => journey.id !== id));
                    toast.success('Journey deleted successfully');
                });

        } catch (error) {
            toast.error('Failed to delete journey')
        }
    }

    function filterJourneys(filter: string) {
        setFilter(filter);
        filter == 'ALL'
            ? setFilteredData(data.journeyCollection.edges)
            : setFilteredData(data.journeyCollection.edges
                .filter(({node: journey}: { node: Journey }) => journey.status === filter))

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
                {filter !== 'ALL' ?
                    <span className="filter"><strong>Filtered By Status: </strong> {filter} </span> : null
                }
                <button className="btn" onClick={onCreate}>
                    Create
                </button>
            </div>)}

            <div>
                {isFormOpen && <JourneyForm onClose={closeForm}></JourneyForm>}
            </div>
            {filteredData?.length > 0 ? (filteredData.map(({node: journey}: { node: Journey }) => (
                <div key={journey.id}>
                    <JourneyItem journey={journey}/>
                    {journey.status === 'CANCELLED' && (
                        <button className="btn btn__delete" onClick={() => handleDelete(journey.id)}>
                            <span>Delete</span>
                        </button>
                    )}
                </div>
            ))) : (<p>No journeys found</p>)}
            <div className="msg">
                <ToastContainer/>
            </div>
        </div>
    );
}
