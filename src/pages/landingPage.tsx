import WhoWeAre from "../sections/WhoWeAre";
import Divider from "../components/Divider";
import Tracks from '../sections/Tracks';
import Events from '../sections/Events';
import UpcomingEvents from '../sections/UpComingEvents';

function LandingPage() {
    return (
        <>
            <section id="home">
            <WhoWeAre />
            </section>
            <Divider />
            <section id="tracks">
            <Tracks />
            </section>
            <Divider />
            <section id="events">
            <Events />
            </section>
            <Divider />
            <section id="upcoming-events">
            <UpcomingEvents />
            </section>           
            <Divider />
        </>
    )
}
export default LandingPage;
