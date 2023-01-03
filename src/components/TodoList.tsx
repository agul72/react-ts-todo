import React, {useState} from "react";
import {ITodo} from "../interfaces";

type TodoListProps = {
    todos: ITodo[]
    onToggle(id: number): void
    onRemove(id: number): void
    setIsShowForm(value: boolean): void
    titleUpdate(id: number, title: string): void
}

export const TodoList: React.FC<TodoListProps> =
    ({todos, onRemove, onToggle, setIsShowForm, titleUpdate}) => {
    const [editableItem, setEditableItem] = useState<number>();
    const onEditClickHandler = (id: number): void => {
        id !== editableItem
            ? setEditableItem(id)
            : setEditableItem(undefined);
    }
        return (
            <div>
                <div className="table tableHeader">
                    <div>#</div>
                    <div>Completed</div>
                    <div>Title</div>
                    <div>Date</div>
                    <div>
                        <button
                            className="addTaskBtn"
                            onClick={() => setIsShowForm(true)}
                        >
                            + Add New Task
                        </button>
                    </div>
                </div>
                <div>
                    {todos.map((todo, index) => {
                        const classes = ["table", "tableBody"];
                        if (todo.completed) {
                            classes.push('completed');
                        }
                        return (
                            <div className={classes.join(' ')} key={todo.id}>
                                <div>
                                    {index + 1}
                                </div>
                                <input
                                    type="checkbox"
                                    checked={todo.completed}
                                    onChange={() => onToggle(todo.id)}
                                />
                                <input
                                    type="text"
                                    className="listTitle"
                                    disabled={todo.id !== editableItem}
                                    value={todo.title}
                                    onChange={(e) => titleUpdate(todo.id, e.target.value)}
                                />

                                <div>{new Date(todo.date).toISOString()
                                    .split("T").join(" ").slice(0, -8)}</div>
                                <div className="btnWrapper">
                                    <div>
                                        <button
                                            onClick={() => onEditClickHandler(todo.id)}
                                        >
                                            {todo.id === editableItem ? "Done" : "Edit"}
                                        </button>
                                    </div>
                                    <div>
                                        <button
                                            onClick={() => onRemove(todo.id)}
                                        >
                                            Delete
                                        </button>
                                    </div>

                                </div>

                            </div>
                        )
                    })}
                </div>


            </div>

        )
    }
