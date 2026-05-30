import React from 'react';
import { Trash2, Edit, ArrowLeft, ArrowRight, CalendarDays } from 'lucide-react';

const TaskCard = ({ task, onEdit, onDelete, onMoveStage }) => {
  const { id, title, description, stage, createdAt } = task;

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  const getStageBadgeColor = () => {
    switch (stage) {
      case 'TODO':
        return 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20';
      case 'IN_PROGRESS':
        return 'bg-amber-500/10 text-amber-400 border-amber-500/20';
      case 'DONE':
        return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20';
      default:
        return 'bg-slate-500/10 text-slate-400 border-slate-500/20';
    }
  };

  return (
    <div className="glass-panel glass-panel-hover rounded-2xl p-5 border border-slate-800/40 relative overflow-hidden flex flex-col justify-between min-h-[160px] group">
      {/* Decorative vertical band depending on stage */}
      <div className={`absolute top-0 left-0 bottom-0 w-1 ${
        stage === 'TODO' ? 'bg-indigo-500/50' : 
        stage === 'IN_PROGRESS' ? 'bg-amber-500/50' : 'bg-emerald-500/50'
      }`}></div>

      <div>
        {/* Title and Edit/Delete Actions */}
        <div className="flex justify-between items-start gap-4 mb-2.5">
          <h4 className="text-white font-semibold text-base leading-snug tracking-tight group-hover:text-violet-300 transition-colors duration-200">
            {title}
          </h4>
          
          <div className="flex items-center gap-1 opacity-60 group-hover:opacity-100 transition-opacity duration-200">
            <button
              onClick={() => onEdit(task)}
              className="p-1.5 hover:bg-violet-500/10 border border-transparent hover:border-violet-500/20 text-slate-400 hover:text-violet-400 rounded-lg transition-all"
              title="Edit Task"
            >
              <Edit className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => onDelete(id)}
              className="p-1.5 hover:bg-red-500/10 border border-transparent hover:border-red-500/20 text-slate-400 hover:text-red-400 rounded-lg transition-all"
              title="Delete Task"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Description */}
        <p className="text-slate-400 text-xs sm:text-sm leading-relaxed mb-4 break-words">
          {description || <span className="text-slate-600 italic">No description provided</span>}
        </p>
      </div>

      {/* Footer information */}
      <div className="flex justify-between items-center border-t border-slate-800/30 pt-3 mt-auto">
        {/* Date details */}
        <div className="flex items-center gap-1.5 text-slate-500 text-[10px] font-semibold">
          <CalendarDays className="w-3 h-3 text-slate-500" />
          <span>{formatDate(createdAt)}</span>
        </div>

        {/* Stage quick transition arrows */}
        <div className="flex items-center gap-1">
          {stage !== 'TODO' && (
            <button
              onClick={() => onMoveStage(task, stage === 'DONE' ? 'IN_PROGRESS' : 'TODO')}
              className="p-1 bg-slate-950/40 hover:bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-400 hover:text-white rounded-lg transition-all cursor-pointer"
              title="Move Back"
            >
              <ArrowLeft className="w-3 h-3" />
            </button>
          )}
          
          <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider border ${getStageBadgeColor()}`}>
            {stage.replace('_', ' ')}
          </span>

          {stage !== 'DONE' && (
            <button
              onClick={() => onMoveStage(task, stage === 'TODO' ? 'IN_PROGRESS' : 'DONE')}
              className="p-1 bg-slate-950/40 hover:bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-400 hover:text-white rounded-lg transition-all cursor-pointer"
              title="Move Forward"
            >
              <ArrowRight className="w-3 h-3" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default TaskCard;
