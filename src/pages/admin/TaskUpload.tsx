import { UploadCloud } from 'lucide-react';
import './ManageTasks.css';

export default function TaskUpload() {
  return (
    <div className="manage-tasks-container animate-fade-in" style={{ height: '70vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div className="card text-center" style={{ padding: '4rem 2rem', maxWidth: '600px' }}>
        <div style={{ background: 'rgba(0, 90, 156, 0.1)', color: 'var(--color-primary)', display: 'inline-block', padding: '1.5rem', borderRadius: '50%', marginBottom: '1.5rem'}}>
          <UploadCloud size={48} />
        </div>
        <h2 style={{color: 'var(--color-text-main)', marginBottom: '1rem'}}>Task Assignment Processing</h2>
        <p className="text-muted" style={{fontSize: '1.1rem', lineHeight: 1.6}}>
          The assignment mapping module is currently preparing for dynamic logic integration. Dedicated CRM task-to-executive binding rules will populate this architecture based on your explicit upcoming specifications!
        </p>
      </div>
    </div>
  );
}
