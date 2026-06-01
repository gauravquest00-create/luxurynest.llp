import StatsRow from '../components/about/StatsRow';
import OwnerProfile from '../components/about/OwnerProfile';
import TeamMembers from '../components/about/TeamMembers';
import RERABadge from '../components/about/RERABadge';
import siteConfig from '../data/siteConfig';
import BackButton from '../components/common/BackButton';

export default function About() {
    return (
        <div className="about-page">
            <div className="about-container">
                <BackButton />
                <StatsRow />
                <h1 className="about-title">
                    LuxuryNest</h1>
                <p className="about-description">{siteConfig.description}</p>
                {/* <OwnerProfile /> */}
                <TeamMembers />

                <RERABadge />
            </div>
        </div>
    );
}
