import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './ManageTasks.css';

const INITIAL_MOCK_GRID = [
  { District_Name: 'Jaipur', AreaType: 'Urban', Block_Name: 'Central', DISE_SchoolCode: '0834', School_Name: 'GD Public', SchoolType: 'Private', Panchayat_Name: 'N/A', Person_FirstName: 'Ravi', Person_Mobile1: '9876543210', Post_Name: 'Principal', column1: '', column2: '', column3: '', column4: '', column5: '' },
  { District_Name: 'Alwar', AreaType: 'Rural', Block_Name: 'North', DISE_SchoolCode: '0891', School_Name: '', SchoolType: 'Govt', Panchayat_Name: 'Behror', Person_FirstName: '', Person_Mobile1: '9123456789', Post_Name: 'Teacher', column1: '', column2: '', column3: '', column4: '', column5: '' },
  { District_Name: 'Ajmer', AreaType: 'Urban', Block_Name: 'South', DISE_SchoolCode: '0122', School_Name: 'St. Mary', SchoolType: 'Private', Panchayat_Name: 'N/A', Person_FirstName: 'Anita', Person_Mobile1: '8877665544', Post_Name: '', column1: '', column2: '', column3: '', column4: '', column5: '' }
];

const EXPECTED_COLUMNS = [
  'District_Name', 'AreaType', 'Block_Name', 'DISE_SchoolCode', 'School_Name', 'SchoolType', 'Panchayat_Name', 'Person_FirstName', 'Person_Mobile1', 'Post_Name', 'column1', 'column2', 'column3', 'column4', 'column5'
];

