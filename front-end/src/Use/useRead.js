import axios from "axios";
import { useEffect, useState } from "react";
const URL = 'http://localhost:3003';
const urlEvents = '/events';
const urlCategory = '/categories';

export const useRead = () => {

    const [update, setUpdate] = useState(null);
    const [listEvents, setListEvents] = useState(null);
    const [listCategory, setListCategory] = useState(null);

    useEffect(() => {
        if (null === update) {
            return;
        }
        axios.get(URL + urlEvents)
            .then(res => setListEvents(res.data));

    }, [update]);

    useEffect(() => {
        if (null === update) {
            return;
        }
        axios.get(URL + urlCategory)
            .then(res => setListCategory(res.data));

    }, [update]);

    return [listEvents, listCategory, setUpdate];

}