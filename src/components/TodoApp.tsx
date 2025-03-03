// import React, { useState, useEffect } from 'react';
// import { motion } from 'framer-motion';
// import { PlusCircle, CheckCircle, Circle, Trash2 } from 'lucide-react';
// import { fetchTodos, addTodo, updateTodoStatus, deleteTodo } from '../services/todoService';
// import { Todo } from '../types';
// import MotivationalQuote from './MotivationalQuote';

// const TodoApp: React.FC = () => {
//   const [todos, setTodos] = useState<Todo[]>([]);
//   const [title, setTitle] = useState('');
//   const [description, setDescription] = useState('');
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');

//   useEffect(() => {
//     loadTodos();
//   }, []);

//   const loadTodos = async () => {
//     try {
//       setLoading(true);
//       const data = await fetchTodos();
//       setTodos(data);
//       setError('');
//     } catch (err) {
//       setError('Failed to load todos. Please try again.');
//       console.error(err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleAddTodo = async (e: React.FormEvent) => {
//     e.preventDefault();
    
//     if (!title.trim()) return;
    
//     try {
//       const newTodo = await addTodo({ title, description });
//       setTodos([newTodo, ...todos]);
//       setTitle('');
//       setDescription('');
//     } catch (err) {
//       setError('Failed to add todo. Please try again.');
//       console.error(err);
//     }
//   };

//   const handleToggleComplete = async (id: string, completed: boolean) => {
//     try {
//       const updatedTodo = await updateTodoStatus(id, !completed);
//       setTodos(todos.map(todo => todo._id === id ? updatedTodo : todo));
//     } catch (err) {
//       setError('Failed to update todo status. Please try again.');
//       console.error(err);
//     }
//   };

//   const handleDeleteTodo = async (id: string) => {
//     try {
//       await deleteTodo(id);
//       setTodos(todos.filter(todo => todo._id !== id));
//     } catch (err) {
//       setError('Failed to delete todo. Please try again.');
//       console.error(err);
//     }
//   };

//   const pendingTodos = todos.filter(todo => !todo.completed);
//   const completedTodos = todos.filter(todo => todo.completed);

//   return (
//     <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8 flex flex-col items-center">
//       <motion.div 
//         initial={{ opacity: 0, y: -20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.5 }}
//         className="w-full max-w-4xl"
//       >
//         <h1 className="text-4xl font-bold text-white text-center mb-2">Motivational Todo List</h1>
//         <MotivationalQuote />
        
//         {error && (
//           <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
//             {error}
//           </div>
//         )}
        
//         <motion.div 
//           initial={{ opacity: 0, scale: 0.9 }}
//           animate={{ opacity: 1, scale: 1 }}
//           transition={{ delay: 0.2, duration: 0.5 }}
//           className="bg-white/10 backdrop-blur-lg rounded-xl p-6 shadow-xl mb-8 border border-white/20"
//         >
//           <form onSubmit={handleAddTodo} className="space-y-4">
//             <div>
//               <label htmlFor="title" className="block text-white font-medium mb-1">Title</label>
//               <input
//                 type="text"
//                 id="title"
//                 value={title}
//                 onChange={(e) => setTitle(e.target.value)}
//                 className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
//                 placeholder="What needs to be done?"
//               />
//             </div>
//             <div>
//               <label htmlFor="description" className="block text-white font-medium mb-1">Description</label>
//               <textarea
//                 id="description"
//                 value={description}
//                 onChange={(e) => setDescription(e.target.value)}
//                 className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
//                 placeholder="Add some details..."
//                 rows={3}
//               />
//             </div>
//             <button
//               type="submit"
//               className="w-full flex items-center justify-center space-x-2 bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600 text-white font-bold py-2 px-4 rounded-lg transition-all duration-300 transform hover:scale-105"
//             >
//               <PlusCircle size={20} />
//               <span>Add Task</span>
//             </button>
//           </form>
//         </motion.div>
        
//         <div className="space-y-8">
//           {/* Pending Todos */}
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: 0.3, duration: 0.5 }}
//             className="bg-white/10 backdrop-blur-lg rounded-xl p-6 shadow-xl border border-white/20"
//           >
//             <h2 className="text-2xl font-bold text-white mb-4 flex items-center">
//               <Circle className="mr-2" size={24} />
//               Tasks to Complete ({pendingTodos.length})
//             </h2>
            
