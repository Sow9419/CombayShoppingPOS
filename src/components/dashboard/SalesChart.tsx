import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

interface SalesChartProps {
  period: string;
}

const data = {
    day: [
      { name: '00:00', sales: 30, expenses: 10 },
      { name: '03:00', sales: 40, expenses: 15 },
      { name: '06:00', sales: 60, expenses: 25 },
      { name: '09:00', sales: 80, expenses: 30 },
      { name: '12:00', sales: 120, expenses: 40 },
      { name: '15:00', sales: 90, expenses: 35 },
      { name: '18:00', sales: 70, expenses: 28 },
      { name: '21:00', sales: 50, expenses: 20 },
    ],
    week: [
      { name: 'Lun', sales: 200, expenses: 80 },
      { name: 'Mar', sales: 250, expenses: 100 },
      { name: 'Mer', sales: 300, expenses: 120 },
      { name: 'Jeu', sales: 280, expenses: 110 },
      { name: 'Ven', sales: 350, expenses: 130 },
      { name: 'Sam', sales: 400, expenses: 150 },
      { name: 'Dim', sales: 150, expenses: 60 },
    ],
    month: [
      { name: 'Sem 1', sales: 800, expenses: 300 },
      { name: 'Sem 2', sales: 1200, expenses: 450 },
      { name: 'Sem 3', sales: 1000, expenses: 400 },
      { name: 'Sem 4', sales: 1500, expenses: 600 },
    ],
    year: [
        { name: 'Jan', sales: 5000, expenses: 2000 },
        { name: 'Fév', sales: 8000, expenses: 3000 },
        { name: 'Mar', sales: 3500, expenses: 1500 },
        { name: 'Avr', sales: 2800, expenses: 1200 },
        { name: 'Mai', sales: 4500, expenses: 1800 },
        { name: 'Jui', sales: 4800, expenses: 2000 },
        { name: 'Juil', sales: 4200, expenses: 1700 },
        { name: 'Aoû', sales: 3800, expenses: 1600 },
        { name: 'Sep', sales: 4500, expenses: 1900 },
        { name: 'Oct', sales: 4200, expenses: 1800 },
        { name: 'Nov', sales: 1800, expenses: 800 },
        { name: 'Déc', sales: 2200, expenses: 900 }
    ]
  };

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-gray-900/80 backdrop-blur-sm text-white p-4 rounded-xl border border-gray-700 shadow-lg">
        <p className="font-bold text-lg mb-2">{label}</p>
        {payload.map((pld: any, index: number) => (
          <div key={index} className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: pld.color }}></div>
              <p className="text-sm">{pld.name}:</p>
            </div>
            <p className="font-semibold ml-4">{pld.value.toLocaleString()} FCFA</p>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

const SalesChart: React.FC<SalesChartProps> = ({ period }) => {
  const chartData = data[period as keyof typeof data] || data.month;

  return (
    <div className="bg-gray-900/50 rounded-2xl p-6 border border-gray-700/50 backdrop-blur-sm">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-white">Performance</h2>
          <p className="text-gray-400">Ventes vs Dépenses</p>
        </div>
      </div>

      <div className="h-96 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={chartData}
            margin={{
              top: 10,
              right: 30,
              left: 0,
              bottom: 0,
            }}
          >
            <defs>
              <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#34D399" stopOpacity={0.4}/>
                <stop offset="95%" stopColor="#34D399" stopOpacity={0}/>
              </linearGradient>
              <linearGradient id="colorExpenses" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#F87171" stopOpacity={0.4}/>
                <stop offset="95%" stopColor="#F87171" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" vertical={false} />
            <XAxis 
              dataKey="name" 
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
              tickFormatter={(value) => `${Number(value) / 1000}k`}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend wrapperStyle={{ paddingTop: '20px' }} />
            <Area 
                type="monotone" 
                dataKey="sales" 
                stroke="#34D399" 
                strokeWidth={3}
                fillOpacity={1} 
                fill="url(#colorSales)" 
                name="Ventes"
                dot={{ stroke: '#34D399', strokeWidth: 2, r: 5, fill: '#111827' }}
                activeDot={{ r: 8, stroke: '#34D399', fill: '#111827' }}
            />
            <Area 
                type="monotone" 
                dataKey="expenses" 
                stroke="#F87171" 
                strokeWidth={3}
                fillOpacity={1} 
                fill="url(#colorExpenses)" 
                name="Dépenses"
                dot={{ stroke: '#F87171', strokeWidth: 2, r: 5, fill: '#111827' }}
                activeDot={{ r: 8, stroke: '#F87171', fill: '#111827' }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default SalesChart;