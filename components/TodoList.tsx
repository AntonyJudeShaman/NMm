import { Database } from '@/lib/schema'
import { Session, useSupabaseClient } from '@supabase/auth-helpers-react'
import { useEffect, useState } from 'react'
import toast, { Toaster } from 'react-hot-toast';
import { Button } from './ui/button';

type Todos = Database['public']['Tables']['todos']['Row']

export default function TodoList({ session }: { session: Session }) {
  const supabase = useSupabaseClient<Database>()
  const [todos, setTodos] = useState<Todos[]>([])
  const [newTaskText, setNewTaskText] = useState('')
  const [filter, setFilter] = useState<'all' | 'completed' | 'incomplete'>('all');

  const user = session.user

  useEffect(() => {
    const fetchTodos = async () => {
      let { data: todos, error } = await supabase
        .from('todos')
        .select('*')
        .order('id', { ascending: true });

      if (error) console.log('error', error)
      else {
        if (filter === 'completed') {
          todos = todos.filter(todo => todo.is_complete);
        } else if (filter === 'incomplete') {
          todos = todos.filter(todo => !todo.is_complete);
        }

        setTodos(todos);
      }
    }

    fetchTodos()
  }, [supabase, filter]);

  const addTodo = async (taskText: string) => {
    let task = taskText.trim();
    if (task.length) {
      try {
        const { data: todo, error } = await supabase
          .from('todos')
          .insert({ task, user_id: user.id })
          .select()
          .single()

        if (error) {
          throw new Error(error.message);
        } else {
          setTodos([...todos, todo])
          setNewTaskText('')
          toast.success('Todo added successfully!');
        }
      } catch (error) {
        toast.error(error.message);
      }
    } else {
      toast.error('Task cannot be empty!');
    }
  }

  const deleteTodo = async (id: string) => {
    try {
      await supabase.from('todos').delete().eq('id', id).throwOnError()
      setTodos(todos.filter((x) => x.id !== id))
      toast.success('Todo deleted successfully!');
    } catch (error) {
      toast.error(error.message);
    }
  }

  const toggleTodo = async (id: string, isComplete: boolean) => {
    try {
      const { data } = await supabase
        .from('todos')
        .update({ is_complete: !isComplete })
        .eq('id', id)
        .throwOnError()
        .select()
        .single()

      if (data) {
        const updatedTodos = todos.map(todo =>
          todo.id === id ? { ...todo, is_complete: data.is_complete } : todo
        );
        setTodos(updatedTodos);
        toast.success('Todo updated successfully!');
      }
    } catch (error) {
      toast.error(error.message);
    }
  }

  const editTodo = async (id: string, updatedTask: string) => {
    try {
      const { data } = await supabase
        .from('todos')
        .update({ task: updatedTask })
        .eq('id', id)
        .throwOnError()
        .select()
        .single()

      if (data) {
        const updatedTodos = todos.map(todo =>
          todo.id === id ? { ...todo, task: data.task } : todo
        );
        setTodos(updatedTodos);
        toast.success('Todo edited successfully!');
      }
    } catch (error) {
      toast.error(error.message);
    }
  }

  return (
    <div className="w-full">
      <h1 className="text-3xl  -mt-20 font-bold mb-4">Todo List</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault()
          addTodo(newTaskText)
        }}
        className="flex gap-2 my-2"
      >
        <input
          className="rounded p-2 flex-grow"
          type="text"
          placeholder="Add a new task"
          value={newTaskText}
          onChange={(e) => {
            setNewTaskText(e.target.value)
          }}
        />
        <button className="btn-black" type="submit">
          Add
        </button>
      </form>
      <div className="flex items-center mt-4">
        <span className="mr-2">Show:</span>
        <select
          value={filter}
          onChange={(e) => {
            setFilter(e.target.value as 'all' | 'completed' | 'incomplete');
          }}
          className="p-2 border rounded"
        >
          <option value="all">All</option>
          <option value="completed">Completed</option>
          <option value="incomplete">Incomplete</option>
        </select>
      </div>
      <div className="bg-white shadow overflow-hidden rounded-md mt-4">
        <ul>
          {todos.map((todo) => (
            <Todo
              key={todo.id}
              todo={todo}
              onDelete={() => deleteTodo(todo.id)}
              onToggle={() => toggleTodo(todo.id, todo.is_complete)}
              onEdit={(updatedTask) => editTodo(todo.id, updatedTask)}
            />
          ))}
        </ul>
      </div>
      <Toaster />
    </div>
  )
}

const Todo = ({ todo, onDelete, onToggle, onEdit }: { todo: Todos; onDelete: () => void; onToggle: () => void; onEdit: (updatedTask: string) => void }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTask, setEditedTask] = useState(todo.task);

  const handleEdit = () => {
    setIsEditing(true);
  }

  const handleSave = () => {
    onEdit(editedTask);
    setIsEditing(false);
  }

  return (
    <li className="border-b border-gray-200">
      <div className="flex items-center justify-between px-4 py-3">
        <div className="flex items-center">
          <input
            className="cursor-pointer"
            type="checkbox"
            checked={todo.is_complete}
            onChange={onToggle}
          />
          {isEditing ? (
            <input
              className="ml-2 px-2 py-1 border rounded"
              type="text"
              value={editedTask}
              onChange={(e) => setEditedTask(e.target.value)}
            />
          ) : (
            <span className={`ml-2 ${todo.is_complete ? 'line-through text-gray-500' : 'text-black'}`}>
              {todo.task}
            </span>
          )}
        </div>
        <div className="flex items-center">
          {isEditing ? (
            <Button className="text-green-500 text-md  hover:text-green-700 te" onClick={handleSave}>
              Save
            </Button>
          ) : (
            <>
              <Button  className="text-blue-500 text-md bg-blue-100 hover:text-blue-700" onClick={handleEdit}>
                Edit
              </Button>
              <Button
                onClick={(e) => {
                  e.preventDefault()
                  e.stopPropagation()
                  onDelete()
                }}
                className="ml-2 text-red-500 text-md bg-red-100 hover:bg-red-300 hover:text-red-700"
              >
                Delete
              </Button>
            </>
          )}
        </div>
      </div>
    </li>
  )
}
