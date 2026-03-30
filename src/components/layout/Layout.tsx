import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { Home, BarChart2, LogOut, Settings, ClipboardList, Folders, FilePlus, UploadCloud, ChevronDown } from 'lucide-react';
import { useEffect, useState } from 'react';
import './Layout.css';

export default function Layout() {
  const navigate = useNavigate();
  const location = useLocation();
  const [username, setUsername] = useState('User');
  const [role, setRole] = useState('executive');
  const [tasksMenuOpen, setTasksMenuOpen] = useState(true);

  useEffect(() => {
    const authUserName = localStorage.getItem('auth_username');
    const authRole = localStorage.getItem('auth_user_role');
    
    if (authUserName) setUsername(authUserName);
    if (authRole) {
      setRole(authRole);
      if (authRole === 'executive' && location.pathname === '/app/dashboard') {
        navigate('/app/outreach', { replace: true });
      }
    } else {
      navigate('/login');
    }
  }, [navigate, location.pathname]);

  const handleLogout = () => {
    localStorage.removeItem('auth_username');
    localStorage.removeItem('auth_user_role');
    navigate('/login');
  };

  const getPageTitle = () => {
    if (location.pathname.includes('dashboard')) return 'System Dashboard';
    if (location.pathname.includes('outreach')) return 'Your Assigned Tasks';
    if (location.pathname.includes('reporting')) return 'Operational Reporting';
    if (location.pathname.includes('manage-tasks/list')) return 'Manage Existing Tasks';
    if (location.pathname.includes('manage-tasks/create')) return 'Add/Edit Task Request';
    if (location.pathname.includes('manage-tasks/assign')) return 'Assign Tasks via Excel';
    if (location.pathname.includes('manage-tasks/questionnaire')) return 'Questionnaire Builder';
    return 'Solar CRM';
  };

  return (
    <div className="app-layout">
      {/* Sidebar */}
      <aside className="sidebar">
        <div className="sidebar-header">
          <h2>Solar CRM</h2>
        </div>
        <nav className="sidebar-nav">
          {role === 'admin' && (
            <button 
              className={`nav-item ${location.pathname === '/app/dashboard' ? 'active' : ''}`}
              onClick={() => navigate('/app/dashboard')}
            >
              <Home size={20} /> Dashboard
            </button>
          )}

          {role === 'admin' && (
            <div className="nav-group">
              <button 
                className="nav-item group-header" 
                onClick={() => setTasksMenuOpen(!tasksMenuOpen)}
                style={{ justifyContent: 'space-between' }}
              >
                <div style={{display: 'flex', alignItems: 'center', gap: '12px'}}>
                  <Folders size={20} /> Manage Task
                </div>
                <ChevronDown size={16} style={{ transform: tasksMenuOpen ? 'rotate(180deg)' : 'rotate(0deg)', transition: '0.2s' }} />
              </button>
              
              {tasksMenuOpen && (
                <div className="nav-subgroup">
                  <button 
                    className={`nav-item sub-item ${location.pathname.includes('/app/manage-tasks/list') || location.pathname.includes('/app/manage-tasks/create') ? 'active' : ''}`}
                    onClick={() => navigate('/app/manage-tasks/list')}
                  >
                    <FilePlus size={18} /> Add Task
                  </button>
                  <button 
                    className={`nav-item sub-item ${location.pathname === '/app/manage-tasks/assign' ? 'active' : ''}`}
                    onClick={() => navigate('/app/manage-tasks/assign')}
                  >
                    <UploadCloud size={18} /> Assign Task
                  </button>
                </div>
              )}
            </div>
          )}
          
          {role === 'executive' && (
            <button 
              className={`nav-item ${location.pathname === '/app/outreach' ? 'active' : ''}`}
              onClick={() => navigate('/app/outreach')}
            >
              <ClipboardList size={20} /> My Tasks
            </button>
          )}

          <button 
            className={`nav-item ${location.pathname === '/app/reporting' ? 'active' : ''}`}
            onClick={() => navigate('/app/reporting')}
          >
            <BarChart2 size={20} /> Reporting
          </button>
        </nav>
        <div className="sidebar-footer">
          <button className="nav-item">
            <Settings size={20} /> Settings
          </button>
          <button className="nav-item text-danger" onClick={handleLogout}>
            <LogOut size={20} /> Logout
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="main-area">
        <header className="app-header glass">
          <div className="header-title">
            <h3>{getPageTitle()}</h3>
          </div>
          <div className="header-profile">
            <div className="avatar">{username.charAt(0).toUpperCase()}</div>
            <span style={{fontWeight: 500}}>{username}</span>
          </div>
        </header>

        <main className="content-container">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
