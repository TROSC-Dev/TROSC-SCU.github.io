import React from 'react';
import EventOneImage from '../../Assests/teamwork2.jpg';
import EventTwoImage from '../../Assests/event 1.jpg';

interface Event {
  title: string;
  description: string;
  imageUrl: string;
  alt: string;
}

const eventsData: Event[] = [
  {
    title: 'Trosc - lama cat event 2024',
    description:
      'an exciting gathering for tech enthusiasts and creative minds!\nJoin inspiring workshops, hands-on sessions, and interactive talks across multiple tracks.\nConnect with experts, level up your skills, and explore innovative projects.',
    imageUrl: EventOneImage,
    alt: 'Trosc members at Lama Cat event',
  },
  {
    title: 'Somabay Endurance Festival -\nSomabay, Egypt',
    description:
      'With endurance challenges like running and cycling, this festival represents persistence and pushing boundaries. Trosc members would have related this energy to mastering difficult tracks and staying committed to learning.',
    imageUrl: EventTwoImage,
    alt: 'Trosc members at Somabay Endurance Festival',
  },
];

const EventCard: React.FC<{ event: Event }> = ({ event }) => {
  return (
    <article className="grid grid-cols-1 items-center gap-8 lg:grid-cols-[1fr_1.05fr]">
      <div>
        <h3 className="mb-4 whitespace-pre-line text-3xl font-bold leading-snug text-neutral-darker">{event.title}</h3>
        <p className="mb-7 whitespace-pre-line text-base leading-8 text-neutral-dark">{event.description}</p>
        <a
          href="#"
          className="inline-flex items-center justify-center rounded-xl bg-primary px-5 py-2.5 text-lg font-bold text-white transition-colors duration-300 hover:bg-primary-hover"
        >
          See More
        </a>
      </div>

      <div className="w-full">
        <img
          src={event.imageUrl}
          alt={event.alt}
          className="h-[220px] w-full rounded-2xl object-cover shadow-md md:h-[260px]"
        />
      </div>
    </article>
  );
};

const Events: React.FC = () => {
  return (
    <section id="events" className="w-full bg-white px-6 pb-10 pt-14 font-family-poppins">
      <div className="mx-auto w-full max-w-5xl">
        <h2 className="mb-12 text-center text-4xl font-extrabold text-primary-darker">Events</h2>

        <div className="space-y-14">
          {eventsData.map((event, index) => (
            <EventCard key={index} event={event} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Events;
