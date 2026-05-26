import siteConfig from '../../data/siteConfig';
import teamMembers from '../../data/teamMembers';

export default function OwnerProfile() {
  const owner = teamMembers.find(member => member.role === 'Owner') || teamMembers[0];

  return (
    <div className="owner-profile">
      <div className="owner-container">
        <div className="owner-image-wrapper">
          <img src={owner.image || 'https://via.placeholder.com/400x400'} alt={owner.name} className="owner-image" />
        </div>
        <div className="owner-info">
          <h2 className="owner-name">Meet {owner.name}</h2>
          <p className="owner-role">{owner.role}</p>
          <p className="owner-bio">{owner.bio || `With over ${siteConfig.experience} years of experience in Dwarka's real estate market, ${owner.name} has helped more than ${siteConfig.familiesServed} families find their dream homes.`}</p>
          <p className="owner-bio-secondary">{owner.bio2 || 'Our commitment to transparency, integrity, and client satisfaction has made Sharma Properties one of the most trusted names in Dwarka.'}</p>
        </div>
      </div>
    </div>
  );
}