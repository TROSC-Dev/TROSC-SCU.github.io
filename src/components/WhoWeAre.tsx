import TeamPic from '../../Assests/teamwork.jpg';

function WhoWeAre() {
  return (
    <>
      {/* Hero Section */}
      <section id="home" className="pt-16">
        <div className="w-full h-[500px] overflow-hidden relative">
          <div className="absolute inset-0 z-10 bg-black/40"></div>


          <div className="absolute inset-0 z-20 flex flex-col justify-center px-8 md:px-16 lg:px-24">
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white italic leading-tight max-w-2xl">
              Not just a team — we're a family of growth..
            </h1>
            <div className="mt-8">
              <a href="#contact" className="inline-block bg-primary-dark text-white font-bold text-lg py-3 px-8 rounded-md hover:bg-primary-dark-hover transition-colors duration-300 shadow-lg">
                Join our Family
              </a>
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
        <div className="w-full max-w-4xl mx-auto px-6 py-16 text-center">
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-8" style={{ fontFamily: "'Georgia', serif" }}>
            Who We're?
          </h2>

          <p className="text-base md:text-lg leading-relaxed text-gray-700" style={{ fontFamily: "'Courier New', monospace" }}>
            Trosc is a student-led team from the Faculty of Computers and Information, dedicated to
            guiding learners through various tech tracks. We provide clear learning resources, hands-on
            tasks, and continuous support in Frontend & UI/UX, Backend, Mobile, Cyber Security, AI,
            and 3D. Join our community of passionate learners and level up your skills with Trosc!
          </p>
        </div>
      </section>
    </>
  )
}

export default WhoWeAre;
