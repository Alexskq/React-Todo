"use client";

import { Plus, Trash } from "lucide-react";
import { useState } from "react";
import { cn } from "@/src/utils/cn";

// custom hook
const useTodo = () => {
  const [todos, setTodos] = useState([
    {
      id: 1,
      text: "Faire les courses",
      completed: false,
    },
    {
      id: 2,
      text: "Code",
      completed: false,
    },
  ]);

  const addTodo = (todo) => {
    setTodos([...todos, { id: Date.now(), text: todo, completed: false }]);
    // setTodo("");
  };
  const updateTodo = (id, newTodo) => {
    const newTodos = todos.map((todo) => {
      if (todo.id !== id) return todo;
      return newTodo;
    });
    setTodos(newTodos);
  };
  const removeTodo = (id) => {
    const deletedTodos = todos.filter((todo) => {
      if (todo.id !== id) return todo;
    });
    setTodos(deletedTodos);
  };

  return { addTodo, updateTodo, removeTodo, todos };
};

export const Todos = () => {
  const { addTodo, updateTodo, removeTodo, todos } = useTodo();

  // const handleAddTodo = () => {
  //   addTodo(todo);
  //   setTodo("");
  // };

  return (
    <div className="card w-full max-w-md border border-base-300 bg-base-200 shadow-xl">
      <div className="card-body">
        <h2 className="card-title">Todos ({todos.length})</h2>
        <TodoForm addTodo={addTodo} />
        <div className="divider">List</div>
        <ul className="space-y-2">
          {/* Voici un exemple d'un élément "Todo" */}
          {/* Tu dois afficher ces éléments avec une liste en utilisant `.map` */}
          {todos.map((todo) => {
            return (
              <TodoItem
                key={todo.id}
                todo={todo}
                removeTodo={removeTodo}
                updateTodo={updateTodo}
              />
            );
          })}

          {todos.length === 0 ? (
            <p className="text-neutral-content">Empty</p>
          ) : null}
        </ul>
      </div>
    </div>
  );
};

const TodoForm = ({ addTodo }) => {
  const [todo, setTodo] = useState("");
  const handleAddTodo = () => {
    addTodo(todo);
    setTodo("");
  };

  return (
    <div className="flex w-full items-center gap-2">
      <label className="input input-bordered flex flex-1 items-center gap-2">
        <input
          type="checkbox"
          checked={false}
          className="checkbox checkbox-sm"
        />
        {/* 🦁 Ajoute un état "Todo" et contrôle l'input */}
        <input
          type="text"
          className="grow"
          value={todo}
          placeholder="Some task"
          onChange={(e) => setTodo(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleAddTodo();
          }}
        />
      </label>
      {/* 🦁 Lors du clic sur le bouton, appelle la méthode "addTodo" */}
      <button
        className="btn btn-primary"
        // onClick={() => addTodo()
        onClick={() => handleAddTodo()}
      >
        <Plus size={22} />
      </button>
    </div>
  );
};

const TodoItem = ({ todo, updateTodo, removeTodo }) => {
  const [isEditing, setIsEditing] = useState(false);
  return (
    <li className="flex w-full items-center gap-2" key={todo.id}>
      <div
        className={cn("input flex flex-1 items-center gap-2", {
          "input-bordered": isEditing,
        })}
      >
        <input
          type="checkbox"
          checked={todo.completed}
          className="checkbox checkbox-sm"
          onChange={() => {
            const newCompleted = !todo.completed;
            updateTodo(todo.id, {
              ...todo,
              completed: newCompleted,
            });
          }}
        />
        {isEditing ? (
          <input
            className="w-full text-red-500"
            ref={(r) => r?.focus()}
            onBlur={(e) => {
              const newValue = e.target.value;
              updateTodo(todo.id, {
                ...todo,
                text: newValue,
              });

              setIsEditing(false);
            }}
            defaultValue={todo.text}
          />
        ) : (
          <p
            className={cn({
              "line-through text-neutral-400": todo.completed,
            })}
            onClick={() => {
              setIsEditing(true);
            }}
          >
            {todo.text}
          </p>
        )}
      </div>
      <button className="btn btn-ghost" onClick={() => removeTodo(todo.id)}>
        <Trash size={16} />
      </button>
    </li>
  );
};

// export default function App() {
//   return (
//     <div className="flex w-full justify-center">
//       <Todos />
//     </div>
//   );
// }
