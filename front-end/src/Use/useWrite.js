import axios from "axios";
import { useEffect, useState } from "react";

const URL = 'http://localhost:3003/';
const urlEvent = 'event';
const urlEvents = 'events';

export const useWrite = () => {

    const [response, setResponse] = useState(null);
    const [editEvent, setEditEvent] = useState(null);
    const [createCategory, setCreateCategory] = useState(null);

    //event
    const [createEvent, setCreateEvent] = useState(null);

    useEffect(() => {
        if (null === createEvent) {
            return;
        }
        axios.post(URL+urlEvent, createEvent)
            .then(res => setResponse(res.data));

    }, [createEvent]);

    useEffect(() => {
        if (null === createCategory) {
            return;
        }
        axios.post(URL+ "categories", createCategory)
            .then(res => setResponse(res.data));

    }, [createCategory]);

    useEffect(() => {
        if (null === editEvent) {
            return;
        }
        axios.put(URL + urlEvents + "/"+ editEvent.id, editEvent)
            .then(res => setResponse(res.data));

    }, [editEvent]);

    return [response, setCreateEvent, setEditEvent, setCreateCategory];

}