//             {loading ? (
//               <div className="flex justify-center py-8">
//                 <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-white"></div>
//               </div>
//             ) : pendingTodos.length === 0 ? (
//               <p className="text-white/70 text-center py-4">No pending tasks. Add a new one!</p>
//             ) : (
//               <ul className="space-y-3">
//                 {pendingTodos.map((todo) => (
//                   <motion.li
//                     key={todo._id}
//                     initial={{ opacity: 0, x: -20 }}
//                     animate={{ opacity: 1, x: 0 }}
//                     exit={{ opacity: 0, x: 20 }}
//                     transition={{ duration: 0.3 }}
//                     className="bg-white/5 rounded-lg p-4 border border-white/10 hover:bg-white/10 transition-colors"
//                   >
//                     <div className="flex items-start justify-between">
//                       <div className="flex-1">
//                         <h3 className="text-lg font-semibold text-white">{todo.title}</h3>
//                         {todo.description && (
//                           <p className="text-white/70 mt-1">{todo.description}</p>
//                         )}
//                       </div>
//                       <div className="flex space-x-2">
//                         <button
//                           onClick={() => handleToggleComplete(todo._id, todo.completed)}
//                           className="text-green-400 hover:text-green-300 transition-colors"
//                           title="Mark as completed"
//                         >
//                           <Circle size={20} />
//                         </button>
//                         <button
//                           onClick={() => handleDeleteTodo(todo._id)}
//                           className="text-red-400 hover:text-red-300 transition-colors"
//                           title="Delete task"
//                         >
//                           <Trash2 size={20} />
//                         </button>
//                       </div>
//                     </div>
//                   </motion.li>
//                 ))}
//               </ul>
//             )}
//           </motion.div>
          
//           {/* Completed Todos */}
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: 0.4, duration: 0.5 }}
//             className="bg-white/10 backdrop-blur-lg rounded-xl p-6 shadow-xl border border-white/20"
//           >
//             <h2 className="text-2xl font-bold text-white mb-4 flex items-center">
//               <CheckCircle className="mr-2" size={24} />
//               Completed Tasks ({completedTodos.length})
//             </h2>
            
//             {loading ? (
//               <div className="flex justify-center py-8">
//                 <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-white"></div>
//               </div>
//             ) : completedTodos.length === 0 ? (
//               <p className="text-white/70 text-center py-4">No completed tasks yet. Start checking off your list!</p>
//             ) : (
//               <ul className="space-y-3">
//                 {completedTodos.map((todo) => (
//                   <motion.li
//                     key={todo._id}
//                     initial={{ opacity: 0, x: -20 }}
//                     animate={{ opacity: 1, x: 0 }}
//                     exit={{ opacity: 0, x: 20 }}
//                     transition={{ duration: 0.3 }}
//                     className="bg-white/5 rounded-lg p-4 border border-white/10 hover:bg-white/10 transition-colors"
//                   >
//                     <div className="flex items-start justify-between">
//                       <div className="flex-1">
//                         <h3 className="text-lg font-semibold text-white line-through opacity-70">{todo.title}</h3>
//                         {todo.description && (
//                           <p className="text-white/50 mt-1 line-through">{todo.description}</p>
//                         )}
//                       </div>
//                       <div className="flex space-x-2">
//                         <button
//                           onClick={() => handleToggleComplete(todo._id, todo.completed)}
//                           className="text-purple-400 hover:text-purple-300 transition-colors"
//                           title="Mark as incomplete"
//                         >
//                           <CheckCircle size={20} />
//                         </button>
//                         <button
//                           onClick={() => handleDeleteTodo(todo._id)}
//                           className="text-red-400 hover:text-red-300 transition-colors"
//                           title="Delete task"
//                         >
//                           <Trash2 size={20} />
//                         </button>
//                       </div>
//                     </div>
//                   </motion.li>
//                 ))}
//               </ul>
//             )}
//           </motion.div>
//         </div>
//       </motion.div>
//     </div>
//   );
// };

