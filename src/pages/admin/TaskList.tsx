import { useNavigate } from 'react-router-dom';
import { Plus, Search, Edit, Trash2, Calendar } from 'lucide-react';
import './ManageTasks.css';

const MOCK_TASKS = [
  { id: 'TSK-1001', title: 'National Solar Drive - Q3', module: 'Outreach', assignedTo: 'executive1', status: 'Active', due: '2026-06-15' },
  { id: 'TSK-1002', title: 'Follow-up Call Backs', module: 'Sales', assignedTo: 'executive2', status: 'Pending', due: '2026-07-10' },
  { id: 'TSK-1003', title: 'Junk Lead Verification', module: 'Audit', assignedTo: 'executive4', status: 'Completed', due: '2026-05-20' },
];

export default function TaskList() {
  const navigate = useNavigate();

  return (
    <div className="manage-tasks-container animate-fade-in">
      <div className="task-action-bar card">
        <div className="search-box">
          <Search size={18} className="search-icon" />
          <input type="text" placeholder="Search tasks by title or ID..." />
        </div>
        <button className="btn-primary flex-center gap-sm" onClick={() => navigate('/app/manage-tasks/create')}>
          <Plus size={18} /> Add New Task
        </button>
      </div>

      <div className="card reporting-card">
        <div className="table-wrapper">
          <table className="data-table">
            <thead>
              <tr>
                <th>Task ID</th>
                <th>Task Title</th>
                <th>Module</th>
                <th>Assigned Executive</th>
                <th>Expected Completion</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {MOCK_TASKS.map(task => (
                <tr key={task.id}>
                  <td className="font-medium text-primary">{task.id}</td>
                  <td style={{fontWeight: 500}}>{task.title}</td>
                  <td>{task.module}</td>
                  <td>{task.assignedTo}</td>
                  <td className="text-muted"><Calendar size={14} style={{display: 'inline', marginRight: 4, verticalAlign: 'text-bottom'}}/> {task.due}</td>
                  <td>
                    <span className={`status-badge ${task.status.toLowerCase()}`}>
                      {task.status}
                    </span>
                  </td>
                  <td>
                    <div className="action-buttons">
                      <button className="icon-btn text-secondary" title="Edit Task" onClick={() => navigate('/app/manage-tasks/create')}>
                        <Edit size={16} />
                      </button>
                      <button className="icon-btn text-danger" title="Delete Task">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
