import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, CartesianGrid, AreaChart, Area } from 'recharts';
import { PhoneCall, PhoneOutgoing, CheckCircle, Clock } from 'lucide-react';
import './Dashboard.css';

const barData = [
  { name: 'Mon', connected: 400, missed: 240 },
  { name: 'Tue', connected: 300, missed: 139 },
  { name: 'Wed', connected: 200, missed: 500 },
  { name: 'Thu', connected: 278, missed: 390 },
  { name: 'Fri', connected: 189, missed: 480 },
  { name: 'Sat', connected: 239, missed: 180 },
];

const callEffeciencyData = [
  { day: 'Day 1', attempt: 400, connected: 150 },
  { day: 'Day 2', attempt: 450, connected: 190 },
  { day: 'Day 3', attempt: 300, connected: 120 },
  { day: 'Day 4', attempt: 500, connected: 240 },
  { day: 'Day 5', attempt: 480, connected: 210 },
  { day: 'Day 6', attempt: 380, connected: 180 },
  { day: 'Day 7', attempt: 430, connected: 200 },
];

const pieData = [
  { name: 'Connected', value: 3104 },
  { name: 'No Answer', value: 4500 },
  { name: 'Busy', value: 800 },
  { name: 'Switched Off', value: 516 },
];

const COLORS = ['#28a745', '#6c757d', '#ffc107', '#dc3545'];

export default function Dashboard() {
  return (
    <div className="dashboard-container animate-fade-in">
      {/* 
        KPI Header
        Total Leads -> Total Calls
        Calls Made -> Attempt Call
        Qualified -> Connected call
        Pending Review -> Pending Review
      */}
      <div className="kpi-grid">
        <div className="kpi-card card">
          <div className="kpi-icon-wrapper" style={{background: 'rgba(0, 90, 156, 0.1)', color: 'var(--color-secondary)'}}>
            <PhoneCall size={24} />
          </div>
          <div className="kpi-info">
            <span className="kpi-label">Total Calls</span>
            <span className="kpi-value">12,450</span>
          </div>
        </div>
        <div className="kpi-card card">
          <div className="kpi-icon-wrapper" style={{background: 'rgba(227, 24, 55, 0.1)', color: 'var(--color-accent)'}}>
            <PhoneOutgoing size={24} />
          </div>
          <div className="kpi-info">
            <span className="kpi-label">Attempt Call</span>
            <span className="kpi-value">8,920</span>
          </div>
        </div>
        <div className="kpi-card card">
          <div className="kpi-icon-wrapper" style={{background: 'rgba(40, 167, 69, 0.1)', color: 'var(--color-success)'}}>
            <CheckCircle size={24} />
          </div>
          <div className="kpi-info">
            <span className="kpi-label">Connected call</span>
            <span className="kpi-value">3,104</span>
          </div>
        </div>
        <div className="kpi-card card">
          <div className="kpi-icon-wrapper" style={{background: 'rgba(255, 193, 7, 0.1)', color: '#d39e00'}}>
            <Clock size={24} />
          </div>
          <div className="kpi-info">
            <span className="kpi-label">Pending Review</span>
            <span className="kpi-value">456</span>
          </div>
        </div>
      </div>

      <div className="charts-grid">
        {/* Weekly Stacked Chart */}
        <div className="chart-card card">
          <h4>Weekly Connection Outcome</h4>
          <div className="chart-wrapper">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={barData} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
                <XAxis dataKey="name" stroke="var(--color-text-muted)" />
                <YAxis stroke="var(--color-text-muted)" />
                <Tooltip cursor={{fill: 'rgba(0,0,0,0.05)'}} />
                <Bar dataKey="connected" stackId="a" fill="var(--color-primary)" radius={[0, 0, 4, 4]} />
                <Bar dataKey="missed" stackId="a" fill="var(--color-secondary)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Phase 1 Pie Distribution */}
        <div className="chart-card card">
          <h4>Phase 1 Connectivity Distribution</h4>
          <div className="chart-wrapper pie-wrapper">
            <ResponsiveContainer width="100%" height={260}>
              <PieChart>
                <Pie
                  data={pieData}
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {pieData.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="pie-legend">
              {pieData.map((entry, index) => (
                <div key={entry.name} className="legend-item">
                  <span className="legend-color" style={{backgroundColor: COLORS[index]}}></span>
                  <span className="legend-label">{entry.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* New Full Width Call Efficiency Area Chart */}
      <div className="maps-section card" style={{marginTop: '1.5rem'}}>
        <h4>Advanced Analytics: Call Setup Efficiency (7 Days)</h4>
        <div className="chart-wrapper">
           <ResponsiveContainer width="100%" height={350}>
             <AreaChart data={callEffeciencyData} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
               <defs>
                 <linearGradient id="colorAttempt" x1="0" y1="0" x2="0" y2="1">
                   <stop offset="5%" stopColor="var(--color-secondary)" stopOpacity={0.8}/>
                   <stop offset="95%" stopColor="var(--color-secondary)" stopOpacity={0}/>
                 </linearGradient>
                 <linearGradient id="colorConnected" x1="0" y1="0" x2="0" y2="1">
                   <stop offset="5%" stopColor="var(--color-success)" stopOpacity={0.8}/>
                   <stop offset="95%" stopColor="var(--color-success)" stopOpacity={0}/>
                 </linearGradient>
               </defs>
               <XAxis dataKey="day" stroke="var(--color-text-muted)" />
               <YAxis stroke="var(--color-text-muted)" />
               <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border-color)" />
               <Tooltip />
               <Area type="monotone" dataKey="attempt" stroke="var(--color-secondary)" fillOpacity={1} fill="url(#colorAttempt)" />
               <Area type="monotone" dataKey="connected" stroke="var(--color-success)" fillOpacity={1} fill="url(#colorConnected)" />
             </AreaChart>
           </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
