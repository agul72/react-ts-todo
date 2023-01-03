import React, {useState} from "react";

interface TodoFormProps {
    onAdd(title: string): void;

    setIsShowForm(value: boolean): void;
}

export const TodoForm: React.FC<TodoFormProps> = (props) => {

    const [title, setTitle] = useState<string>('');


    function changeHandler(event: React.ChangeEvent<HTMLInputElement>) {
        setTitle(event.target.value);
    }

    function keyPressHandler(event: React.KeyboardEvent) {
        event.preventDefault();
        if (event.key === 'Enter') {
            if (!!title.length) {
                props.onAdd(title);
                props.setIsShowForm(false);
                setTitle('');
            }

        }
    }

    function addBtnHandler() {
        if (!!title.length) {
            props.onAdd(title);
            props.setIsShowForm(false);
            setTitle('');
        }
    }

    function cancelBtnHandler() {
        props.setIsShowForm(false);
        setTitle('');
    }

    return (
        <form className="form">
            <div className="input-field">
                <label htmlFor="title" className="active">
                    Todo title{" "}
                </label>
                <input
                    type="text"
                    value={title}
                    id='title'
                    autoFocus
                    onChange={changeHandler}
                    className='inputField'
                />
            </div>
                <div>
                    <button
                        className='actionBtn'
                        onClick={e => {
                            e.preventDefault();
                            addBtnHandler()
                        }}
                    >
                        Add
                    </button>
                </div>
                <div>
                    <button
                        className='actionBtn'
                        onClick={e => {
                            e.preventDefault();
                            cancelBtnHandler()
                        }}
                    >
                        Cancel
                    </button>
                </div>

        </form>
    )
}
