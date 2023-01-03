import React from "react";

type FilterProps = {
    statusFilter: string;
    sortingBy: string;
    changeFilter(filter: string): void;
    changeSorting(sortBy: string): void
}
export const Filters: React.FC<FilterProps> = (
    {
        statusFilter,
        sortingBy,
        changeFilter,
        changeSorting
    }
) => {
    return (
        <div className="flexRow">
            <div>
                <div className="label">
                    <label>Filter by status</label>
                </div>
                <div>
                    <select
                        name="filterByStatus"
                        value={statusFilter}
                        onChange={e => changeFilter(e.target.value)}
                    >
                        <option value="all">All</option>
                        <option value="completed">Completed</option>
                        <option value="uncompleted">Not completed</option>
                    </select>
                </div>

            </div>
            <div>
                <div className="label">
                    <label>Sort by </label>
                </div>
                <div>
                    <select
                        name="sortBy"
                        value={sortingBy}
                        onChange={e => changeSorting(e.target.value)}
                    >
                        <option value="date">Date</option>
                        <option value="title">Title</option>
                    </select>
                </div>

            </div>
        </div>
    )
}
