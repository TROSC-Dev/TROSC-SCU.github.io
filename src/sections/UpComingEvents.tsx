import { useState, useEffect } from "react";
import * as api from "../services/api";
import type { BackendEvent } from "../services/api";
import { useAuth } from "../context/useAuth";

// ── Countdown (unchanged logic, just moved) ───────────────────

interface TimeLeft {
  months?: number;
  days?: number;
  hours?: number;
  minutes?: number;
  seconds?: number;
}

const useCountdown = (targetDate: string): string => {
  const calculate = (): TimeLeft => {
    const diff = +new Date(targetDate) - +new Date();
    if (diff <= 0) return {};
    const totalDays = Math.floor(diff / (1000 * 60 * 60 * 24));
    return {
      months: Math.floor(totalDays / 30),
      days: totalDays % 30,
      hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((diff / 1000 / 60) % 60),
      seconds: Math.floor((diff / 1000) % 60),
    };
  };

  const [timeLeft, setTimeLeft] = useState<TimeLeft>(calculate);

  useEffect(() => {
    const timer = setInterval(() => setTimeLeft(calculate()), 1000);
    return () => clearInterval(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [targetDate]);

  const parts: string[] = [];
  if (timeLeft.months && timeLeft.months > 0)
    parts.push(`${timeLeft.months} month${timeLeft.months > 1 ? "s" : ""}`);
  if (timeLeft.days && timeLeft.days > 0)
    parts.push(`${timeLeft.days} day${timeLeft.days > 1 ? "s" : ""}`);
  if (timeLeft.hours && timeLeft.hours > 0)
    parts.push(`${timeLeft.hours} hour${timeLeft.hours > 1 ? "s" : ""}`);
  if (timeLeft.minutes && timeLeft.minutes > 0)
    parts.push(`${timeLeft.minutes} minute${timeLeft.minutes > 1 ? "s" : ""}`);
  if (timeLeft.seconds !== undefined)
    parts.push(
      `${timeLeft.seconds} second${timeLeft.seconds === 1 ? "" : "s"}`,
    );

  if (parts.length === 0)
    return Object.keys(timeLeft).length === 0
      ? "Time's up!"
      : "less than a second to go.";

  let str = "only ";
  if (parts.length > 1) {
    str += `${parts.slice(0, -1).join(", ")}, and ${parts.slice(-1)}`;
  } else {
    str += parts[0];
  }
  return str + " to go.";
};

// ── Event Card ────────────────────────────────────────────────

const UpcomingEventCard = ({ event }: { event: BackendEvent }) => {
  const { user } = useAuth();
  const [rsvped, setRsvped] = useState(
    () => !!user && event.attendees.includes(user._id),
  );
  const [loading, setLoading] = useState(false);
  const countdown = useCountdown(event.date);

  useEffect(() => {
    setRsvped(!!user && event.attendees.includes(user._id));
  }, [user, event.attendees]);

  const handleRsvp = async () => {
    setLoading(true);
    try {
      if (rsvped) {
        await api.cancelRsvp(event._id);
        setRsvped(false);
      } else {
        await api.rsvpEvent(event._id);
        setRsvped(true);
      }
    } catch {
      // If the user isn't logged in, the 401 will be thrown here — silently ignore
      // (the button remains in its pre-click state)
    } finally {
      setLoading(false);
    }
  };

  return (
    <article className="flex flex-col items-start justify-between gap-4 rounded-2xl border border-neutral-light-active bg-white px-5 py-5 shadow-[0_4px_16px_rgba(0,0,0,0.12)] sm:flex-row sm:items-center sm:px-6">
      <div className="text-left">
        <h3 className="mb-1 text-lg font-bold text-neutral-darker md:text-xl">
          {event.title}
          {event.locationType === "offline" && event.locationAddress
            ? ` — ${event.locationAddress}`
            : ""}
        </h3>
        <span className="text-xs text-neutral-dark">{countdown}</span>
      </div>
      <button
        onClick={handleRsvp}
        disabled={loading}
        className={`whitespace-nowrap rounded-full px-7 py-2.5 text-base font-bold transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${
          rsvped
            ? "bg-gray-200 text-gray-700 hover:bg-gray-300"
            : "bg-primary text-white hover:bg-primary-hover"
        }`}
      >
        {loading ? "..." : rsvped ? "Cancel RSVP" : "Enroll Now"}
      </button>
    </article>
  );
};

// ── Upcoming Events section ───────────────────────────────────

const UpcomingEvents = () => {
  const [events, setEvents] = useState<BackendEvent[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    api
      .getFeed()
      .then((res) => {
        if (!cancelled) setEvents(res.data.upcomingEvents);
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
    <section
      id="upcoming-events"
      className="w-full bg-white px-6 pb-16 pt-10 font-family-poppins"
    >
      <div className="mx-auto w-full max-w-5xl text-center">
        <h2 className="mb-3 text-4xl font-extrabold text-primary-darker">
          Upcoming Events
        </h2>
        <p className="mb-10 text-2xl font-semibold text-primary-darker">
          "We're preparing something awesome for you!"
        </p>

        {loading ? (
          <div className="space-y-5">
            {[1, 2].map((n) => (
              <div
                key={n}
                className="h-24 rounded-2xl bg-gray-100 animate-pulse"
              />
            ))}
          </div>
        ) : events.length === 0 ? (
          <p className="text-neutral-dark text-lg">
            No upcoming events yet — check back soon!
          </p>
        ) : (
          <div className="space-y-5">
            {events.map((event) => (
              <UpcomingEventCard key={event._id} event={event} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default UpcomingEvents;
