import { useState } from "react";
import { Star, CheckCircle } from "lucide-react";
import * as api from "../../services/api";

interface TrackFeedbackProps {
  trackId: string;
}

const TrackFeedback = ({ trackId }: TrackFeedbackProps) => {
  const [text, setText] = useState("");
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async () => {
    if (!text.trim() || rating === 0) {
      setError(
        "Please write your feedback and select a rating before submitting.",
      );
      return;
    }
    setError(null);
    setIsSubmitting(true);
    try {
      await api.submitTrackFeedback({ trackId, text, rating });
      setSubmitted(true);
      setText("");
      setRating(0);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Failed to submit feedback. Please try again.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

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

      {submitted && (
        <div className="flex items-center gap-3 bg-green-50 border border-green-200 text-green-700 rounded-xl px-5 py-4 mb-6">
          <CheckCircle size={20} className="shrink-0" />
          <span className="text-sm font-medium">
            Thank you! Your feedback has been submitted.
          </span>
        </div>
      )}

      {error && (
        <p
          role="alert"
          className="mb-4 text-sm text-red-600 bg-red-50 border border-red-200 rounded-xl px-5 py-4"
        >
          {error}
        </p>
      )}

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
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="w-full bg-primary hover:bg-primary-hover text-white font-bold py-3 px-6 rounded-xl transition-colors shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? "Submitting..." : "Submit"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default TrackFeedback;
