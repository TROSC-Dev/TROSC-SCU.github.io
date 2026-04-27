import TeamPic from '../../Assests/teamwork.webp';
import { Link } from 'react-router-dom';

function WhoWeAre() {
  return (
    <>
      {/* Hero Section */}
      <section className="pt-16">
        <div className="w-full h-[500px] overflow-hidden relative">
          <div className="absolute inset-0 z-10 bg-black/40"></div>


          <div className="absolute inset-0 z-20 flex items-center">
            <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white italic leading-tight max-w-2xl">
                Not just a team — we're a family of growth..
              </h1>
              <div className="mt-8">
                <Link to="/signup" className="inline-block bg-primary text-white font-bold text-lg py-3 px-8 rounded-md hover:bg-primary-hover transition-colors duration-300 shadow-lg">
                  Join our Family
                </Link>
              </div>
            </div>
          </div>

          <img
            src={TeamPic}
            alt="Trosc Team"
            className="w-full h-full object-cover object-center"
          />
        </div>
      </section>

      {/* Who We Are Section */}
      <section id="about" className="bg-white">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8 font-family-poppins">
              Who We're?
            </h2>

            <p className="text-base md:text-lg leading-relaxed text-gray-700 font-family-poppins font-semibold">
              Trosc is a student-led team from the Faculty of Computers and Information, dedicated to
              guiding learners through various tech tracks. We provide clear learning resources, hands-on
              tasks, and continuous support in Frontend & UI/UX, Backend, Mobile, Cyber Security, AI,
              and 3D. Join our community of passionate learners and level up your skills with Trosc!
            </p>
          </div>
        </div>
      </section>
    </>
  )
}

export default WhoWeAre;
