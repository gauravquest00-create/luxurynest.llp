import StatsRow from '../components/about/StatsRow';
import OwnerProfile from '../components/about/OwnerProfile';
import TeamMembers from '../components/about/TeamMembers';
import RERABadge from '../components/about/RERABadge';
import siteConfig from '../data/siteConfig';

export default function About() {
    return (
        <div className="about-page">
            <div className="about-container">
                <h1 className="about-title">
                    Gaurav Associates</h1>
                <p className="about-description">{siteConfig.description}</p>
                <StatsRow />
                <OwnerProfile />
                <TeamMembers />

                <RERABadge />
            </div>
        </div>
    );
}