export default function TaskForm() {
  const navigate = useNavigate();
  const [dataSource, setDataSource] = useState('');
  
  // Step 1 -> Step 2 State
  const [isUploading, setIsUploading] = useState(false);
  const [hasUploaded, setHasUploaded] = useState(false);
  const [gridData, setGridData] = useState(INITIAL_MOCK_GRID);

  const handleFakeUploadClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsUploading(true);
    setTimeout(() => {
      setIsUploading(false);
      setHasUploaded(true);
    }, 1500);
  };

  const deleteRow = (idx: number) => {
    const updated = [...gridData];
    updated.splice(idx, 1);
    setGridData(updated);
  };

  const handleCellChange = (rowIndex: number, colKey: string, val: string) => {
    const updated = [...gridData];
    updated[rowIndex] = { ...updated[rowIndex], [colKey]: val };
    setGridData(updated);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/app/manage-tasks/list');
  };

  return (
    <div className="manage-tasks-container animate-fade-in">
      <div className="form-card card" style={{padding: 0, overflow: 'hidden'}}>
        <div className="form-header-bar">
          <h3 className="text-center" style={{color: '#ffc107', margin: 0, fontSize: '1.15rem'}}>Add/ Edit Task Request</h3>
        </div>
        
        <form onSubmit={handleSave} className="task-creation-form">
          <div className="form-grid-2col">
            <div className="form-group-horizontal">
              <label>Request Type<span className="req">*</span></label>
              <select required className="select-input"><option value="">--Select--</option><option value="outreach">Outreach Campaign</option></select>
            </div>
            <div className="form-group-horizontal">
              <label>Module<span className="req">*</span></label>
              <select required className="select-input" style={{borderColor: 'rgba(0, 123, 255, 0.4)', boxShadow: '0 0 0 2px rgba(0, 123, 255, 0.1)'}}>
                <option value="">--All--</option><option value="tele">Tele-calling</option>
              </select>
            </div>
            <div className="form-group-horizontal">
              <label>Request Title<span className="req">*</span></label>
              <input type="text" required className="text-input" />
            </div>
            <div className="form-group-horizontal">
              <label>Request Description<span className="req">*</span></label>
              <textarea rows={3} required className="text-area" placeholder="Enter Task Description"></textarea>
            </div>
            <div className="form-group-horizontal">
              <label>Assigned Person Designation<span className="req">*</span></label>
              <select required className="select-input"><option value="">--All--</option><option value="executive">Executive</option></select>
            </div>
            <div className="form-group-horizontal">
              <label>Assigned Person Name<span className="req">*</span></label>
              <input type="text" required className="text-input" />
            </div>
            <div className="form-group-horizontal split-dates">
              <label style={{alignSelf: 'flex-start', paddingTop: '0.5rem'}}>Assigned On</label>
              <div className="date-time-container">
                <div className="dt-group">
                  <label>Date<span className="req">*</span></label><input type="date" required className="text-input" />
                </div>
                <div className="dt-group">
                  <label>Time</label>
                  <div className="time-split"><input type="number" placeholder="HH" className="text-input" style={{width: '60px'}} /><span>:</span><input type="number" placeholder="MM" className="text-input" style={{width: '60px'}} /></div>
                </div>
              </div>
            </div>
            <div className="form-group-horizontal split-dates">
              <label style={{alignSelf: 'flex-start', paddingTop: '0.5rem'}}>Expected Completion On</label>
              <div className="date-time-container">
                <div className="dt-group">
                  <label>Date<span className="req">*</span></label><input type="date" required className="text-input" />
                </div>
                <div className="dt-group">
                  <label>Time</label>
                  <div className="time-split"><input type="number" placeholder="HH" className="text-input" style={{width: '60px'}} /><span>:</span><input type="number" placeholder="MM" className="text-input" style={{width: '60px'}} /></div>
                </div>
              </div>
            </div>
            <div className="form-group-horizontal full-width">
              <label>Data Source<span className="req">*</span></label>
              <select required className="select-input" value={dataSource} onChange={(e) => setDataSource(e.target.value)} style={{maxWidth: '50%'}}>
                <option value="">--All--</option><option value="system">Existing System Data</option><option value="custom">Custom (Upload Excel Leads)</option>
              </select>
            </div>
          </div>

          {/* Excel Upload Block */}
          {dataSource === 'custom' && (
            <div className="task-custom-upload-section animate-fade-in" style={{marginTop: '2rem', paddingTop: '2rem', borderTop: '2px dashed var(--border-color)'}}>
              <div className="upload-instructions-box">
                <h4>Important Instructions</h4>
                <ul className="instruction-list">
                  <li>Please upload only <strong>.xls</strong> or <strong>.xlsx</strong> files (Excel 2007 or above).</li>
                  <li>Please do not place any types of images or photos in the Excel file.</li>
                  <li>Your excel must have <strong>exact header names</strong> in the first row.</li>
                </ul>
                <div className="column-req-table">
                  <div className="req-row mandatory">
                    <div className="r-label">Mandatory Columns <span className="req">*</span> :</div>
                    <div className="r-value">Person FirstName, Person Mobile1, Post Name</div>
                  </div>
                  <div className="req-row">
                    <div className="r-label">Optional Columns :</div>
                    <div className="r-value">District Name, AreaType, Block Name, DISE SchoolCode, Panchayat Name, School Name, SchoolType</div>
                  </div>
                  <div className="req-row">
                    <div className="r-label">Custom Columns :</div>
                    <div className="r-value">column1, column2, column3, column4, column5</div>
                  </div>
                </div>
                <p className="instruction-note"><span className="req">* </span>Note: If there are additional columns apart from mandatory and optional, place them in custom column 1 - 5.</p>
                <a href="#" className="download-sample text-primary" style={{fontWeight: 500, fontSize: '0.9rem'}}>Example Excel Format</a>
                <p style={{fontSize: '0.8rem', color: '#6c757d', marginTop: '0.5rem'}}>Text marked with * are mandatory</p>
              </div>

              {/* Step 1 Upload Zone */}
              <div className="upload-zone-wrapper">
                <h3 className="step-title text-center" style={{fontSize: '1.25rem', marginBottom: '0.5rem'}}>Step 1: Upload Excel File</h3>
                <p className="text-center text-muted" style={{fontSize: '0.9rem', marginBottom: '1.5rem'}}>Drag & Drop your file or click below to select.</p>
                
                <div className="dashed-dropzone card">
                  <p className="text-muted" style={{fontSize: '0.85rem'}}>Drag & Drop Excel here</p>
                  <p className="text-muted" style={{fontSize: '0.85rem', marginBottom: '1.5rem'}}>or use the button below</p>
                  <h4 style={{marginBottom: '1rem'}}>Upload Excel File</h4>
                  
                  <div className="upload-form-control">
                    <div className="file-input-wrapper">
                      <label className="file-btn">Choose File</label>
                      <span className="file-name">Lead_Database_v2.xlsx</span>
                      <input type="file" accept=".xls,.xlsx" style={{opacity: 0, position: 'absolute', width: '100%', height: '100%', cursor: 'pointer', left: 0}} />
                    </div>
                    {/* Simulated native button click mapping */}
                    <button type="button" className="btn-blue-upload" style={{marginTop: '1.5rem'}} onClick={handleFakeUploadClick} disabled={isUploading}>
                      {isUploading ? 'Parsing...' : 'Upload'}
                    </button>
                  </div>
                </div>
              </div>

              {/* Step 2 PREVIEW Zone */}
              {hasUploaded && (
                <div className="excel-preview-zone animate-fade-in">
                  <h3 className="step-title" style={{fontSize: '1.25rem', marginBottom: '0.25rem'}}>Step 2: Preview Excel Data</h3>
                  <p className="text-muted" style={{fontSize: '0.9rem', marginBottom: '1.5rem'}}>Edit missing headers or data if required before final submission.</p>

                  <div className="preview-error-box">
                    <strong>Missing mandatory columns : Person_FirstName, Person_Mobile1, Post_Name</strong><br/>
                    Missing/incorrect columns appear as <span style={{color: '#d32f2f', fontWeight: 'bold'}}>empty red fields</span>. Please correct them before submit.
                  </div>

                  <div className="expected-columns-section">
                    <p style={{fontWeight: 500, marginBottom: '0.75rem'}}>Expected Columns ({EXPECTED_COLUMNS.length} total):</p>
                    <div className="expected-columns-list">
                      {EXPECTED_COLUMNS.map(col => <span key={col} className="col-badge">{col}</span>)}
                    </div>
                  </div>

                  <div className="excel-table-wrapper">
                    <table className="excel-grid">
                      <thead>
                        <tr>
                          {EXPECTED_COLUMNS.map(col => <th key={col}>{col.replace(/_/g, ' ')}</th>)}
                          <th className="action-th" style={{background: '#2c3e50'}}>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {gridData.map((row, rIdx) => (
                           <tr key={rIdx}>
                             {EXPECTED_COLUMNS.map(col => {
                               const val = row[col as keyof typeof row];
                               const isMandatory = ['Person_FirstName','Person_Mobile1','Post_Name'].includes(col);
                               const hasError = isMandatory && !val;
                               
                               return (
                                 <td key={col} className={hasError ? 'cell-error' : ''}>
                                   <input 
                                    type="text" 
                                    value={val} 
                                    onChange={(e) => handleCellChange(rIdx, col, e.target.value)} 
                                    className={`excel-input ${hasError ? 'input-error' : ''}`}
                                   />
                                 </td>
                               );
                             })}
                             <td className="action-td">
                               <button type="button" className="btn-delete-row" onClick={() => deleteRow(rIdx)}>Delete</button>
                             </td>
                           </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  <div className="preview-actions">
                    <button type="button" className="btn-validate">Validate</button>
                    <button type="button" className="btn-reset">Reset</button>
                  </div>

                </div>
              )}
            </div>
          )}

          <div className="form-footer-action" style={{marginTop: '3rem'}}>
            <button type="submit" className="btn-cyan">Save Task & Commit Upload</button>
          </div>
        </form>
      </div>
    </div>
  );
}
