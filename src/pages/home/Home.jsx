import React, { useState, useEffect } from "react";
import AddTaskForm from "./AddTaskForm";
import SortTaskForm from "./SortTaskForm";
import TodoList from "../../components/todo-list/TodoList";
import Header from "../layout/Header";

function Home() {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState(false);
  const [sort, setSort] = useState(false)
  const [sortedTasks, setSortedTasks] = useState([])
  const [filteredTasks, setFilteredTasks] = useState([])
  

  useEffect(() => {
    const storedTasks = localStorage.getItem("tasks");
    if (storedTasks) {
      setTasks(JSON.parse(storedTasks));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const handleAddTask = (newTask) => {
    setSort(false)
    setFilter(false)
    setTasks((prevTasks) => [...prevTasks, newTask]);
  };

  const handleDeleteTask = (taskId) => {
    const updatedTasks = tasks.filter((task) => task.startTime !== taskId)
    setTasks(updatedTasks)
    console.log(updatedTasks)
    localStorage.setItem("tasks", JSON.stringify(updatedTasks))
  }

  
  const handleFilterTodoList = (filterName) => {
    setFilter(true)
    setSort(false)
    const filteredTasks = tasks.filter((task) =>
      task.name.includes(filterName)
    )
    setFilteredTasks(filteredTasks)
}

const handleSortTask = (typeSort) => {
  setSort(true)
  setFilter(false)
  switch(typeSort) {
    case 'descend': {
      const tmpsortedTasks = [...tasks].sort((a, b) => b.startTime - a.startTime);
      setSortedTasks(tmpsortedTasks);
    }
      break
    case 'ascend':{
      const tmpsortedTasks = [...tasks].sort((a, b) => a.startTime - b.startTime);
      setSortedTasks(tmpsortedTasks);
    }
    break
    default:
  }
}


  return (
    <div>
      <Header />
      <AddTaskForm onAddTask={handleAddTask} />
      <SortTaskForm onFilterTask={handleFilterTodoList} onSortTask={handleSortTask}/>
      {filter && !sort && <TodoList tasks={filteredTasks} onDeleteTask={handleDeleteTask}/>}
      {sort && !filter && <TodoList tasks={sortedTasks} onDeleteTask={handleDeleteTask}/>}
      {!filter && !sort && <TodoList tasks={tasks} onDeleteTask={handleDeleteTask}/>}
      
       
    </div>
  );
}

export default Home;


/*
import React, { useState, useEffect } from "react";
import AddTaskForm from "./AddTaskForm";
import SortTaskForm from "./SortTaskForm";
import TodoList from "../../components/todo-list/TodoList";
import Header from "../layout/Header";

function Home() {
  const [tasks, setTasks] = useState([]);
  const [sorting, setSorting] = useState(false);

  useEffect(() => {
    const storedTasks = localStorage.getItem("tasks");
    if (storedTasks) {
      setTasks(JSON.parse(storedTasks));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const handleAddTask = (newTask) => {
    setTasks((prevTasks) => [...prevTasks, newTask]);
  };

  const handleDeleteTask = (taskId) => {
    const updatedTasks = tasks.filter((task) => task.startTime !== taskId)
    setTasks(updatedTasks)
    console.log(updatedTasks)
    localStorage.setItem("tasks", JSON.stringify(updatedTasks))
  }

  const handleFilterTodoList = (filterName) => {
    const filteredTasks = tasks.filter((task) =>
      tasks.name.includes(filterName)
    )
    console.log(filteredTasks)
    return filteredTasks
    
  }

  return (
    <div>
      <Header />
      <AddTaskForm onAddTask={handleAddTask} />
      <SortTaskForm onFilterTask={handleFilterTodoList}/>
      <TodoList tasks={tasks} onDeleteTask={handleDeleteTask}/>
       
    </div>
  );
}

export default Home;


*/