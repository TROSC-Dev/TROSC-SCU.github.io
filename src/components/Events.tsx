import React from 'react';

interface Event {
  title: string;
  description: string;
  imageUrl: string;
}

const eventsData: Event[] = [
  {
    title: 'Trosc - lama cat event 2024',
    description: 'an exciting gathering for tech enthusiasts and creative minds!\nJoin inspiring workshops, hands-on sessions, and interactive talks across multiple tracks.\nConnect with experts, level up your skills, and explore innovative projects.',
    imageUrl: 'https://placehold.co/500x350/1a0e0e/ffffff?text=Event+1&font=raleway',
  },
  {
    title: 'Somabay Endurance Festival –\nSomabay, Egypt',
    description: 'With endurance challenges like running and cycling, this festival represents persistence and pushing boundaries. Trosc members would have related this energy to mastering difficult tracks and staying committed to learning.',
    imageUrl: 'https://placehold.co/500x350/1a0e0e/ffffff?text=Event+2&font=raleway',
  },
];

const EventCard: React.FC<{ event: Event; index: number }> = ({ event, index }) => {
  const isEven = index % 2 === 0;

  return (
    <div className={`flex flex-col ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'} items-center gap-8 mb-12`}>
      <div className="flex-1">
        <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-4 whitespace-pre-line">{event.title}</h3>
        <p className="text-gray-600 text-sm leading-relaxed mb-6 whitespace-pre-line">{event.description}</p>
        <a href="#" className="inline-block bg-[#D41132] text-white font-semibold py-2.5 px-6 rounded-full hover:bg-[#b30e2a] transition-colors duration-300 text-sm">
          See More
        </a>
      </div>
      <div className="flex-shrink-0 w-full md:w-[45%]">
        <img
          src={event.imageUrl}
          alt={event.title}
          className="w-full h-auto object-cover rounded-2xl shadow-md"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.onerror = null;
            target.src = 'https://placehold.co/500x350/1a0e0e/ffffff?text=Image+Missing';
          }}
        />
      </div>
    </div>
  );
};

const Events: React.FC = () => {
  return (
    <div id='events' className="w-full font-sans px-6 py-16 bg-white">
      <div className="w-full max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 text-center mb-12" style={{ fontFamily: "'Georgia', serif" }}>
          Events
        </h2>

        {eventsData.map((event, index) => (
          <EventCard key={index} event={event} index={index} />
        ))}
      </div>
    </div>
  );
};

export default Events;
