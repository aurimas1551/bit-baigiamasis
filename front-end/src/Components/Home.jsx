import { useContext, useState } from "react";
import { Global } from "./Global";

function Home() {

    const { listEvents, listCategory } = useContext(Global);

    const [sort, setSort] = useState("default");
    const [filter, setFilter] = useState("default");

    const sortHandler = (event) => {
        setSort(event.target.value);
    }

    const filterHandler = (e) => {
        setFilter(e.target.value);
    }

    return (
        <div>
            <div>
                <label htmlFor="containerContent">Sort by time: </label>
                <select id="containerContent" value={sort} onChange={sortHandler}>
                    <option value="default">Default</option>
                    <option value="asc">Ascending</option>
                    <option value="desc">Descending</option>
                </select>
            </div>
            <div>
                <label htmlFor="containerContent">Filter: </label>
                <select id="containerContent" value={filter} onChange={filterHandler}>
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
            {
                listEvents
                    ? [...listEvents].sort((a, b) =>
                        sort === "asc"
                            ? a.time.localeCompare(b.time)
                            : sort === "desc"
                                ? b.time.localeCompare(a.time)
                                : true)
                        .filter((e) => e.status === 1)
                        .filter((e) => e.category === filter || filter === "default").map((e) => (
                            <div key={e.id}>
                                Name: {e.name}, Time: {e.time}, Place: {e.place}, Category: {e.category}
                            </div>
                        ))
                    : null
            }
        </div>
    );
}

export default Home;
