import { useState } from "react";
import type { FC } from "react";
import { Star } from "lucide-react";
import ComingSoonNotice from "../ComingSoonNotice";

interface TrackFeedbackProps {
  trackId: string;
}

// trackId is accepted for API shape consistency with the parent page, but
// isn't used yet since feedback submission is disabled until the backend
// wires up POST /v1/tracks/:id/reviews.
const TrackFeedback: FC<TrackFeedbackProps> = () => {
  const [text, setText] = useState("");
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);

  return (
    <div className="bg-gray-100 rounded-2xl p-6 md:p-8 shadow-sm border border-gray-200">
      <h2 className="text-2xl font-bold text-gray-900 mb-2">
        Your Feedback Matters
      </h2>
      <p className="text-gray-700 mb-6 max-w-2xl">
        Help us make the Cyber Security Track even better.
        <br />
        Tell us what you liked, what was hard, and what you want to learn next.
      </p>

      <ComingSoonNotice
        message="Feedback submission isn't available yet — we're wiring it up on the backend. Feel free to draft your thoughts below in the meantime."
        className="mb-6"
      />

      <div className="flex flex-col md:flex-row gap-6 md:gap-12 items-start md:items-stretch">
        <div className="flex-1 w-full">
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="w-full h-32 md:h-full p-4 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none bg-white"
            placeholder="Tell us your feedback..."
          />
        </div>

        <div className="flex flex-col items-center justify-center min-w-[200px] w-full md:w-auto">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            Rate the sessions
          </h3>
          <div className="flex gap-1 mb-8">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                className="focus:outline-none transition-colors"
                onClick={() => setRating(star)}
                onMouseEnter={() => setHover(star)}
                onMouseLeave={() => setHover(0)}
                aria-label={`Rate ${star} out of 5 stars`}
              >
                <Star
                  className={`w-8 h-8 md:w-10 md:h-10 transition-colors duration-200 ${
                    star <= (hover || rating)
                      ? "fill-gray-400 text-gray-400"
                      : "fill-gray-200 text-gray-200"
                  }`}
                />
              </button>
            ))}
          </div>

          <button
            type="button"
            disabled
            title="Coming soon"
            className="w-full bg-primary text-white font-bold py-3 px-6 rounded-xl shadow-md opacity-50 cursor-not-allowed"
          >
            Submit (Coming soon)
          </button>
        </div>
      </div>
    </div>
  );
};

export default TrackFeedback;
