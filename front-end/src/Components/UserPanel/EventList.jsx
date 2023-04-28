import { useContext, useState } from "react";
import { Global } from "../Global";

function EventList() {

    const { listEvents, setEditEvent, userId } = useContext(Global);

    return (
        <div>
            {
                listEvents
                ? [...listEvents].filter((e) => e.userId === userId).map((e) => (
                    <div key={e.id}>
                        Name: {e.name}, Place: {e.place}, Category: {e.category}, Time: {e.time}
                    </div>
                ))
                : null
            }
        </div>
    )
}

export default EventList;