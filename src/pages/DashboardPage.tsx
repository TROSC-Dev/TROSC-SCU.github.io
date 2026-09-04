import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
  UserCircle,
  GraduationCap,
  BookOpen,
  Video,
  CalendarCheck,
  Mail,
  Camera,
  Loader2,
} from "lucide-react";
import toast from "react-hot-toast";
import * as api from "../services/api";
import type { EnrollmentsResponse, BackendEvent } from "../services/api";
import { useAuth } from "../context/useAuth";

const PLACEHOLDER_IMAGE = "https://placehold.co/800x400?text=Trosc+Event";
const MAX_SOURCE_FILE_SIZE_MB = 5;
// The API accepts a base64 photo inside its JSON request body (100 KB max).
// Resize client-side so a normal phone photo can still be used as an avatar.
const MAX_AVATAR_BYTES = 70 * 1024;
const MAX_AVATAR_DIMENSION = 512;

// ── Avatar upload section ─────────────────────────────────────

const compressAvatar = (file: File): Promise<string> =>
  new Promise((resolve, reject) => {
    const image = new Image();
    const objectUrl = URL.createObjectURL(file);

    image.onload = () => {
      URL.revokeObjectURL(objectUrl);
      const scale = Math.min(
        1,
        MAX_AVATAR_DIMENSION / Math.max(image.width, image.height),
      );
      const canvas = document.createElement("canvas");
      canvas.width = Math.max(1, Math.round(image.width * scale));
      canvas.height = Math.max(1, Math.round(image.height * scale));
      canvas.getContext("2d")?.drawImage(image, 0, 0, canvas.width, canvas.height);

      let quality = 0.9;
      const encode = (): void => {
        const dataUrl = canvas.toDataURL("image/jpeg", quality);
        if (dataUrl.length <= MAX_AVATAR_BYTES || quality <= 0.4) {
          resolve(dataUrl);
          return;
        }
        quality -= 0.1;
        encode();
      };
      encode();
    };
    image.onerror = () => {
      URL.revokeObjectURL(objectUrl);
      reject(new Error("The selected image could not be read."));
    };
    image.src = objectUrl;
  });

