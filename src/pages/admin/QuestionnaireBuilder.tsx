import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  Plus, Trash2, GripVertical, Eye, EyeOff, ChevronDown,
  ToggleLeft, List, CheckSquare, Hash, AlignLeft, Calendar, ChevronDownSquare, Save
} from 'lucide-react';
import './ManageTasks.css';

type QuestionType = 'boolean' | 'radio' | 'checkbox' | 'numeric' | 'textarea' | 'datetime' | 'dropdown';

interface QuestionOption {
  id: string;
  label: string;
}

interface Question {
  id: string;
  type: QuestionType;
  label: string;
  required: boolean;
  options: QuestionOption[];
  placeholder?: string;
}

const QUESTION_TYPES: { value: QuestionType; label: string; icon: React.ReactNode; desc: string }[] = [
  { value: 'boolean',  label: 'Yes / No',        icon: <ToggleLeft size={16} />,        desc: 'Boolean toggle — quick qualify' },
  { value: 'radio',    label: 'Single Choice',    icon: <List size={16} />,              desc: 'Radio buttons — pick one option' },
  { value: 'checkbox', label: 'Multi Choice',     icon: <CheckSquare size={16} />,       desc: 'Checkboxes — pick many' },
  { value: 'numeric',  label: 'Number Input',     icon: <Hash size={16} />,             desc: 'Numeric value capture' },
  { value: 'textarea', label: 'Open Text',        icon: <AlignLeft size={16} />,         desc: 'Free-form text area' },
  { value: 'datetime', label: 'Date / Time',      icon: <Calendar size={16} />,          desc: 'Schedule site visit or follow-up' },
  { value: 'dropdown', label: 'Dropdown',         icon: <ChevronDownSquare size={16} />, desc: 'Standardised single selection' },
];

function uid() {
  return Math.random().toString(36).slice(2, 9);
}

function makeQuestion(type: QuestionType = 'boolean'): Question {
  return {
    id: uid(),
    type,
    label: '',
    required: false,
    options: type === 'radio' || type === 'checkbox' || type === 'dropdown'
      ? [{ id: uid(), label: 'Option 1' }, { id: uid(), label: 'Option 2' }]
      : [],
  };
}

// ─── Sub-components ────────────────────────────────────────────────────────────

function OptionsList({
  options, onChange,
}: {
  options: QuestionOption[];
  onChange: (opts: QuestionOption[]) => void;
}) {
  const updateLabel = (id: string, label: string) =>
    onChange(options.map(o => o.id === id ? { ...o, label } : o));
  const addOpt = () => onChange([...options, { id: uid(), label: `Option ${options.length + 1}` }]);
  const removeOpt = (id: string) => onChange(options.filter(o => o.id !== id));

  return (
    <div className="qb-options-list">
      {options.map((opt, i) => (
        <div key={opt.id} className="qb-option-row">
          <span className="qb-opt-num">{i + 1}.</span>
          <input
            className="qb-opt-input"
            value={opt.label}
            onChange={e => updateLabel(opt.id, e.target.value)}
            placeholder={`Option ${i + 1}`}
          />
          <button type="button" className="qb-opt-remove" onClick={() => removeOpt(opt.id)} title="Remove option">
            <Trash2 size={13} />
          </button>
        </div>
      ))}
      <button type="button" className="qb-add-option-btn" onClick={addOpt}>
        <Plus size={13} /> Add Option
      </button>
    </div>
  );
}

