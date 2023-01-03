import React, {useCallback, useEffect, useState} from "react";
import {TodoForm} from "../components/TodoForm";
import {TodoList} from "../components/TodoList";

import {ITodo} from "../interfaces";
import {Filters} from "../components/Filters";

export const TodosPage: React.FC = () => {

    const getTasks = useCallback(() => {
        const savedTasks = JSON.parse(localStorage.getItem('todos') || '[]') as ITodo[];
        return savedTasks;
    }, []);

    const [todos, setTodos] = useState<ITodo[]>(getTasks);
    const [isShowForm, setIsShowForm] = useState<boolean>(false);
    const [sortingBy, setSortingBy] = useState("date");
    const [statusFilter, setStatusFilter] = useState("all");
    const [selectedTask, setSelectedTask] = useState<ITodo[]>([]);

    function getSelectedTask(): ITodo[] {
        let selectedTask: ITodo[];
        switch (statusFilter) {
            case "completed":
                selectedTask = todos.filter(task => task.completed === true);
                break;
            case "uncompleted":
                selectedTask = todos.filter(task => task.completed === false);
                break;
            default:
                selectedTask = [...todos];
        }
        switch (sortingBy) {
            case "date":
                return selectedTask.sort((a, b) => a.date - b.date);
            case "title":
                return selectedTask.sort((a, b) =>
                    a.title < b.title ? -1 : 1
                );
            default:
                return selectedTask;
        }
    }

    useEffect(() => {
        async function saveData() {
            await localStorage.setItem('todos', JSON.stringify(todos))
        }
        saveData();
    }, [todos]);

    useEffect(() => {
        setSelectedTask(getSelectedTask());
    }, [sortingBy, statusFilter,todos])

    function addHandler(title: string): void {
        const date = Date.now();
        const newTodo: ITodo = {
            id: date,
            title: title,
            date: date,
            completed: false
        }
        setTodos(prev => [newTodo, ...prev]);
    }

    const checkBoxToggleHandler = (id: number) => {
        setTodos(prev => prev.map(todo =>
            todo.id === id
                ? ({...todo, completed: !todo.completed})
                : todo
        ));
    }

    const titleUpdateHandler = (id: number, title: string) => {
        setTodos(prev => prev.map(todo =>
            todo.id === id
                ? ({...todo, title})
                : todo
        ));
    }

    const removeHandler = (id: number) => {
        setTodos(prev => prev.filter(todo => todo.id !== id));
    }

    return (
        <div className='listWrapper'>
            <Filters
                sortingBy={sortingBy}
                statusFilter={statusFilter}
                changeFilter={setStatusFilter}
                changeSorting={setSortingBy}
            />
            {isShowForm &&
                <TodoForm
                    onAdd={addHandler}
                    setIsShowForm={setIsShowForm}
                />
            }
            <TodoList
                todos={selectedTask}
                onToggle={checkBoxToggleHandler}
                onRemove={removeHandler}
                setIsShowForm={setIsShowForm}
                titleUpdate={titleUpdateHandler}
            />

        </div>
    )
}