const AvatarUpload = () => {
  const { user, setUser } = useAuth();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);

  if (!user) return null;

  const displaySrc = preview ?? user.photo ?? null;

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!new Set(["image/jpeg", "image/png", "image/webp"]).has(file.type)) {
      toast.error("Choose a JPG, PNG, or WebP image.");
      return;
    }

    if (file.size > MAX_SOURCE_FILE_SIZE_MB * 1024 * 1024) {
      toast.error(`Image must be smaller than ${MAX_SOURCE_FILE_SIZE_MB} MB.`);
      return;
    }

    setUploading(true);
    try {
      const dataUrl = await compressAvatar(file);
      setPreview(dataUrl);
      await uploadPhoto(dataUrl);
    } catch (err) {
      setPreview(null);
      toast.error(
        err instanceof Error ? err.message : "Failed to process the image.",
      );
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  const uploadPhoto = async (dataUrl: string) => {
    try {
      const res = await api.updateMe({ photo: dataUrl });
      setUser(res.data.user);
      setPreview(null); // let the AuthContext photo take over
      toast.success("Profile picture updated!");
    } catch (err) {
      setPreview(null); // revert preview on failure
      toast.error(
        err instanceof Error ? err.message : "Failed to update photo.",
      );
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="relative h-24 w-24 shrink-0">
      {/* Avatar */}
      {displaySrc &&
      displaySrc !== "https://placehold.co/800x400?text=Trosc+User" ? (
        <img
          src={displaySrc}
          alt={user.name}
          className="h-24 w-24 rounded-full object-cover ring-4 ring-primary-light shadow-md"
        />
      ) : (
        <UserCircle
          size={96}
          className="text-primary-light"
          strokeWidth={1}
        />
      )}

      {/* Upload spinner overlay */}
      {uploading && (
        <div className="absolute inset-0 rounded-full bg-black/50 flex items-center justify-center">
          <Loader2 size={24} className="text-white animate-spin" />
        </div>
      )}

      {/* The visible camera control works equally well on mouse and touch devices. */}
      {!uploading && (
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          aria-label="Change profile picture"
          title="Change profile picture"
          className="absolute bottom-0 right-0 flex h-9 w-9 items-center justify-center rounded-full border-2 border-white bg-primary text-white shadow-md transition-colors hover:bg-primary-hover focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
        >
          <Camera size={17} aria-hidden="true" />
        </button>
      )}

      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp"
        className="hidden"
        onChange={handleFileChange}
      />
    </div>
  );
};

// ── Dashboard Page ────────────────────────────────────────────

const DashboardPage = () => {
  const { user } = useAuth();

  const [enrollments, setEnrollments] = useState<
    EnrollmentsResponse["data"] | null
  >(null);
  const [enrollmentsLoading, setEnrollmentsLoading] = useState(true);

  const [rsvpEvents, setRsvpEvents] = useState<BackendEvent[]>([]);
  const [eventsLoading, setEventsLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    api
      .getMyEnrollments()
      .then((res) => {
        if (!cancelled) setEnrollments(res.data);
      })
      .catch(() => {
        // No enrollments yet or request failed — section shows the empty state
      })
      .finally(() => {
        if (!cancelled) setEnrollmentsLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (!user) return;
    let cancelled = false;
    api
      .getEvents("limit=100")
      .then((res) => {
        if (cancelled) return;
        setRsvpEvents(
          res.data.events.filter((event) => event.attendees.includes(user._id)),
        );
      })
      .catch(() => {
        // API unavailable — section shows the empty state
      })
      .finally(() => {
        if (!cancelled) setEventsLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [user]);

  if (!user) return null;

  return (
    <div className="min-h-screen bg-neutral-light pt-24 pb-20 font-family-poppins">
      <div className="mx-auto w-full max-w-5xl px-6">
        {/* Profile header */}
        <div className="mb-10 flex flex-col items-start gap-6 rounded-2xl bg-white p-6 shadow-sm sm:flex-row sm:items-center">
          {/* Clickable avatar with camera overlay */}
          <AvatarUpload />

          <div className="flex-1">
            <h1 className="text-2xl font-extrabold text-neutral-darker">
              {user.name}
            </h1>
            <p className="mt-1 flex items-center gap-1.5 text-sm text-neutral-dark">
              <Mail size={16} />
              {user.email}
            </p>
            <span className="mt-2 inline-block rounded-full bg-primary-light px-3 py-1 text-xs font-semibold capitalize text-primary-dark">
              {user.role}
            </span>
          </div>

          {/* Subtle hint */}
          <p className="text-xs text-neutral-dark sm:text-right">
            Hover over your photo to update it
          </p>
        </div>

        {/* Enrolled track */}
        <section className="mb-10">
          <h2 className="mb-4 text-2xl font-extrabold text-primary-darker">
            My Track
          </h2>

          {enrollmentsLoading ? (
            <div className="h-24 animate-pulse rounded-2xl bg-gray-200" />
          ) : enrollments?.track ? (
            <div className="flex flex-col gap-4 rounded-2xl border border-neutral-light-active bg-white p-6 shadow-sm sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h3 className="mb-1 text-xl font-bold text-neutral-darker">
                  {enrollments.track.title}
                </h3>
                <p className="flex flex-wrap gap-4 text-sm text-neutral-dark">
                  <span className="flex items-center gap-1.5">
                    <BookOpen size={16} /> {enrollments.courses.length} course
                    {enrollments.courses.length === 1 ? "" : "s"}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Video size={16} /> {enrollments.sessions.length} session
                    {enrollments.sessions.length === 1 ? "" : "s"}
                  </span>
                </p>
              </div>
              <Link
                to={`/track/${enrollments.track._id}`}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-6 py-2.5 text-base font-bold text-white transition-colors hover:bg-primary-hover"
              >
                <GraduationCap size={18} />
                Go to Track
              </Link>
            </div>
          ) : (
            <div className="rounded-2xl border border-dashed border-neutral-light-active bg-white p-6 text-center text-neutral-dark">
              You haven't joined a track yet.{" "}
              <Link
                to="/#tracks"
                className="font-semibold text-primary hover:text-primary-hover"
              >
                Browse tracks
              </Link>{" "}
              to get started.
            </div>
          )}
        </section>

        {/* RSVP'd events */}
        <section>
          <h2 className="mb-4 text-2xl font-extrabold text-primary-darker">
            My Events
          </h2>

          {eventsLoading ? (
            <div className="space-y-4">
              {[1, 2].map((n) => (
                <div key={n} className="h-24 animate-pulse rounded-2xl bg-gray-200" />
              ))}
            </div>
          ) : rsvpEvents.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-neutral-light-active bg-white p-6 text-center text-neutral-dark">
              You haven't RSVP'd to any events yet.{" "}
              <Link
                to="/#events"
                className="font-semibold text-primary hover:text-primary-hover"
              >
                Browse events
              </Link>{" "}
              to find something you like.
            </div>
          ) : (
            <div className="space-y-4">
              {rsvpEvents.map((event) => {
                const dateLabel = new Date(event.date).toLocaleDateString(
                  undefined,
                  { year: "numeric", month: "long", day: "numeric" },
                );
                return (
                  <div
                    key={event._id}
                    className="flex flex-col gap-4 rounded-2xl border border-neutral-light-active bg-white p-6 shadow-sm sm:flex-row sm:items-center"
                  >
                    <img
                      src={event.coverImage || PLACEHOLDER_IMAGE}
                      alt={event.title}
                      className="h-24 w-full shrink-0 rounded-xl object-cover sm:w-40"
                    />
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-neutral-darker">
                        {event.title}
                      </h3>
                      <p className="mt-1 flex items-center gap-1.5 text-sm font-semibold text-primary">
                        <CalendarCheck size={16} />
                        {dateLabel}
                        {event.locationType === "offline" && event.locationAddress
                          ? ` — ${event.locationAddress}`
                          : event.locationType === "online"
                            ? " — Online"
                            : ""}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default DashboardPage;