function QuestionPreview({ q }: { q: Question }) {
  switch (q.type) {
    case 'boolean':
      return (
        <div className="qb-preview-field">
          <label className="qb-preview-toggle">
            <input type="checkbox" /> <span>Yes</span>
          </label>
          <label className="qb-preview-toggle" style={{ marginLeft: '1rem' }}>
            <input type="checkbox" /> <span>No</span>
          </label>
        </div>
      );
    case 'radio':
      return (
        <div className="qb-preview-field">
          {q.options.map(o => (
            <label key={o.id} className="qb-preview-radio">
              <input type="radio" name={`prev-${q.id}`} /> {o.label || '...'}
            </label>
          ))}
        </div>
      );
    case 'checkbox':
      return (
        <div className="qb-preview-field">
          {q.options.map(o => (
            <label key={o.id} className="qb-preview-radio">
              <input type="checkbox" /> {o.label || '...'}
            </label>
          ))}
        </div>
      );
    case 'numeric':
      return <div className="qb-preview-field"><input type="number" className="qb-preview-input" placeholder="Enter number..." /></div>;
    case 'textarea':
      return <div className="qb-preview-field"><textarea className="qb-preview-textarea" rows={3} placeholder="Enter text..." /></div>;
    case 'datetime':
      return <div className="qb-preview-field"><input type="datetime-local" className="qb-preview-input" /></div>;
    case 'dropdown':
      return (
        <div className="qb-preview-field">
          <select className="qb-preview-select">
            <option>-- Select --</option>
            {q.options.map(o => <option key={o.id}>{o.label || '...'}</option>)}
          </select>
        </div>
      );
  }
}

