import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ShieldCheck, ArrowRight, Lock, ArrowLeft } from 'lucide-react';
import './LoginPage.css';

export default function LoginPage() {
  const navigate = useNavigate();
  const [step, setStep] = useState<1 | 2>(1);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [otp, setOtp] = useState(['', '', '', '']);
  const [error, setError] = useState('');

  const validateCredentials = (user: string, pass: string) => {
    if (pass !== 'ok') return false;
    
    if (user === 'Supervisor') return 'admin';
    
    if (user.startsWith('executive')) {
      const numStr = user.slice(9);
      const num = parseInt(numStr, 10);
      if (!isNaN(num) && num >= 1 && num <= 10) {
        return 'executive';
      }
    }
    return false;
  };

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const role = validateCredentials(username, password);
    if (!role) {
      setError('Invalid Invalid username or password.');
      return;
    }
    setStep(2);
    setError('');
  };

  const handleOtpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const otpValue = otp.join('');
    if (otpValue === '2026') {
      const role = validateCredentials(username, password);
      if (role) {
        localStorage.setItem('auth_user_role', role);
        localStorage.setItem('auth_username', username);
        navigate('/app/dashboard');
      }
    } else {
      setError('Invalid OTP. Please try again.');
    }
  };

  const updateOtp = (index: number, value: string) => {
    if (value.length > 1) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    setError('');
    
    // Auto focus next
    if (value && index < 3) {
      const nextInput = document.getElementById(`otp-${index + 1}`) as HTMLInputElement;
      if (nextInput) nextInput.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      const prevInput = document.getElementById(`otp-${index - 1}`) as HTMLInputElement;
      if (prevInput) {
        prevInput.focus();
        const newOtp = [...otp];
        newOtp[index - 1] = '';
        setOtp(newOtp);
      }
    }
  };

  return (
    <div className="login-container">
      <div className="login-box card animate-fade-in">
        <Link to="/" className="back-link">
          <ArrowLeft size={16} /> Back to Home
        </Link>
        
        <div className="login-header">
          <ShieldCheck size={48} className="login-logo" />
          <h2>Solar CRM Portal</h2>
          <p>Secure System Access</p>
        </div>

        {step === 1 ? (
          <form onSubmit={handleLoginSubmit} className="login-form">
            <div className="input-group">
              <label className="input-label">Username</label>
              <input
                type="text"
                className="input-field"
                value={username}
                onChange={(e) => { setUsername(e.target.value); setError(''); }}
                placeholder="Enter Username"
                required
                autoFocus
              />
            </div>
            <div className="input-group">
              <label className="input-label">Password</label>
              <input
                type="password"
                className="input-field"
                value={password}
                onChange={(e) => { setPassword(e.target.value); setError(''); }}
                placeholder="Enter password"
                required
              />
            </div>
            {error && <p className="error-text" style={{marginTop: '0.5rem'}}>{error}</p>}
            <button type="submit" className="btn-primary w-full" disabled={!username || !password}>
              Login <ArrowRight size={16} />
            </button>
          </form>
        ) : (
          <form onSubmit={handleOtpSubmit} className="login-form">
            <div className="input-group">
              <label className="input-label" style={{ textAlign: 'center', marginBottom: '1rem' }}>
                Enter OTP sent to your registered device
              </label>
              <div className="otp-container">
                {otp.map((digit, idx) => (
                  <input
                    key={idx}
                    id={`otp-${idx}`}
                    type="text"
                    className="otp-input"
                    value={digit}
                    onChange={(e) => updateOtp(idx, e.target.value.replace(/\D/g, ''))}
                    onKeyDown={(e) => handleKeyDown(idx, e)}
                    maxLength={1}
                    autoFocus={idx === 0}
                  />
                ))}
              </div>
              {error && <p className="error-text">{error}</p>}
            </div>
            <button type="submit" className="btn-primary w-full" disabled={otp.join('').length !== 4}>
              Verify & Secure Login <Lock size={16} style={{ marginLeft: 8 }} />
            </button>
            <button type="button" className="text-secondary back-btn" onClick={() => { setStep(1); setError(''); }}>
              Back to Login
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
