import React, { useEffect, useState } from "react";
import * as api from "../services/api";
import type { BackendEvent } from "../services/api";

const PLACEHOLDER_IMAGE = "https://placehold.co/800x400?text=Trosc+Event";

const EventCard: React.FC<{ event: BackendEvent }> = ({ event }) => {
  const dateLabel = new Date(event.date).toLocaleDateString(undefined, {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <article className="grid grid-cols-1 items-center gap-8 lg:grid-cols-[1fr_1.05fr]">
      <div>
        <h3 className="mb-2 whitespace-pre-line text-3xl font-bold leading-snug text-neutral-darker">
          {event.title}
        </h3>
        <p className="mb-3 text-sm font-semibold text-primary">
          {dateLabel}
          {event.locationType === "offline" && event.locationAddress
            ? ` — ${event.locationAddress}`
            : event.locationType === "online"
              ? " — Online"
              : ""}
        </p>
        <p className="mb-7 whitespace-pre-line text-base leading-8 text-neutral-dark">
          {event.description}
        </p>
        {event.locationLink && (
          <a
            href={event.locationLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center rounded-xl bg-primary px-5 py-2.5 text-lg font-bold text-white transition-colors duration-300 hover:bg-primary-hover"
          >
            See More
          </a>
        )}
      </div>

      <div className="w-full">
        <img
          src={event.coverImage || PLACEHOLDER_IMAGE}
          alt={event.title}
          className="h-[220px] w-full rounded-2xl object-cover shadow-md md:h-[260px]"
        />
      </div>
    </article>
  );
};

const Events: React.FC = () => {
  const [events, setEvents] = useState<BackendEvent[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    api
      .getEvents("sort=-createdAt&limit=2")
      .then((res) => {
        if (!cancelled) setEvents(res.data.events);
      })
      .catch(() => {
        // Keep empty array — section shows "nothing yet" message
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <section id="events" className="w-full bg-white px-6 pb-10 pt-14 font-family-poppins">
      <div className="mx-auto w-full max-w-5xl">
        <h2 className="mb-12 text-center text-4xl font-extrabold text-primary-darker">Events</h2>

        {loading ? (
          <div className="space-y-14">
            {[1, 2].map((n) => (
              <div key={n} className="h-64 rounded-2xl bg-gray-100 animate-pulse" />
            ))}
          </div>
        ) : events.length === 0 ? (
          <p className="text-center text-neutral-dark text-lg">
            No events yet — check back soon!
          </p>
        ) : (
          <div className="space-y-14">
            {events.map((event) => (
              <EventCard key={event._id} event={event} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Events;
