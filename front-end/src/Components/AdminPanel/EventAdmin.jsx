import { useContext, useState } from "react";
import { Global } from "../Global";

function EventAdmin() {

    const { listEvents, setEditEvent, setCreateCategory } = useContext(Global);

    const [category, setCategory] = useState("");
    
    const statusEventHandler = (id, eventStatus) => {
        let event = listEvents.find((e) => e.id === id);
        event.status = eventStatus;
        console.log(event.time);
        setEditEvent(event);
    }

    const categoryHandler = (e) => {
        setCategory(e.target.value);
    }

    const categoryAddHandler = () => {
        setCreateCategory({
            category: category
        });
        setCategory("");
    }

    return (
        <div>
            <div>
            <label>Category name</label>
            <input type="text" value={category || ""} required onChange={categoryHandler} />
            <button onClick={() => categoryAddHandler()}>Add category</button>
            </div>
        <div>
            {
                listEvents
                ? [...listEvents].map((e) => (
                    <div key={e.id}>
                        <div>
                            Id: {e.id}, Name: {e.name}, Category: {e.category}, Time: {e.time}, 
                            Place: {e.place}, Status: {e.status}, UserId: {e.userId}
                            {
                                e.status === 0
                                ? <button onClick={() => statusEventHandler(e.id, 1)}>Allow</button>
                                : <button onClick={() => statusEventHandler(e.id, 0)}>Block</button>
                            }
                        </div>
                    </div>
                ))
                : null
            }
        </div>
        </div>
    )
}

export default EventAdmin;