"use client";
import { Plus, Trash } from "lucide-react";
import { useState } from "react";
import { cn } from "@/src/utils/cn";

// custom hook
const useTodo = () => {
  const [todos, setTodos] = useState([]);

  const addTodo = (todo) => {
    setTodos([...todos, { id: Date.now(), text: todo, completed: false }]);
    // setTodo("");
    console.log({ todos });
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
  const [todo, setTodo] = useState("");
  const { addTodo, updateTodo, removeTodo, todos } = useTodo();
  const handleAddTodo = () => {
    addTodo(todo);
    setTodo("");
  };

  return (
    <div className="card w-full max-w-md border border-base-300 bg-base-200 shadow-xl">
      <div className="card-body">
        <h2 className="card-title">Todos ({todos.length})</h2>
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
        <div className="divider">List</div>
        <ul className="space-y-2">
          {/* Voici un exemple d'un élément "Todo" */}
          {/* Tu dois afficher ces éléments avec une liste en utilisant `.map` */}
          {todos.map((todo) => {
            return (
              <li className="flex w-full items-center gap-2" key={todo.id}>
                <label className="input input-bordered flex flex-1 items-center gap-2">
                  <inputpnpm
                    install
                    lucide-react
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
                  <p
                    className={cn({
                      "line-through text-neutral-400": todo.completed,
                    })}
                  >
                    {todo.text}
                  </p>
                </label>
                <button
                  className="btn btn-ghost"
                  onClick={() => removeTodo(todo.id)}
                >
                  <Trash size={16} />
                </button>
              </li>
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
