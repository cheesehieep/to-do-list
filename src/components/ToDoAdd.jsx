import React, { useState } from 'react';

const ToDoAdd = ({ add }) => {
  const [valueInput, setValueInput] = useState('');

  const handleChange = (e) => {
    setValueInput({ ...valueInput, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if(valueInput && valueInput.name !== '') {
      add(valueInput);
      setValueInput({ name: "" });
      e.target.reset();
    };
  };

  return (
    <form autoComplete="off" onSubmit={handleSubmit}>
      <div className="form-group">
        <input type="text" className="form-control" placeholder="Create a new to-do..." name="name" onChange={handleChange} />
      </div>
    </form>
  );
};

export default ToDoAdd;
