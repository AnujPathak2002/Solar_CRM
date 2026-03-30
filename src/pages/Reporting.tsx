import { useState } from 'react';
import { Download, Filter, Search } from 'lucide-react';
import './Reporting.css';

const MOCK_DATA = [
  { id: 'LD-1002', name: 'Raj Kumar', region: 'North', status: 'Qualified', date: '2026-03-29' },
  { id: 'LD-1003', name: 'Sunita Sharma', region: 'West', status: 'Nurture', date: '2026-03-28' },
  { id: 'LD-1004', name: 'Anil Desai', region: 'South', status: 'Unqualified', date: '2026-03-25' },
  { id: 'LD-1005', name: 'Priya Patel', region: 'East', status: 'Qualified', date: '2026-03-22' },
  { id: 'LD-1006', name: 'Mohammed Ali', region: 'North', status: 'Junk', date: '2026-03-21' },
];

export default function Reporting() {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredData = MOCK_DATA.filter(row => 
    row.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    row.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="reporting-container animate-fade-in">
      <div className="reporting-header">
        <div>
          <h2>Operational Reports</h2>
          <p>Export and analyze campaign execution summaries.</p>
        </div>
        <button className="btn-primary" style={{display: 'flex', alignItems: 'center', gap: '8px'}}>
          <Download size={18} /> Export CSV
        </button>
      </div>

      <div className="card reporting-card">
        <div className="table-controls">
          <div className="search-box">
            <Search size={18} className="search-icon" />
            <input 
              type="text" 
              placeholder="Search by ID or Name..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button className="filter-btn">
            <Filter size={18} /> Filters
          </button>
        </div>

        <div className="table-wrapper">
          <table className="data-table">
            <thead>
              <tr>
                <th>Lead ID</th>
                <th>Applicant Name</th>
                <th>Region</th>
                <th>Date Assigned</th>
                <th>Final Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((row) => (
                <tr key={row.id}>
                  <td className="font-medium text-primary">{row.id}</td>
                  <td>{row.name}</td>
                  <td>{row.region}</td>
                  <td>{row.date}</td>
                  <td>
                    <span className={`status-badge status-${row.status.toLowerCase()}`}>
                      {row.status}
                    </span>
                  </td>
                  <td>
                    <button className="text-secondary" style={{textDecoration: 'underline'}}>View</button>
                  </td>
                </tr>
              ))}
              {filteredData.length === 0 && (
                <tr>
                  <td colSpan={6} style={{textAlign: 'center', padding: '2rem', color: 'var(--color-text-muted)'}}>
                    No records found for the given search criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        
        <div className="pagination">
          <span className="page-info">Showing 1 to {filteredData.length} of {MOCK_DATA.length} entries</span>
          <div className="page-controls">
            <button disabled>Previous</button>
            <button className="active">1</button>
            <button>2</button>
            <button>Next</button>
          </div>
        </div>
      </div>
    </div>
  );
}
