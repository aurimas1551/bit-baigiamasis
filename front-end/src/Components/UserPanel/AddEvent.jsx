import { useContext, useState } from "react";
import { Global } from "../Global";

function AddEvent() {

    const { setCreateEvent, userId , listCategory} = useContext(Global);

    const [name, setName] = useState("");
    const [category, setCategory] = useState("default");
    const [time, setTime] = useState("");
    const [date, setDate] = useState("");
    const [adress, setAdress] = useState("");

    const nameHandler = (e) => {
        setName(e.target.value);
    };

    const selectedCategoryHandler = (e) => {
        setCategory(e.target.value);
    }

    const adressHandler = (e) => {
        setAdress(e.target.value);
    }

    const timeHandler = (e) => {
        setTime(e.target.value);
    }

    const dateHandler = (e) => {
        setDate(e.target.value);
    }

    const dataFormHandler = (e) => {
        e.preventDefault();
        if(name.trim().length === 0 || category === "default" || time.length === 0 || date.length === 0 || adress.trim().length === 0){
            console.log("missing stuff");
        }
        else {
            let eventTime = date + " " + time + ":00";
            setCreateEvent({
                //name, category, time, place, userId
                name: name,
                category: category,
                time: eventTime,
                place: adress,
                userId: userId
            });
            setName("");
            setCategory("default");
            setTime("");
            setDate("");
            setAdress("");
            console.log(eventTime);
        }
    }

    return (
        <div>
            <h3>Event creation</h3>
            <form onSubmit={dataFormHandler}>
                <div>
                    <label>Event name</label>
                    <input type="text" value={name || ""} required onChange={nameHandler} />
                </div>
                <div>
                    <label>Event category</label>
                    <select value={category} onChange={selectedCategoryHandler}>
                    <option value="default">Not selected</option>
                        {
                            listCategory ?
                                [...listCategory].map((category) =>
                                    <option key={category.id}>
                                        {category.category}
                                    </option>
                                    )
                                : null
                        }
                    </select>
                </div>
                <div>
                    <label>Event time</label>
                    <input type="time" value={time || ""} min="00:00" max="23:59" required onChange={timeHandler} />
                    <input type="date" value={date || ""} required onChange={dateHandler}></input>
                </div>
                <div>
                    <label>Event adress</label>
                    <input type="text" value={adress || ""} required onChange={adressHandler} />
                </div>
                <button type="submit">submit event</button>

            </form>
        </div>
    )
}

export default AddEvent;