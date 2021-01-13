import React, { useState, useEffect } from 'react';

import ToDoItem from './components/ToDoItem';
import ToDoAdd from './components/ToDoAdd';

const App = () => {
  const [todos, setTodos] = useState([
    { id: 1, name: 'Do the dishes', isComplete: false },
    { id: 2, name: 'Take out the trash', isComplete: false },
    { id: 3, name: 'Finish doing laundry', isComplete: false },
  ]);
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState('asc');
  const [filterByStatus, setFilterByStatus] = useState('all');

  useEffect(() => {
    if(localStorage.getItem('todos') === null) {
      localStorage.setItem('todos', JSON.stringify([]));
    } else {
      const localTodos = JSON.parse(localStorage.getItem('todos'));
      setTodos(localTodos);
    }
  }, []);

  const filteredByName = todos.filter(todo => {
    return todo.name.toLowerCase().includes(search.toLowerCase());
  });

  const sorted = filteredByName.sort((a, b) => {
    const isReversed = (sort === 'asc') ? 1 : -1;
    return isReversed * a.name.localeCompare(b.name);
  });

  const filterdByStatus = sorted.filter(todo => {
    if(filterByStatus === 'all') {
      return todo;
    };
    const status = filterByStatus === '1' ? false : true;
    return todo.isComplete === status;
  });

  const add = (data) => {
    const newTodos = {
      id: Math.random(),
      ...data,
      isComplete: false
    };
    setTodos([...todos, newTodos]);
    localStorage.setItem('todos', JSON.stringify([...todos, newTodos]));
  };

  const complete = (id) => {
    let item = todos.find(todo => todo.id === id);
    item.isComplete = !item.isComplete;
    const newTodos = todos.map(todo => (todo.id === id ? item : todo));
    setTodos(newTodos);
    localStorage.setItem('todos', JSON.stringify(newTodos));
  };

  const update = (id, data) => {
    const newTodos = todos.map(todo => (todo.id === id ? data : todo));
    setTodos(newTodos);
    localStorage.setItem('todos', JSON.stringify(newTodos));
  };

  const remove = (id) => {
    const newTodos = todos.filter(todo => todo.id !== id);
    setTodos(newTodos);
    localStorage.setItem('todos', JSON.stringify(newTodos));
  };

  return (
    <div className="App">
      <div className="container">
        <div className="row mb-3">
          <div className="col-8">
            <h1 className="py-5 d-flex align-items-center">
              <span>My to-dos</span>
              <input 
                type="text" 
                className="form-control search" 
                placeholder="Search something..." 
                value={search} 
                onChange={e => setSearch(e.target.value)} 
              />
              <select className="form-control sort" onChange={e => setSort(e.target.value)}>
                <option value="asc">A - Z</option>
                <option value="desc">Z - A</option>
              </select>
              <select className="form-control sort" onChange={e => setFilterByStatus(e.target.value)}>
                <option value="all">All</option>
                <option value="1">UnCompleted</option>
                <option value="2">Completed</option>
              </select>
            </h1>
            <ToDoAdd add={add} />
          </div>
        </div>
        <div className="row">
          <div className="col-6">
            <ul className="list-group">
              {filterdByStatus.map((item) => (
                <ToDoItem 
                  key={item.id} 
                  item={item} 
                  complete={complete} 
                  update={update}
                  remove={remove}
                />
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
