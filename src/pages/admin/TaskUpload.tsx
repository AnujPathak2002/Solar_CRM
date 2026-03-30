import { useState } from 'react';
import './ManageTasks.css';

const INITIAL_EXECUTIVES = [
  { id: 1, name: 'Ayush', mobile: '9876543210', shift: '', cell: '', role: '', task: '' },
  { id: 2, name: 'Arvind', mobile: '9352652000', shift: '', cell: '', role: '', task: '' },
  { id: 3, name: 'Vaibhav', mobile: '6387040256', shift: '', cell: '', role: '', task: '' },
  { id: 4, name: 'Aparna', mobile: '9870541241', shift: '', cell: '', role: '', task: '' },
  { id: 5, name: 'Keshav', mobile: '8558813656', shift: '', cell: '', role: '', task: '' },
  { id: 6, name: 'Ajay', mobile: '8081127821', shift: '', cell: '', role: '', task: '' },
  { id: 7, name: 'Anuradha', mobile: '6393442283', shift: '', cell: '', role: '', task: '' },
  { id: 8, name: 'Aakash', mobile: '9333333350', shift: '', cell: '', role: '', task: '' },
  { id: 9, name: 'Madhu', mobile: '9628161825', shift: '', cell: '', role: '', task: '' },
  { id: 10, name: 'Avadhesh', mobile: '9884463282', shift: '', cell: '', role: '', task: '' },
];

export default function TaskUpload() {
  const [executives, setExecutives] = useState(INITIAL_EXECUTIVES);
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [searchDate, setSearchDate] = useState('2026-03-31');

  const toggleSelect = (id: number) => {
    setSelectedIds(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const handleRowChange = (id: number, field: string, value: string) => {
    setExecutives(prev => prev.map(exec => 
      exec.id === id ? { ...exec, [field]: value } : exec
    ));
  };

  const handleSave = (id: number) => {
    const exec = executives.find(e => e.id === id);
    alert(`Saving assignment for ${exec?.name}: Role ${exec?.role}, Task ${exec?.task}`);
  };

  const selectAll = (checked: boolean) => {
    if (checked) {
      setSelectedIds(executives.map(e => e.id));
    } else {
      setSelectedIds([]);
    }
  };

  return (
    <div className="manage-tasks-container animate-fade-in">
      <h2 className="text-center" style={{ margin: '1rem 0', fontWeight: 600 }}>Assign Task To Agent</h2>
      
      <div className="assignment-search-bar card">
        <div className="search-field">
          <label>Data (DD/MM/YYYY):</label>
          <input 
            type="date" 
            className="text-input" 
            style={{ width: '200px' }} 
            value={searchDate}
            onChange={(e) => setSearchDate(e.target.value)}
          />
        </div>
        <button className="btn-search">Search</button>
      </div>

      <div className="assignment-table-container card">
        <table className="assignment-table">
          <thead>
            <tr>
              <th style={{ width: '40px' }}>SN</th>
              <th style={{ width: '40px' }}>
                <input 
                  type="checkbox" 
                  onChange={(e) => selectAll(e.target.checked)}
                  checked={selectedIds.length === executives.length}
                />
              </th>
              <th>Executive</th>
              <th>Shift</th>
              <th>Cell</th>
              <th>Role</th>
              <th>Task</th>
              <th style={{ width: '80px' }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {executives.map((exec, idx) => (
              <tr key={exec.id}>
                <td>{idx + 1}</td>
                <td>
                  <input 
                    type="checkbox" 
                    checked={selectedIds.includes(exec.id)}
                    onChange={() => toggleSelect(exec.id)}
                  />
                </td>
                <td>
                  <div className="executive-info">
                    <span className="exec-name">{exec.name}</span>
                    <span className="exec-mobile">{exec.mobile}</span>
                  </div>
                </td>
                {/* Shift */}
                <td>
                  <select 
                    className="table-select" 
                    value={exec.shift}
                    onChange={(e) => handleRowChange(exec.id, 'shift', e.target.value)}
                    disabled={!selectedIds.includes(exec.id)}
                  >
                    <option value="">--All--</option>
                    <option value="morning">Morning</option>
                    <option value="evening">Evening</option>
                  </select>
                </td>
                {/* Cell */}
                <td>
                  <select 
                    className="table-select"
                    value={exec.cell}
                    onChange={(e) => handleRowChange(exec.id, 'cell', e.target.value)}
                    disabled={!selectedIds.includes(exec.id)}
                  >
                    <option value="">--All--</option>
                    <option value="cell1">Cell 1</option>
                    <option value="cell2">Cell 2</option>
                  </select>
                </td>
                {/* Role */}
                <td>
                  <select 
                    className="table-select"
                    value={exec.role}
                    onChange={(e) => handleRowChange(exec.id, 'role', e.target.value)}
                    disabled={!selectedIds.includes(exec.id)}
                    style={{ background: '#fff', border: '1px solid #007bff', opacity: selectedIds.includes(exec.id) ? 1 : 0.6 }}
                  >
                    <option value="">--Select--</option>
                    <option value="caller">Caller</option>
                    <option value="verifier">Verifier</option>
                    <option value="closer">Closer</option>
                  </select>
                </td>
                {/* Task */}
                <td>
                  <select 
                    className="table-select"
                    value={exec.task}
                    onChange={(e) => handleRowChange(exec.id, 'task', e.target.value)}
                    disabled={!selectedIds.includes(exec.id)}
                    style={{ maxWidth: '200px' }}
                  >
                    <option value="">--All--</option>
                    <option value="task1">Outreach Campaign - March</option>
                    <option value="task2">Follow-up Call - Jaipur</option>
                  </select>
                </td>
                {/* Action */}
                <td>
                  <button 
                    className="btn-save-row" 
                    onClick={() => handleSave(exec.id)}
                    disabled={!selectedIds.includes(exec.id)}
                    style={{ opacity: selectedIds.includes(exec.id) ? 1 : 0.5, cursor: selectedIds.includes(exec.id) ? 'pointer' : 'not-allowed' }}
                  >
                    Save
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
