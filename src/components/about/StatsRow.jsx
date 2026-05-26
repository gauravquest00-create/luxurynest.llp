import siteConfig from '../../data/siteConfig';

export default function StatsRow() {
  const stats = [
    { label: 'Years of Experience', value: siteConfig.experience },
    { label: 'Families Served', value: siteConfig.familiesServed },
    { label: 'Properties Listed', value: siteConfig.propertiesListed },
    { label: 'Client Satisfaction', value: siteConfig.satisfaction },
  ];

  return (
    <div className="stats-row">
      <div className="stats-container">
        {stats.map((stat, idx) => (
          <div key={idx} className="stat-card" style={{ animationDelay: `${idx * 0.1}s` }}>
            <div className="stat-value">{stat.value}</div>
            <div className="stat-label">{stat.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}