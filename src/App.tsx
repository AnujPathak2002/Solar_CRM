import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import Dashboard from './pages/Dashboard';
import Reporting from './pages/Reporting';
import Outreach from './pages/Outreach';
import Layout from './components/layout/Layout';

// Supervisor Specific Routes
import TaskList from './pages/admin/TaskList';
import TaskForm from './pages/admin/TaskForm';
import TaskUpload from './pages/admin/TaskUpload';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        
        {/* Protected Routes (Wrapper) */}
        <Route path="/app" element={<Layout />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="outreach" element={<Outreach />} />
          <Route path="reporting" element={<Reporting />} />
          
          {/* Supervisor Manage Tasks Routes */}
          <Route path="manage-tasks/list" element={<TaskList />} />
          <Route path="manage-tasks/create" element={<TaskForm />} />
          <Route path="manage-tasks/assign" element={<TaskUpload />} />
        </Route>
        
        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
