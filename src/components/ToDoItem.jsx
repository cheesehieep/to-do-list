import React, {useState} from 'react';
import './ToDoItem.css';

const ToDoItem = ({item, complete, update, remove}) => {
  const [valueInput, setValueInput] = useState({name: item.name});
  const [editing, setEditing] = useState(false);
  let className = "btn flex-grow-1 shadow-none";

  const handleComplete = (id) => {
    complete(id);
  }

  const handleChange = (e) => {
    setValueInput({...valueInput, [e.target.name]: e.target.value});
  }

  const handleSubmit = () => {
    const dataTodo = Object.assign(valueInput, {id: item.id}, {isComplete: item.isComplete});
    update(item.id, dataTodo);
    setEditing(false);
  }

  const handleRemove = (id) => {
    remove(id);
  }

  return (
    <li className="d-flex align-items-center list-group-item">
      {editing ? 
        <form className="flex-grow-1" autoComplete="off" onSubmit={e => handleSubmit(e.preventDefault())}>
          <div className="form-group">
            <input 
              type="text"
              className="form-control"
              name="name"
              defaultValue={item.name} 
              ref={inputRef => inputRef && inputRef.focus()} 
              onBlur={handleSubmit}
              onChange={handleChange}
            />
          </div>
        </form>
      : <button 
          className={className + (item.isComplete ? " completed" : "")} 
          onClick={() => handleComplete(item.id)}>
          {item.name}
        </button>
      }
      <button className="btn btn-outline-primary border-0" onClick={() => setEditing(true)}><i className="fas fa-edit"></i></button>
      <button className="btn btn-outline-danger border-0" onClick={() => handleRemove(item.id)}><i className="fas fa-trash"></i></button>
    </li>
  );
};

export default ToDoItem;
