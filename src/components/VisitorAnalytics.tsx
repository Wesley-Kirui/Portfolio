import React, { useEffect, useState } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';
import { Line, Bar } from 'react-chartjs-2';
import { Eye, Download, MessageSquare, TrendingUp } from 'lucide-react';
import type { AnalyticsData } from '../db/initialData';
import { dbGetAnalytics } from '../db/store';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

export const VisitorAnalytics: React.FC = () => {
  const [data, setData] = useState<AnalyticsData | null>(null);

  useEffect(() => {
    const fetchAnalytics = async () => {
      const dbData = await dbGetAnalytics();
      setData(dbData);
    };
    fetchAnalytics();
  }, []);

  if (!data) {
    return (
      <div className="text-center py-12 text-slate-500 font-mono text-xs">
        LOADING ANALYTICS ENGINE... //
      </div>
    );
  }

  // Calculate totals
  const totalViews = data.views.reduce((a, b) => a + b, 0);
  const totalDownloads = data.downloads.reduce((a, b) => a + b, 0);
  const totalSubmissions = data.submissions.reduce((a, b) => a + b, 0);

  // Line Chart Config for Traffic
  const lineChartData = {
    labels: data.dates,
    datasets: [
      {
        fill: true,
        label: 'Page Views',
        data: data.views,
        borderColor: '#06b6d4',
        backgroundColor: 'rgba(6, 182, 212, 0.05)',
        tension: 0.35,
        borderWidth: 2,
        pointBackgroundColor: '#06b6d4',
      },
      {
        fill: true,
        label: 'CV Downloads',
        data: data.downloads,
        borderColor: '#0ea5e9',
        backgroundColor: 'rgba(14, 165, 233, 0.03)',
        tension: 0.35,
        borderWidth: 2,
        pointBackgroundColor: '#0ea5e9',
      }
    ],
  };

  const lineChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
        labels: {
          color: '#94a3b8',
          font: { family: 'Inter', size: 11 }
        }
      },
    },
    scales: {
      x: {
        grid: { color: 'rgba(58, 80, 107, 0.08)' },
        ticks: { color: '#94a3b8', font: { family: 'JetBrains Mono', size: 10 } }
      },
      y: {
        grid: { color: 'rgba(58, 80, 107, 0.08)' },
        ticks: { color: '#94a3b8', font: { family: 'JetBrains Mono', size: 10 } }
      }
    }
  };

  // Bar Chart Config for Contact Inquiries
  const barChartData = {
    labels: data.dates,
    datasets: [
      {
        label: 'Contact Submissions',
        data: data.submissions,
        backgroundColor: '#10b981',
        borderColor: '#10b981',
        borderWidth: 1,
        borderRadius: 4,
      }
    ],
  };

  const barChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
        labels: {
          color: '#94a3b8',
          font: { family: 'Inter', size: 11 }
        }
      },
    },
    scales: {
      x: {
        grid: { color: 'rgba(58, 80, 107, 0.08)' },
        ticks: { color: '#94a3b8', font: { family: 'JetBrains Mono', size: 10 } }
      },
      y: {
        grid: { color: 'rgba(58, 80, 107, 0.08)' },
        ticks: { color: '#94a3b8', font: { family: 'JetBrains Mono', size: 10 }, stepSize: 1 }
      }
    }
  };

  return (
    <div className="space-y-8 text-left">
      
      {/* Top Cards Section */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* Page views card */}
        <div className="glass p-5 rounded-xl border border-navy-800 flex items-center space-x-4">
          <div className="w-10 h-10 rounded-lg bg-scientific-teal/10 flex items-center justify-center text-scientific-teal border border-scientific-teal/20">
            <Eye size={20} />
          </div>
          <div>
            <span className="text-[10px] text-slate-500 font-mono block">PAGE VIEWS (7D)</span>
            <span className="text-xl font-bold text-white dark:text-white light:text-navy-950 font-mono">{totalViews}</span>
          </div>
        </div>

        {/* Downloads card */}
        <div className="glass p-5 rounded-xl border border-navy-800 flex items-center space-x-4">
          <div className="w-10 h-10 rounded-lg bg-scientific-cyan/10 flex items-center justify-center text-scientific-cyan border border-scientific-cyan/20">
            <Download size={20} />
          </div>
          <div>
            <span className="text-[10px] text-slate-500 font-mono block">CV DOWNLOADS (7D)</span>
            <span className="text-xl font-bold text-white dark:text-white light:text-navy-950 font-mono">{totalDownloads}</span>
          </div>
        </div>

        {/* Submissions card */}
        <div className="glass p-5 rounded-xl border border-navy-800 flex items-center space-x-4">
          <div className="w-10 h-10 rounded-lg bg-scientific-emerald/10 flex items-center justify-center text-scientific-emerald border border-scientific-emerald/20">
            <MessageSquare size={20} />
          </div>
          <div>
            <span className="text-[10px] text-slate-500 font-mono block">SUBMISSIONS (7D)</span>
            <span className="text-xl font-bold text-white dark:text-white light:text-navy-950 font-mono">{totalSubmissions}</span>
          </div>
        </div>
      </div>

      {/* Charts Panels */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Line Chart traffic */}
        <div className="lg:col-span-8 glass p-6 rounded-2xl border border-navy-800 flex flex-col justify-between">
          <div className="flex items-center justify-between mb-4 border-b border-navy-800 pb-2">
            <h4 className="text-sm font-bold text-white flex items-center space-x-1.5 font-mono uppercase tracking-wide">
              <TrendingUp size={16} className="text-scientific-teal" />
              <span>Visitor & Interaction Logs</span>
            </h4>
            <span className="text-[9px] font-mono text-slate-500 uppercase">ACTIVE ENGAGEMENT INDEX</span>
          </div>
          <div className="h-64 w-full relative">
            <Line data={lineChartData} options={lineChartOptions} />
          </div>
        </div>

        {/* Bar Chart inquiries */}
        <div className="lg:col-span-4 glass p-6 rounded-2xl border border-navy-800 flex flex-col justify-between">
          <div className="flex items-center justify-between mb-4 border-b border-navy-800 pb-2">
            <h4 className="text-sm font-bold text-white flex items-center space-x-1.5 font-mono uppercase tracking-wide">
              <MessageSquare size={16} className="text-scientific-emerald" />
              <span>Contact Packets</span>
            </h4>
            <span className="text-[9px] font-mono text-slate-500 uppercase font-bold">TOTALS</span>
          </div>
          <div className="h-64 w-full relative">
            <Bar data={barChartData} options={barChartOptions} />
          </div>
        </div>

      </div>

    </div>
  );
};
