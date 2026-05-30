import React from 'react';
import TaskCard from './TaskCard';
import { Inbox, Flame, CheckCircle, Plus } from 'lucide-react';

const TaskBoard = ({ tasks, onEdit, onDelete, onMoveStage, onCreateTaskClick }) => {
  const columns = [
    {
      id: 'TODO',
      title: 'To Do',
      color: 'border-indigo-500/30 text-indigo-400 bg-indigo-500/5',
      badge: 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20',
      icon: <Inbox className="w-4 h-4 text-indigo-400" />,
      tasks: tasks.filter((t) => t.stage === 'TODO'),
    },
    {
      id: 'IN_PROGRESS',
      title: 'In Progress',
      color: 'border-amber-500/30 text-amber-400 bg-amber-500/5',
      badge: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
      icon: <Flame className="w-4 h-4 text-amber-400" />,
      tasks: tasks.filter((t) => t.stage === 'IN_PROGRESS'),
    },
    {
      id: 'DONE',
      title: 'Completed',
      color: 'border-emerald-500/30 text-emerald-400 bg-emerald-500/5',
      badge: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
      icon: <CheckCircle className="w-4 h-4 text-emerald-400" />,
      tasks: tasks.filter((t) => t.stage === 'DONE'),
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
      {columns.map((col) => (
        <div key={col.id} className="glass-panel rounded-2xl p-4 sm:p-5 flex flex-col gap-4 border border-slate-800/40 min-h-[300px] sm:min-h-[500px]">
          {/* Column Header */}
          <div className="flex justify-between items-center pb-3 border-b border-slate-800/30">
            <div className="flex items-center gap-2.5">
              <div className={`p-1.5 rounded-lg border ${col.color.split(' ')[0]} ${col.color.split(' ')[2]}`}>
                {col.icon}
              </div>
              <h3 className="text-white font-bold text-sm sm:text-base">{col.title}</h3>
            </div>
            
            <div className="flex items-center gap-2">
              <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold border ${col.badge}`}>
                {col.tasks.length}
              </span>
              
              {col.id === 'TODO' && (
                <button
                  onClick={onCreateTaskClick}
                  className="p-1 hover:bg-violet-500/10 border border-transparent hover:border-violet-500/20 text-slate-400 hover:text-violet-400 rounded-lg transition-all cursor-pointer"
                  title="Add Task to Todo"
                >
                  <Plus className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>

          {/* Cards container */}
          <div className="flex flex-col gap-4 overflow-y-auto max-h-[600px] pr-1">
            {col.tasks.length > 0 ? (
              col.tasks.map((task) => (
                <TaskCard
                  key={task.id}
                  task={task}
                  onEdit={onEdit}
                  onDelete={onDelete}
                  onMoveStage={onMoveStage}
                />
              ))
            ) : (
              /* Empty state block */
              <div className="flex flex-col items-center justify-center py-16 px-4 border border-dashed border-slate-800/60 rounded-2xl bg-slate-900/10 select-none">
                <div className="mb-3.5 p-3 rounded-full bg-slate-950/40 border border-slate-800/40 text-slate-600">
                  {col.id === 'TODO' ? <Inbox className="w-5 h-5" /> : col.id === 'IN_PROGRESS' ? <Flame className="w-5 h-5" /> : <CheckCircle className="w-5 h-5" />}
                </div>
                <p className="text-slate-500 text-xs sm:text-sm font-medium text-center">
                  No tasks in this column
                </p>
                {col.id === 'TODO' && (
                  <button
                    onClick={onCreateTaskClick}
                    className="mt-3.5 px-3 py-1.5 bg-violet-600/10 hover:bg-violet-600/20 border border-violet-500/20 hover:border-violet-500/40 text-violet-400 text-[11px] font-bold rounded-lg transition-all cursor-pointer"
                  >
                    Create Task
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default TaskBoard;
