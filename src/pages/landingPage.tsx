import Navbar from "../components/Navbar";
import WhoWeAre from "../components/WhoWeAre";
import Divider from "../components/Divider";
import Tracks from './../components/Tracks';
import Events from './../components/Events';
import UpcomingEvents from './../components/UpComingEvents';
import Footer from './../components/Footer';

function LandingPage() {
    return (
        <div className="min-h-screen bg-white">
            <Navbar />
            <WhoWeAre />
            <Divider />
            <Tracks />
            <Divider />
            <Events />
            <UpcomingEvents />
            <Divider />
            <Footer />
        </div>
    )
}
export default LandingPage;
