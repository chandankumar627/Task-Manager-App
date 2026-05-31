import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import TaskBoard from '../components/TaskBoard';
import TaskModal from '../components/TaskModal';
import ConfirmModal from '../components/ConfirmModal';
import axiosInstance from '../api/axiosInstance';
import { toast } from 'react-toastify';
import { 
  Plus, 
  Search, 
  FilterX, 
  Sparkles,
  Kanban
} from 'lucide-react';

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  
  // Modals
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [taskIdToDelete, setTaskIdToDelete] = useState(null);

  // Load tasks on mount
  useEffect(() => {
    fetchTasks();
  }, []);

  // Filter tasks reactively when query or tasks change
  useEffect(() => {
    if (!searchQuery.trim()) {
      setFilteredTasks(tasks);
    } else {
      const query = searchQuery.toLowerCase();
      const filtered = tasks.filter(
        (task) =>
          task.title?.toLowerCase().includes(query) ||
          task.description?.toLowerCase().includes(query)
      );
      setFilteredTasks(filtered);
    }
  }, [searchQuery, tasks]);

  const fetchTasks = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get('/api/tasks');
      // Sort tasks by updated/created time so latest appears first
      const sortedTasks = response.data.sort(
        (a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0)
      );
      setTasks(sortedTasks);
    } catch (error) {
      console.error(error);
      const message = error.response?.data?.message || error.response?.data || error.message || 'Failed to load tasks.';
      toast.error(`Error: ${message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateTask = async (taskData) => {
    try {
      const response = await axiosInstance.post('/api/tasks', taskData);
      setTasks((prev) => [response.data, ...prev]);
      setIsTaskModalOpen(false);
      toast.success('Task created successfully!');
    } catch (error) {
      console.error(error);
      const message = error.response?.data?.message || error.response?.data || error.message || 'Failed to create task.';
      toast.error(`Error: ${message}`);
    }
  };

  const handleUpdateTask = async (taskData) => {
    if (!selectedTask) return;
    try {
      const response = await axiosInstance.put(`/api/tasks/${selectedTask.id}`, taskData);
      setTasks((prev) =>
        prev.map((t) => (t.id === selectedTask.id ? response.data : t))
      );
      setIsTaskModalOpen(false);
      setSelectedTask(null);
      toast.success('Task updated successfully!');
    } catch (error) {
      console.error(error);
      const message = error.response?.data?.message || error.response?.data || error.message || 'Failed to update task.';
      toast.error(`Error: ${message}`);
    }
  };

  const handleDeleteTask = async () => {
    if (!taskIdToDelete) return;
    try {
      await axiosInstance.delete(`/api/tasks/${taskIdToDelete}`);
      setTasks((prev) => prev.filter((t) => t.id !== taskIdToDelete));
      setIsConfirmModalOpen(false);
      setTaskIdToDelete(null);
      toast.success('Task deleted successfully.');
    } catch (error) {
      console.error(error);
      const message = error.response?.data?.message || error.response?.data || error.message || 'Failed to delete task.';
      toast.error(`Error: ${message}`);
    }
  };

  const handleMoveStage = async (task, newStage) => {
    try {
      const updatedData = {
        title: task.title,
        description: task.description,
        stage: newStage,
      };
      const response = await axiosInstance.put(`/api/tasks/${task.id}`, updatedData);
      setTasks((prev) =>
        prev.map((t) => (t.id === task.id ? response.data : t))
      );
      toast.success(`Moved to ${newStage.replace('_', ' ')}.`);
    } catch (error) {
      console.error(error);
      const message = error.response?.data?.message || error.response?.data || error.message || 'Failed to shift task stage.';
      toast.error(`Error: ${message}`);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 radial-bg flex flex-col font-sans text-slate-100">
      <Navbar />

      {/* Main Content Area - Constrained to max-w-5xl for premium balanced look */}
      <main className="flex-1 px-4 sm:px-6 lg:px-8 py-8  w-full mx-auto flex flex-col gap-6">
        
        {/* Header Title Row */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-violet-500/10 border border-violet-500/20 text-violet-400 rounded-xl">
              <Kanban className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight leading-none mb-1.5">
                Task Board
              </h2>
              <p className="text-slate-400 text-xs">
                Manage your work items across stages smoothly.
              </p>
            </div>
          </div>

          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-400 text-[11px] font-bold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Active Board</span>
          </div>
        </div>

        {/* Action Row: Search and Create Task side-by-side */}
        <div className="flex flex-col sm:flex-row items-center gap-3 w-full">
          {/* Search Capsule */}
          <div className="relative w-full sm:flex-1">
            <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-slate-500 pointer-events-none">
              <Search className="w-4 h-4" />
            </span>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-10 py-2.5 bg-slate-950/50 border border-slate-800/80 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-violet-500/30 focus:border-violet-500 transition-all text-xs sm:text-sm"
              placeholder="Search tasks..."
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-500 hover:text-slate-350 transition-colors cursor-pointer"
              >
                <FilterX className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Create Button & Stats Capsule */}
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <div className="hidden sm:inline-flex items-center px-4 py-2.5 bg-slate-950/30 border border-slate-800 rounded-xl text-slate-400 text-xs font-semibold select-none">
              Tasks: <span className="text-violet-400 font-bold ml-1.5">{tasks.length}</span>
            </div>
            
            <button
              onClick={() => {
                setSelectedTask(null);
                setIsTaskModalOpen(true);
              }}
              className="flex-1 sm:flex-none px-5 py-2.5 bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white font-semibold rounded-xl shadow-lg shadow-violet-600/20 hover:shadow-violet-600/30 hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center gap-2 text-xs sm:text-sm cursor-pointer"
            >
              <Plus className="w-4.5 h-4.5" />
              <span>Add Task</span>
            </button>
          </div>
        </div>

        {/* Board Area */}
        {loading ? (
          <div className="flex-1 flex flex-col justify-center items-center py-28 space-y-4">
            <div className="relative w-14 h-14">
              <div className="absolute inset-0 rounded-full border-4 border-violet-500/20 animate-ping"></div>
              <div className="absolute inset-0 rounded-full border-4 border-t-violet-500 border-r-transparent border-b-transparent border-l-transparent animate-spin"></div>
            </div>
            <p className="text-slate-500 font-mono tracking-widest text-[10px] animate-pulse">SYNCHRONIZING BOARD...</p>
          </div>
        ) : (
          <div className="flex-1 animate-fade-in">
            <TaskBoard
              tasks={filteredTasks}
              onEdit={(task) => {
                setSelectedTask(task);
                setIsTaskModalOpen(true);
              }}
              onDelete={(id) => {
                setTaskIdToDelete(id);
                setIsConfirmModalOpen(true);
              }}
              onMoveStage={handleMoveStage}
              onCreateTaskClick={() => {
                setSelectedTask(null);
                setIsTaskModalOpen(true);
              }}
            />
          </div>
        )}
      </main>

      {/* Task Creation & Update Modal */}
      <TaskModal
        isOpen={isTaskModalOpen}
        onClose={() => {
          setIsTaskModalOpen(false);
          setSelectedTask(null);
        }}
        onSubmit={selectedTask ? handleUpdateTask : handleCreateTask}
        task={selectedTask}
      />

      {/* Task Deletion Confirmation Modal */}
      <ConfirmModal
        isOpen={isConfirmModalOpen}
        onClose={() => {
          setIsConfirmModalOpen(false);
          setTaskIdToDelete(null);
        }}
        onConfirm={handleDeleteTask}
      />
    </div>
  );
};

export default Dashboard;
