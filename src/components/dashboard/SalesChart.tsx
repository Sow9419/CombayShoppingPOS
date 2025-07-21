import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts';

interface SalesChartProps {
  period: string;
}

const SalesChart: React.FC<SalesChartProps> = ({ period }) => {
  // Données simulées pour le graphique
  const salesData = [
    { month: 'Jan', sales: 50, fullMonth: 'Janvier' },
    { month: 'Fév', sales: 80, fullMonth: 'Février' },
    { month: 'Mar', sales: 350, fullMonth: 'Mars' },
    { month: 'Avr', sales: 280, fullMonth: 'Avril' },
    { month: 'Mai', sales: 450, fullMonth: 'Mai' },
    { month: 'Jun', sales: 480, fullMonth: 'Juin' },
    { month: 'Jul', sales: 420, fullMonth: 'Juillet' },
    { month: 'Aoû', sales: 380, fullMonth: 'Août' },
    { month: 'Sep', sales: 450, fullMonth: 'Septembre' },
    { month: 'Oct', sales: 420, fullMonth: 'Octobre' },
    { month: 'Nov', sales: 180, fullMonth: 'Novembre' },
    { month: 'Déc', sales: 220, fullMonth: 'Décembre' }
  ];

  return (
    <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-semibold text-white mb-1">Statistique de vente</h2>
          <p className="text-gray-400 text-sm">Évolution des ventes sur l'année</p>
        </div>
      </div>

      <div className="h-80 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={salesData}
            margin={{
              top: 10,
              right: 10,
              left: 10,
              bottom: 10,
            }}
          >
            <defs>
              <linearGradient id="salesGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#F59E0B" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#F59E0B" stopOpacity={0.05}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
            <XAxis 
              dataKey="month" 
              stroke="#9CA3AF"
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            <YAxis 
              stroke="#9CA3AF"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => `${value}`}
            />
            <Area
              type="monotone"
              dataKey="sales"
              stroke="#F59E0B"
              strokeWidth={3}
              fill="url(#salesGradient)"
              dot={{ fill: '#F59E0B', strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6, stroke: '#F59E0B', strokeWidth: 2, fill: '#1F2937' }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default SalesChart;