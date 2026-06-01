import siteConfig from '../../data/siteConfig';

export default function RERABadge() {
    return (
        <div className="rera-badge">
            <div className="rera-content">
                <span className="rera-icon">🏢</span>
                <p className="rera-text">
                    <strong>RERA Registered:</strong> 
                </p>
                <p className="rera-disclaimer">

                    Luxurynest is a fully compliant real estate agency registered under RERA Act.
                </p>
            </div>
        </div>
    );
}
