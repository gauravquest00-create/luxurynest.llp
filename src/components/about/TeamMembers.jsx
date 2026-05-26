import teamMembers from '../../data/teamMembers';

export default function TeamMembers() {
  return (
    <div className="team-members">
      <h2 className="team-title">Meet Our Experts</h2>
      <p className="team-subtitle">Dedicated professionals ready to assist you</p>
      <div className="team-grid">
        {teamMembers.map((member) => (
          <div key={member.id} className="team-card">
            <div className="team-image-wrapper">
              <img src={member.image} alt={member.name} className="team-image" />
            </div>
            <div className="team-info">
              <h3 className="team-name">{member.name}</h3>
              <p className="team-role">{member.role}</p>
              <p className="team-experience">📅 {member.experience} experience</p>
              <p className="team-rera">🏢 RERA: {member.rera}</p>
              <p className="team-bio">{member.bio}</p>
              <a href={`tel:${member.phone}`} className="team-phone">📞 {member.phone}</a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}