// export default TodoApp;

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PlusCircle, CheckCircle, Circle, Trash2, Calendar, Clock, ChevronUp, ChevronDown } from 'lucide-react';
import { fetchTodos, addTodo, updateTodoStatus, deleteTodo } from '../services/todoService';
import { Todo } from '../types';
import MotivationalQuote from './MotivationalQuote';

const TodoApp: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showCompletedTasks, setShowCompletedTasks] = useState(true);

  useEffect(() => {
    loadTodos();
  }, []);

  const loadTodos = async () => {
    try {
      setLoading(true);
      const data = await fetchTodos();
      setTodos(data);
      setError('');
    } catch (err) {
      setError('Failed to load todos. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddTodo = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title.trim()) return;
    
    try {
      setLoading(true);
      const newTodo = await addTodo({ title, description });
      setTodos([newTodo, ...todos]);
      setTitle('');
      setDescription('');
    } catch (err) {
      setError('Failed to add todo. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleToggleComplete = async (id: string, completed: boolean) => {
    try {
      const updatedTodo = await updateTodoStatus(id, !completed);
      setTodos(todos.map(todo => todo._id === id ? updatedTodo : todo));
    } catch (err) {
      setError('Failed to update todo status. Please try again.');
      console.error(err);
    }
  };

  const handleDeleteTodo = async (id: string) => {
    try {
      await deleteTodo(id);
      setTodos(todos.filter(todo => todo._id !== id));
    } catch (err) {
      setError('Failed to delete todo. Please try again.');
      console.error(err);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  const pendingTodos = todos.filter(todo => !todo.completed);
  const completedTodos = todos.filter(todo => todo.completed);

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 flex flex-col items-center">
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-4xl pb-12"
      >
        <motion.h1 
          className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-500 text-center mb-2"
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5, type: "spring" }}
        >
          Motivational Todo List
        </motion.h1>
        <MotivationalQuote />
        
        {error && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded-md shadow-md mb-6"
          >
            <div className="flex">
              <div className="py-1">
                <svg className="h-6 w-6 text-red-500 mr-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <div>
                <p className="font-bold">Error</p>
                <p className="text-sm">{error}</p>
              </div>
            </div>
          </motion.div>
        )}
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="bg-gradient-to-br from-purple-900/40 to-blue-900/40 backdrop-blur-lg rounded-2xl p-6 shadow-xl mb-8 border border-white/20"
        >
          <form onSubmit={handleAddTodo} className="space-y-4">
            <div>
              <label htmlFor="title" className="block text-white font-medium mb-1">Task Title</label>
              <input
                type="text"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
                placeholder="What needs to be done?"
              />
            </div>
            <div>
              <label htmlFor="description" className="block text-white font-medium mb-1">Description</label>
              <textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
                placeholder="Add some details..."
                rows={3}
              />
            </div>
            <motion.button
              type="submit"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full flex items-center justify-center space-x-2 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-bold py-3 px-6 rounded-xl shadow-lg transition-all duration-300"
            >
              <PlusCircle size={20} />
              <span>Add New Task</span>
            </motion.button>
          </form>
        </motion.div>
        
        <div className="space-y-8">
          {/* Pending Todos */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="bg-gradient-to-br from-indigo-900/40 to-purple-900/40 backdrop-blur-lg rounded-2xl p-6 shadow-xl border border-white/20"
          >
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
              <Circle className="mr-3 text-blue-400" size={24} />
              Tasks to Complete ({pendingTodos.length})
            </h2>
            
            {loading ? (
              <div className="flex justify-center py-8">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
              </div>
            ) : pendingTodos.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-10 text-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 260, damping: 20 }}
                  className="w-16 h-16 bg-blue-500/20 rounded-full flex items-center justify-center mb-4"
                >
                  <CheckCircle size={32} className="text-blue-400" />
                </motion.div>
                <p className="text-white/70 text-lg">All caught up! Add a new task to get started.</p>
              </div>
            ) : (
              <ul className="space-y-4">
                <AnimatePresence>
                  {pendingTodos.map((todo) => (
                    <motion.li
                      key={todo._id}
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, x: -100 }}
                      transition={{ duration: 0.3 }}
                      className="bg-white/10 rounded-xl p-5 border border-white/20 hover:bg-white/15 transition-all duration-300 shadow-md"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h3 className="text-xl font-semibold text-white">{todo.title}</h3>
                          {todo.description && (
                            <p className="text-white/80 mt-2 text-base">{todo.description}</p>
                          )}
                          <div className="flex items-center mt-3 text-white/60 text-sm">
                            <Calendar size={14} className="mr-1" />
                            <span className="mr-4">{formatDate(todo.createdAt)}</span>
                          </div>
                        </div>
                        <div className="flex space-x-3">
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => handleToggleComplete(todo._id, todo.completed)}
                            className="text-green-400 hover:text-green-300 transition-colors bg-green-500/10 p-2 rounded-full"
                            title="Mark as completed"
                          >
                            <Circle size={20} />
                          </motion.button>
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => handleDeleteTodo(todo._id)}
                            className="text-red-400 hover:text-red-300 transition-colors bg-red-500/10 p-2 rounded-full"
                            title="Delete task"
                          >
                            <Trash2 size={20} />
                          </motion.button>
                        </div>
                      </div>
                    </motion.li>
                  ))}
                </AnimatePresence>
              </ul>
            )}
          </motion.div>
          
          {/* Completed Todos */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="bg-gradient-to-br from-blue-900/40 to-indigo-900/40 backdrop-blur-lg rounded-2xl p-6 shadow-xl border border-white/20"
          >
            <div 
              className="flex items-center justify-between cursor-pointer"
              onClick={() => setShowCompletedTasks(!showCompletedTasks)}
            >
              <h2 className="text-2xl font-bold text-white mb-2 flex items-center">
                <CheckCircle className="mr-3 text-green-400" size={24} />
                Completed Tasks ({completedTodos.length})
              </h2>
              <button className="text-white/70 hover:text-white transition-colors">
                {showCompletedTasks ? <ChevronUp size={24} /> : <ChevronDown size={24} />}
              </button>
            </div>
            
            <AnimatePresence>
              {showCompletedTasks && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  {loading ? (
                    <div className="flex justify-center py-8">
                      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
                    </div>
                  ) : completedTodos.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-10 text-center">
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", stiffness: 260, damping: 20 }}
                        className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mb-4"
                      >
                        <Clock size={32} className="text-green-400" />
                      </motion.div>
                      <p className="text-white/70 text-lg">No completed tasks yet. Start checking off your list!</p>
                    </div>
                  ) : (
                    <ul className="space-y-4 mt-4">
                      <AnimatePresence>
                        {completedTodos.map((todo) => (
                          <motion.li
                            key={todo._id}
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, x: -100 }}
                            transition={{ duration: 0.3 }}
                            className="bg-white/5 rounded-xl p-5 border border-white/10 hover:bg-white/10 transition-all duration-300 shadow-md"
                          >
                            <div className="flex items-start justify-between">
                              <div className="flex-1">
                                <h3 className="text-xl font-semibold text-white/70 line-through">{todo.title}</h3>
                                {todo.description && (
                                  <p className="text-white/50 mt-2 text-base line-through">{todo.description}</p>
                                )}
                                <div className="flex items-center mt-3 text-white/40 text-sm">
                                  <Calendar size={14} className="mr-1" />
                                  <span>{formatDate(todo.createdAt)}</span>
                                </div>
                              </div>
                              <div className="flex space-x-3">
                                <motion.button
                                  whileHover={{ scale: 1.1 }}
                                  whileTap={{ scale: 0.9 }}
                                  onClick={() => handleToggleComplete(todo._id, todo.completed)}
                                  className="text-purple-400 hover:text-purple-300 transition-colors bg-purple-500/10 p-2 rounded-full"
                                  title="Mark as incomplete"
                                >
                                  <CheckCircle size={20} />
                                </motion.button>
                                <motion.button
                                  whileHover={{ scale: 1.1 }}
                                  whileTap={{ scale: 0.9 }}
                                  onClick={() => handleDeleteTodo(todo._id)}
                                  className="text-red-400 hover:text-red-300 transition-colors bg-red-500/10 p-2 rounded-full"
                                  title="Delete task"
                                >
                                  <Trash2 size={20} />
                                </motion.button>
                              </div>
                            </div>
                          </motion.li>
                        ))}
                      </AnimatePresence>
                    </ul>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default TodoApp;