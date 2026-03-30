import { useState } from 'react';
import { Phone, Search } from 'lucide-react';
import CallModal from '../components/ui/CallModal';
import AssignmentModal from '../components/ui/AssignmentModal';
import './Outreach.css';

const ASSIGNED_LEADS = [
  { id: 'LD-8041', name: 'Ramesh Gupta', phone: '9876543210', region: 'North District', source: 'Web Form' },
  { id: 'LD-8042', name: 'Anita Verma', phone: '9123456780', region: 'East District', source: 'Referral' },
  { id: 'LD-8043', name: 'Sunil Kumar', phone: '9988776655', region: 'South District', source: 'Facebook Ad' },
  { id: 'LD-8044', name: 'Priya Sharma', phone: '8877665544', region: 'West District', source: 'Direct Call' },
];

export default function Outreach() {
  const [showAssignmentModal, setShowAssignmentModal] = useState(true);
  const [activeCallId, setActiveCallId] = useState<string | null>(null);

  // Derive assignment availability loosely. For example purposes, executive1 has a task, while others (like executive2) hit the empty fallback state.
  const username = localStorage.getItem('auth_username') || '';
  const hasTask = username.toLowerCase() === 'executive1';

  // To properly simulate the workflow, we either deliver nothing or deliver the assignment matrix to validate rendering
  const displayedLeads = hasTask ? ASSIGNED_LEADS : [];

  const activeLead = ASSIGNED_LEADS.find(l => l.id === activeCallId);

  return (
    <div className="outreach-container animate-fade-in">
      {/* Required initial check modal */}
      {showAssignmentModal && (
        <AssignmentModal 
          hasTask={hasTask} 
          onClose={() => setShowAssignmentModal(false)} 
        />
      )}

      {/* Main Data View */}
      <div className="card reporting-card">
        <div className="table-controls">
          <div className="search-box">
            <Search size={18} className="search-icon" />
            <input type="text" placeholder="Search assigned leads by name or region..." disabled={!hasTask} />
          </div>
        </div>

        <div className="table-wrapper">
          <table className="data-table">
            <thead>
              <tr>
                <th>Lead ID</th>
                <th>Prospect Name</th>
                <th>Contact Number</th>
                <th>Region</th>
                <th>Source</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {displayedLeads.length > 0 ? (
                displayedLeads.map(lead => (
                  <tr key={lead.id}>
                    <td className="font-medium text-primary">{lead.id}</td>
                    <td>{lead.name}</td>
                    <td style={{fontWeight: 500}}>+91 {lead.phone}</td>
                    <td>{lead.region}</td>
                    <td>{lead.source}</td>
                    <td>
                      <button className="btn-call" onClick={() => setActiveCallId(lead.id)}>
                        <Phone size={16} /> Call
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} style={{textAlign: 'center', padding: '3rem', color: 'var(--color-text-muted)'}}>
                    <i>No operational leads are assigned directly to your cue today.</i>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {activeLead && (
        <CallModal 
          lead={activeLead} 
          onClose={() => setActiveCallId(null)} 
        />
      )}
    </div>
  );
}
