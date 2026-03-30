import { useNavigate } from 'react-router-dom';
import { ShieldCheck, ArrowRight, Activity, Users, Sun, Leaf, TrendingDown, Home as HomeIcon } from 'lucide-react';
import './LandingPage.css';

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="landing-container">
      <nav className="landing-nav glass">
        <div className="nav-brand">
          <ShieldCheck className="brand-icon" size={28} />
          <h2>Solar CRM</h2>
          <span className="badge">Authorized Access</span>
        </div>
        <button className="btn-primary login-btn" onClick={() => navigate('/login')}>
          Login <ArrowRight size={16} />
        </button>
      </nav>

      <main className="landing-main">
        <section className="hero animate-fade-in">
          <div className="hero-content">
            <h1>Solar CRM Infrastructure Management</h1>
            <p className="hero-subtitle">
              Secure, centralized portal for tracking, managing, and resolving solar implementation requests successfully.
            </p>
            <div className="hero-stats">
              <div className="stat-pill card">
                <Activity className="stat-icon" />
                <div>
                  <strong>98.4%</strong>
                  <span>Uptime</span>
                </div>
              </div>
              <div className="stat-pill card">
                <Users className="stat-icon" />
                <div>
                  <strong>24k+</strong>
                  <span>Active Installations</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="benefits-section">
          <div className="benefits-header">
            <h2>Why Solar Implementation Matters</h2>
            <p>Empowering homes and businesses with clean, renewable energy that pays for itself.</p>
          </div>
          
          <div className="benefits-grid">
            <div className="benefit-card card">
              <div className="benefit-icon">
                <div style={{background: 'rgba(255, 193, 7, 0.15)', color: '#d39e00', padding: '1.25rem', borderRadius: '16px', display: 'inline-block'}}>
                  <Sun size={32} />
                </div>
              </div>
              <h3>Sustainable Energy</h3>
              <p>Harness the virtually limitless power of the sun to generate 100% clean, renewable energy. Provide reliable electricity for decades to come without depleting finite natural resources.</p>
            </div>
            
            <div className="benefit-card card">
               <div className="benefit-icon">
                 <div style={{background: 'rgba(40, 167, 69, 0.15)', color: 'var(--color-success)', padding: '1.25rem', borderRadius: '16px', display: 'inline-block'}}>
                   <Leaf size={32} />
                 </div>
               </div>
              <h3>Reduce Carbon Footprint</h3>
              <p>Transitioning to solar power drastically cuts your greenhouse gas emissions, actively fighting climate change while contributing directly to a healthier global environment.</p>
            </div>
            
            <div className="benefit-card card">
               <div className="benefit-icon">
                 <div style={{background: 'rgba(0, 90, 156, 0.15)', color: 'var(--color-secondary)', padding: '1.25rem', borderRadius: '16px', display: 'inline-block'}}>
                   <TrendingDown size={32} />
                 </div>
               </div>
              <h3>Lower Energy Costs</h3>
              <p>Experience an immediate reduction in monthly electricity bills. Protect yourself against rising utility rates and enjoy energy independence with highly predictable power generation.</p>
            </div>

            <div className="benefit-card card">
               <div className="benefit-icon">
                 <div style={{background: 'rgba(0, 51, 102, 0.15)', color: 'var(--color-primary)', padding: '1.25rem', borderRadius: '16px', display: 'inline-block'}}>
                   <HomeIcon size={32} />
                 </div>
               </div>
              <h3>Increase Property Value</h3>
              <p>Homes and businesses equipped with solar energy systems sell faster and at a premium compared to non-solar properties, making it a highly powerful long-term real estate investment.</p>
            </div>
          </div>
        </section>
      </main>

      <footer className="landing-footer">
        <p>© 2026 Solar CRM Infrastructure Management. Secure Enterprise Access.</p>
      </footer>
    </div>
  );
}
