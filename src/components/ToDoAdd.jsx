import React, {useState, useRef} from 'react';
import PropTypes from 'prop-types';

const ToDoAdd = ({add}) => {
  const [valueInput, setValueInput] = useState({});
  let inputRef = useRef();

  const handleChange = (e) => {
    setValueInput({...valueInput, [e.target.name]: e.target.value});
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if(inputRef.current.value !== '') {
        add(valueInput);
        inputRef.current.value = '';
    };
  };

  return (
    <form autoComplete="off" onSubmit={handleSubmit}>
      <div className="form-group">
        <input type="text" className="form-control" placeholder="Create a new to-do..." name="name" ref={inputRef} onChange={handleChange} />
      </div>
    </form>
  );
};

ToDoAdd.propTypes = {
  add: PropTypes.func
};

export default ToDoAdd;
