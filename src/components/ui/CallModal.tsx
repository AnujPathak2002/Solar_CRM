import { useState, useEffect } from 'react';
import { PhoneCall, X, Save, AlertCircle } from 'lucide-react';
import './CallModal.css';

interface CallModalProps {
  lead: { id: string; name: string; phone: string };
  onClose: () => void;
}

export default function CallModal({ lead, onClose }: CallModalProps) {
  const [dialing, setDialing] = useState(true);
  const [remarks, setRemarks] = useState('');
  const [error, setError] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setDialing(false), 1800); // Realistic short dialing simulation
    return () => clearTimeout(timer);
  }, []);

  const handleSave = () => {
    if (!remarks.trim()) {
      setError(true);
      return;
    }
    // Perform backend save simulation
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-container animate-fade-in">
        {/* Header always visible */}
        <div className="modal-header">
          <div className="lead-identity">
            <div className={`call-icon ${dialing ? 'pulse-anim' : 'connected-anim'}`}>
              <PhoneCall size={28} />
            </div>
            <div className="lead-meta">
              <h3>{lead.name}</h3>
              <span className="lead-phone">+91 {lead.phone}</span>
            </div>
          </div>
          <button className="close-btn" onClick={onClose}><X size={24} /></button>
        </div>

        {dialing ? (
          <div className="dialing-state">
            <div className="loader"></div>
            <h3>Connecting to Prospect...</h3>
            <p>Please wait securely setting up line relay.</p>
          </div>
        ) : (
          <div className="modal-body">
            <div className="questionnaire-scroll-area">
              <h4 className="section-title">Lead Qualification Questionnaire</h4>
              
              <div className="form-grid">
                {/* Boolean Field */}
                <div className="form-group">
                  <label>Are you the property owner?</label>
                  <div className="radio-group">
                    <label><input type="radio" name="owner" value="yes" /> Yes</label>
                    <label><input type="radio" name="owner" value="no" /> No</label>
                  </div>
                </div>

                {/* Dropdown Field */}
                <div className="form-group">
                  <label>Roof Material</label>
                  <select className="select-input">
                    <option value="">Select Material</option>
                    <option value="concrete">Concrete</option>
                    <option value="tin">Tin/Metal</option>
                    <option value="tile">Tile</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                {/* Checkboxes */}
                <div className="form-group full-width">
                  <label>Current High-Energy Appliances</label>
                  <div className="checkbox-group">
                    <label><input type="checkbox" /> Air Conditioner (AC)</label>
                    <label><input type="checkbox" /> Electric Geyser</label>
                    <label><input type="checkbox" /> Electric Vehicle (EV)</label>
                    <label><input type="checkbox" /> Heavy Machinery</label>
                  </div>
                </div>

                {/* Numeric Input */}
                <div className="form-group">
                  <label>Average Monthly Bill (₹)</label>
                  <input type="number" className="text-input" placeholder="e.g. 4500" />
                </div>

                {/* Date/Time Field */}
                <div className="form-group">
                  <label>Schedule Site Visit</label>
                  <input type="datetime-local" className="text-input" />
                </div>
              </div>

              <h4 className="section-title">Call Disposition Workflow</h4>
              <div className="form-grid">
                <div className="form-group">
                  <label>1. Connectivity Status</label>
                  <select className="select-input">
                    <option value="connected">Connected</option>
                    <option value="no_answer">No Answer</option>
                    <option value="busy">Busy</option>
                    <option value="switched_off">Switched Off / OOC</option>
                    <option value="invalid">Invalid Number</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>2. Engagement Outcome</label>
                  <select className="select-input">
                    <option value="interested">Interested in Proposal</option>
                    <option value="not_interested">Not Interested</option>
                    <option value="callback">Callback Requested</option>
                    <option value="dnd">Do Not Disturb</option>
                  </select>
                </div>

                <div className="form-group full-width">
                  <label>3. Final Disposition</label>
                  <div className="radio-group blocks">
                    <label className="disp-badge q"><input type="radio" name="disposition" value="qualified" /> Qualified Lead</label>
                    <label className="disp-badge u"><input type="radio" name="disposition" value="unqualified" /> Unqualified</label>
                    <label className="disp-badge n"><input type="radio" name="disposition" value="nurture" /> Nurture (6+ Months)</label>
                    <label className="disp-badge j"><input type="radio" name="disposition" value="junk" /> Junk/Spam</label>
                  </div>
                </div>
              </div>

              {/* Mandatory Remarks */}
              <div className={`form-group full-width ${error ? 'has-error' : ''}`} style={{marginTop: '1rem'}}>
                <label>Executive Remarks <span className="req">*</span></label>
                <textarea 
                  className="text-area" 
                  rows={4} 
                  placeholder="Summarize the core conversation and any specific customer concerns..."
                  value={remarks}
                  onChange={(e) => {
                    setRemarks(e.target.value);
                    if (e.target.value.trim()) setError(false);
                  }}
                ></textarea>
                {error && <span className="error-msg"><AlertCircle size={14}/> Reporting remarks are mandatory before concluding the call.</span>}
              </div>

            </div>
            <div className="modal-footer">
               <button className="btn-secondary" onClick={onClose}>Cancel</button>
               <button className="btn-primary" onClick={handleSave} style={{display: 'flex', alignItems: 'center', gap: '0.5rem'}}>
                 <Save size={18} /> Complete Call Evaluation
               </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
