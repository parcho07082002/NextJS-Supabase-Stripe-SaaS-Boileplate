'use client';

interface ApplicationStat {
  status: string;
  count: number;
  percentage: number;
  color: 'primary' | 'secondary' | 'accent';
}

interface ApplicationStatsProps {
  stats: ApplicationStat[];
}

export default function ApplicationStats({ stats }: ApplicationStatsProps) {
  return (
    <div className="space-y-4">
      <h3 className="font-semibold">Application Status</h3>
      <div className="space-y-2">
        {stats.map((stat, index) => (
          <div key={index} className="flex items-center gap-2">
            <span className={`w-3 h-3 rounded-full bg-${stat.color}`}></span>
            <span className="text-base-content">{stat.status} ({stat.count})</span>
            <div className="flex-1 h-2 rounded-full bg-base-100">
              <div 
                className={`h-full rounded-full bg-${stat.color}`} 
                style={{ width: `${stat.percentage}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