function QuestionCard({
  q, idx, onUpdate, onRemove,
}: {
  q: Question;
  idx: number;
  onUpdate: (updated: Question) => void;
  onRemove: () => void;
}) {
  const [previewMode, setPreviewMode] = useState(false);
  const [typeOpen, setTypeOpen] = useState(false);

  const cur = QUESTION_TYPES.find(t => t.value === q.type)!;
  const hasOptions = ['radio', 'checkbox', 'dropdown'].includes(q.type);

  const set = (patch: Partial<Question>) => onUpdate({ ...q, ...patch });
  const changeType = (type: QuestionType) => {
    const needOpts = ['radio', 'checkbox', 'dropdown'].includes(type);
    const hadOpts  = ['radio', 'checkbox', 'dropdown'].includes(q.type);
    set({
      type,
      options: needOpts
        ? (hadOpts && q.options.length ? q.options : [{ id: uid(), label: 'Option 1' }, { id: uid(), label: 'Option 2' }])
        : [],
    });
    setTypeOpen(false);
  };

  return (
    <div className={`qb-card ${previewMode ? 'qb-card--preview' : ''}`}>
      {/* Card Header */}
      <div className="qb-card-header">
        <div className="qb-card-grip"><GripVertical size={16} /></div>
        <span className="qb-card-num">Q{idx + 1}</span>
        <div className="qb-card-actions">
          <button type="button" className="qb-icon-btn" onClick={() => setPreviewMode(p => !p)} title={previewMode ? 'Edit' : 'Preview'}>
            {previewMode ? <EyeOff size={15} /> : <Eye size={15} />}
          </button>
          <button type="button" className="qb-icon-btn danger" onClick={onRemove} title="Delete question">
            <Trash2 size={15} />
          </button>
        </div>
      </div>

      {previewMode ? (
        /* ── PREVIEW MODE ───────────────────────────── */
        <div className="qb-card-body">
          <p className="qb-preview-label">
            {q.label || <em style={{ color: '#999' }}>No question text</em>}
            {q.required && <span className="qb-req-star"> *</span>}
          </p>
          <QuestionPreview q={q} />
        </div>
      ) : (
        /* ── EDIT MODE ──────────────────────────────── */
        <div className="qb-card-body">
          {/* Type Selector */}
          <div className="qb-type-row">
            <label className="qb-field-label">Question Type</label>
            <div className="qb-type-dropdown">
              <button type="button" className="qb-type-btn" onClick={() => setTypeOpen(o => !o)}>
                {cur.icon} {cur.label} <ChevronDown size={13} />
              </button>
              {typeOpen && (
                <ul className="qb-type-menu">
                  {QUESTION_TYPES.map(t => (
                    <li
                      key={t.value}
                      className={`qb-type-option ${t.value === q.type ? 'active' : ''}`}
                      onClick={() => changeType(t.value)}
                    >
                      <span className="qb-type-opt-icon">{t.icon}</span>
                      <div>
                        <strong>{t.label}</strong>
                        <small>{t.desc}</small>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <label className="qb-required-toggle">
              <input type="checkbox" checked={q.required} onChange={e => set({ required: e.target.checked })} />
              <span>Required</span>
            </label>
          </div>

          {/* Question Text */}
          <div className="qb-field-group" style={{ marginTop: '0.75rem' }}>
            <label className="qb-field-label">Question Text <span className="req">*</span></label>
            <input
              className="qb-question-input"
              value={q.label}
              onChange={e => set({ label: e.target.value })}
              placeholder={`e.g. ${cur.value === 'boolean' ? 'Are you the homeowner?' : cur.value === 'numeric' ? 'Average monthly electricity bill (₹)' : 'Roof Material'}`}
            />
          </div>

          {/* Options for radio/checkbox/dropdown */}
          {hasOptions && (
            <div className="qb-field-group" style={{ marginTop: '0.75rem' }}>
              <label className="qb-field-label">Options</label>
              <OptionsList options={q.options} onChange={opts => set({ options: opts })} />
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// ─── Main Page ─────────────────────────────────────────────────────────────────

export default function QuestionnaireBuilder() {
  const navigate = useNavigate();
  const { taskId } = useParams<{ taskId?: string }>();
  const [questions, setQuestions] = useState<Question[]>([makeQuestion('boolean')]);
  const [title, setTitle] = useState('Solar Lead Qualification Form');
  const [saved, setSaved] = useState(false);

  const addQuestion = (type: QuestionType = 'boolean') =>
    setQuestions(prev => [...prev, makeQuestion(type)]);

  const updateQ = (id: string, updated: Question) =>
    setQuestions(prev => prev.map(q => q.id === id ? updated : q));

  const removeQ = (id: string) =>
    setQuestions(prev => prev.filter(q => q.id !== id));

  const handleSave = () => {
    const incomplete = questions.filter(q => !q.label.trim());
    if (incomplete.length) {
      alert(`Please fill in question text for all ${incomplete.length} question(s).`);
      return;
    }
    setSaved(true);
    setTimeout(() => {
      navigate('/app/manage-tasks/list');
    }, 1200);
  };

  return (
    <div className="manage-tasks-container animate-fade-in">
      <div className="qb-wrapper card" style={{ padding: 0, overflow: 'hidden' }}>

        {/* Header */}
        <div className="qb-header">
          <div>
            <h3>📋 Questionnaire Builder</h3>
            {taskId && <p className="qb-sub">Task ID: <strong>#{taskId}</strong></p>}
          </div>
          <div className="qb-header-meta">
            <input
              className="qb-title-input"
              value={title}
              onChange={e => setTitle(e.target.value)}
              placeholder="Questionnaire Title"
            />
          </div>
        </div>

        <div className="qb-body">
          {/* Add Question Type Bar */}
          <div className="qb-type-bar">
            <span className="qb-type-bar-label">Add Question:</span>
            {QUESTION_TYPES.map(t => (
              <button
                key={t.value}
                type="button"
                className="qb-type-pill"
                onClick={() => addQuestion(t.value)}
                title={t.desc}
              >
                {t.icon} {t.label}
              </button>
            ))}
          </div>

          {/* Questions List */}
          <div className="qb-questions-list">
            {questions.length === 0 && (
              <div className="qb-empty">
                <p>No questions yet. Click a type above to add your first question.</p>
              </div>
            )}
            {questions.map((q, idx) => (
              <QuestionCard
                key={q.id}
                q={q}
                idx={idx}
                onUpdate={updated => updateQ(q.id, updated)}
                onRemove={() => removeQ(q.id)}
              />
            ))}
          </div>

          {/* Footer Actions */}
          <div className="qb-footer">
            <button type="button" className="qb-add-main-btn" onClick={() => addQuestion()}>
              <Plus size={16} /> Add Question
            </button>
            <div className="qb-footer-right">
              <button type="button" className="btn-reset" onClick={() => navigate('/app/manage-tasks/list')}>
                Cancel
              </button>
              <button type="button" className={`qb-save-btn ${saved ? 'saved' : ''}`} onClick={handleSave}>
                <Save size={16} /> {saved ? '✓ Saved!' : 'Save Questionnaire'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
