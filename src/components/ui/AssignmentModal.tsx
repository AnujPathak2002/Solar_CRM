import { X } from 'lucide-react';
import './AssignmentModal.css';

interface AssignmentModalProps {
  hasTask: boolean;
  onClose: () => void;
}

export default function AssignmentModal({ hasTask, onClose }: AssignmentModalProps) {
  return (
    <div className="modal-overlay">
      <div className="assignment-modal animate-fade-in">
        <div className="assignment-header">
          <h3>Assignment Details Confirmation</h3>
          <button className="assignment-close" onClick={onClose} aria-label="Close modal">
            <X size={18} />
          </button>
        </div>
        
        <div className="assignment-body">
          {!hasTask ? (
             <h4 className="no-task-text">No Assignment Details Found. Please Contact Your Supervisor!</h4>
          ) : (
            <div className="has-task-state">
              <h4 className="no-task-text" style={{marginBottom: '1.5rem'}}>Active Assignment Detailed Directly From Supervisor!</h4>
              
              <div className="task-details-grid">
                <div className="detail-row">
                  <span className="detail-label">Campaign Target:</span>
                  <span className="detail-value">National Solar Residential Drive - Q3</span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Shift Timing:</span>
                  <span className="detail-value">09:30 AM - 06:30 PM (IST)</span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Assigned By:</span>
                  <span className="detail-value">Admin User</span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Pending Contacts:</span>
                  <span className="detail-value font-medium">4 High-Priority Leads</span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Task Objective:</span>
                  <span className="detail-value">Qualify property ownership and securely arrange site evaluation appointments.</span>
                </div>
              </div>
            </div>
          )}
        </div>
        
        <div className="assignment-footer">
          {!hasTask ? (
            <button className="btn-blue" onClick={onClose}>Assignment needed</button>
          ) : (
            <button className="btn-blue" onClick={onClose}>Acknowledge & Start Calls</button>
          )}
        </div>
      </div>
    </div>
  );
}
