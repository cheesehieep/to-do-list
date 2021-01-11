import React, {useState} from 'react';
import ToDoItem from './components/ToDoItem';
import ToDoAdd from './components/ToDoAdd';

const App = () => {
  const [todos, setTodos] = useState([
    {id: 1, name: 'Do the dishes', isComplete: false},
    {id: 2, name: 'Take out the trash'},
    {id: 3, name: 'Finish doing laundry'},
  ]);
  const [search, setSearch] = useState('');

  const filtered = (todos.filter(todo => {
    return todo.name.toLowerCase().includes(search.toLowerCase());
  }));

  const add = (data) => {
    const newTodos = {
      id: Math.random(),
      ...data
    };
    setTodos([...todos, newTodos]);
  };

  const complete = (id) => {
    let item = todos.find(todo => todo.id === id);
    item.isComplete = !item.isComplete;
    const newTodos = todos.map(todo => (todo.id === id ? item : todo));
    setTodos(newTodos);
  };

  const update = (id, data) => {
    const newTodos = todos.map(todo => (todo.id === id ? data : todo));
    setTodos(newTodos);
  };

  const remove = (id) => {
    const newTodos = todos.filter(todo => todo.id !== id);
    setTodos(newTodos);
  };

  return (
    <div className="App">
      <div className="container">
        <div className="row mb-3">
          <div className="col-8">
            <h1 className="py-5 d-flex align-items-center">
              <span>My to-dos</span>
              <input type="text" className="form-control filter" placeholder="Search something..." value={search} onChange={e => setSearch(e.target.value)}></input>
            </h1>
            <ToDoAdd add={add} />
          </div>
        </div>
        <div className="row">
          <div className="col-6">
            <ul className="list-group">
              {filtered.map((item) => (
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
