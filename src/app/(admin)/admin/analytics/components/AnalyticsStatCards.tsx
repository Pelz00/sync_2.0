import { DollarSign, ShoppingCart, BarChart2, Users, TrendingUp, TrendingDown } from "lucide-react";
import type { StatCard } from "../data";

const ICONS: Record<string, React.ReactNode> = {
  revenue: <DollarSign size={20} className="text-white" />,
  orders: <ShoppingCart size={20} className="text-white" />,
  avg: <BarChart2 size={20} className="text-white" />,
  customers: <Users size={20} className="text-white" />,
};

export function AnalyticsStatCards({ stats }: { stats: StatCard[] }) {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-5">
      {stats.map((s, i) => {
        const neg = s.change < 0;
        return (
          <div
            key={s.key}
            className="bg-panel rounded-2xl border border-line/20 shadow-sm hover:shadow-md transition-all duration-200 p-5 flex flex-col gap-2 group"
            style={{ animationDelay: `${i * 60}ms` }} >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-1">{s.label}</p>
                <p className="font-display text-2xl font-bold text-content">{s.value}</p>
              </div>
              <div className={`w-10 h-10 rounded-2xl ${s.iconBg} flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform`}>
                {ICONS[s.icon]}
              </div>
            </div>
            <div className={`flex items-center gap-1 text-xs font-semibold ${neg ? "text-red-500" : "text-emerald-600"}`}>
              {neg ? <TrendingDown size={12} /> : <TrendingUp size={12} />}
              {neg ? "" : "+"}{s.change}% vs last month
            </div>
          </div>
        );
      })}
    </div>
  );
}
