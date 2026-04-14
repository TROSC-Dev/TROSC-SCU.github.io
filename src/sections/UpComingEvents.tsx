import React, { useState, useEffect } from 'react';

interface UpcomingEvent {
  title: string;
  location: string;
  date: string;
}

interface TimeLeft {
  months?: number;
  days?: number;
  hours?: number;
  minutes?: number;
  seconds?: number;
}

const upcomingEventsData: UpcomingEvent[] = [
  {
    title: 'Cairo International Book Fair',
    location: 'Cairo, Egypt',
    date: '2027-01-22T10:00:00Z',
  },
  {
    title: 'Sandbox Festival',
    location: 'El Gouna, Egypt',
    date: '2026-06-15T12:00:00Z',
  },
];

const Countdown: React.FC<{ targetDate: string }> = ({ targetDate }) => {
  const calculateTimeLeft = React.useCallback((): TimeLeft => {
    const difference = +new Date(targetDate) - +new Date();
    let timeLeft: TimeLeft = {};

    if (difference > 0) {
      const totalDays = Math.floor(difference / (1000 * 60 * 60 * 24));
      timeLeft = {
        months: Math.floor(totalDays / 30),
        days: totalDays % 30,
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }
    return timeLeft;
  }, [targetDate]);

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [calculateTimeLeft]);

  const timerComponents: string[] = [];

  if (timeLeft.months && timeLeft.months > 0) timerComponents.push(`${timeLeft.months} month${timeLeft.months > 1 ? 's' : ''}`);
  if (timeLeft.days && timeLeft.days > 0) timerComponents.push(`${timeLeft.days} day${timeLeft.days > 1 ? 's' : ''}`);
  if (timeLeft.hours && timeLeft.hours > 0) timerComponents.push(`${timeLeft.hours} hour${timeLeft.hours > 1 ? 's' : ''}`);
  if (timeLeft.minutes && timeLeft.minutes > 0) timerComponents.push(`${timeLeft.minutes} minute${timeLeft.minutes > 1 ? 's' : ''}`);
  
  if (timeLeft.seconds !== undefined) timerComponents.push(`${timeLeft.seconds} second${timeLeft.seconds === 1 ? '' : 's'}`);

  let countdownString = 'only ';
  if (timerComponents.length > 1) {
    countdownString += `${timerComponents.slice(0, -1).join(', ')}, and ${timerComponents.slice(-1)}`;
  } else if (timerComponents.length === 1) {
    countdownString += timerComponents[0];
  } else {
    countdownString += 'less than a second';
  }
  countdownString += ' to go.';

  return (
    <span className="text-xs text-neutral-dark">
      {Object.keys(timeLeft).length ? countdownString : "Time's up!"}
    </span>
  );
};

const UpcomingEventCard: React.FC<{ event: UpcomingEvent }> = ({ event }) => {
  return (
    <article className="flex flex-col items-start justify-between gap-4 rounded-2xl border border-neutral-light-active bg-white px-5 py-5 shadow-[0_4px_16px_rgba(0,0,0,0.12)] sm:flex-row sm:items-center sm:px-6">
      <div className="text-left">
        <h3 className="mb-1 text-lg font-bold text-neutral-darker md:text-xl">{event.title} - {event.location}</h3>
        <Countdown targetDate={event.date} />
      </div>
      <button className="whitespace-nowrap rounded-full bg-primary px-7 py-2.5 text-base font-bold text-white transition-colors hover:bg-primary-hover">
        Enroll Now
      </button>
    </article>
  );
};

const UpcomingEvents: React.FC = () => {
  return (
    <section className="w-full bg-white px-6 pb-16 pt-10 font-family-poppins">
      <div className="mx-auto w-full max-w-5xl text-center">
        <h2 className="mb-3 text-4xl font-extrabold text-primary-darker">
          Upcoming Events
        </h2>
        <p className="mb-10 text-2xl font-semibold text-primary-darker">
          "We're preparing something awesome for you!"
        </p>

        <div className="space-y-5">
          {upcomingEventsData.map((event, index) => (
            <UpcomingEventCard key={index} event={event} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default UpcomingEvents;
