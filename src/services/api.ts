// ============================================================
// API service layer
// Dev: Vite proxy forwards /v1/* → http://localhost:5000/v1/*
// Prod: set VITE_API_URL=https://your-api.com
//
// IMPORTANT FOR LOCAL DEV:
// Add FRONTEND_URL=http://localhost:5173 to trosc-backend/.env
// so the backend's CORS whitelist allows the Vite dev server.
// ============================================================

const API_BASE = import.meta.env.VITE_API_URL
  ? `${String(import.meta.env.VITE_API_URL)}/v1`
  : "/v1";

async function request<T = void>(
  method: "GET" | "POST" | "PATCH" | "PUT" | "DELETE",
  path: string,
  body?: unknown,
): Promise<T> {
  const res = await fetch(`${API_BASE}${path}`, {
    method,
    credentials: "include",
    headers: body ? { "Content-Type": "application/json" } : undefined,
    body: body ? JSON.stringify(body) : undefined,
  });

  if (!res.ok) {
    const json = await res.json().catch(() => ({}));
    throw new Error(
      (json as { message?: string }).message ??
        `Request failed (${res.status})`,
    );
  }

  if (res.status === 204) return undefined as T;
  return res.json() as Promise<T>;
}

// ── Domain types ─────────────────────────────────────────────

export interface AuthUser {
  _id: string;
  name: string;
  email: string;
  role: "student" | "instructor" | "admin";
  enrolledTrack?: string | null;
  photo?: string;
}

export interface AuthResponse {
  status: string;
  token: string;
  data: { user: AuthUser };
}

export interface BackendTrack {
  _id: string;
  title: string;
  description: string;
  instructor: {
    _id: string;
    name: string;
    email: string;
    role: string;
    photo?: string;
  };
  courses: string[];
  sessions: string[];
  students: string[];
  level: string;
  coverImage: string;
  published: boolean;
  studentCount: number;
  courseCount: number;
  sessionCount: number;
}

export interface BackendEvent {
  _id: string;
  title: string;
  description: string;
  date: string;
  locationType: "online" | "offline";
  locationLink?: string;
  locationAddress?: string;
  coverImage?: string;
  attendees: string[];
  createdBy: { _id: string; name: string; role: string; photo?: string };
}

// ── Auth ─────────────────────────────────────────────────────

export interface SignInPayload {
  email: string;
  password: string;
}

export interface SignUpPayload {
  name: string;
  email: string;
  password: string;
  passwordConfirm: string;
}

export interface ForgotPasswordPayload {
  email: string;
}

export interface ResetPasswordPayload {
  token: string;
  password: string;
  passwordConfirm: string;
}

export function signIn(payload: SignInPayload): Promise<AuthResponse> {
  return request<AuthResponse>("POST", "/users/login", payload);
}

export function signUp(payload: SignUpPayload): Promise<AuthResponse> {
  return request<AuthResponse>("POST", "/users/signup", payload);
}

export function signOut(): Promise<void> {
  return request("POST", "/users/logout");
}

export function forgotPassword(payload: ForgotPasswordPayload): Promise<void> {
  return request("POST", "/users/forgotPassword", payload);
}

export function resetPassword(
  payload: ResetPasswordPayload,
): Promise<AuthResponse> {
  const { token, ...body } = payload;
  return request<AuthResponse>("PATCH", `/users/resetPassword/${token}`, body);
}

export function getMe(): Promise<{ status: string; data: { user: AuthUser } }> {
  return request("GET", "/users/me");
}

// ── Tracks (public) ──────────────────────────────────────────

export interface TracksResponse {
  status: string;
  results: number;
  total: number;
  data: { tracks: BackendTrack[] };
}

export interface TrackResponse {
  status: string;
  data: { track: BackendTrack };
}

export function getTracks(query?: string): Promise<TracksResponse> {
  return request<TracksResponse>("GET", `/tracks${query ? `?${query}` : ""}`);
}

export function getTrack(id: string): Promise<TrackResponse> {
  return request<TrackResponse>("GET", `/tracks/${id}`);
}

// ── Track enrollment (protected) ─────────────────────────────

export function enrollInTrack(
  trackId: string,
): Promise<{ status: string; message: string; data: { track: BackendTrack } }> {
  return request("POST", `/tracks/${trackId}/enroll-me`);
}

// ── Events (public) ──────────────────────────────────────────

export interface EventsResponse {
  status: string;
  results: number;
  data: { events: BackendEvent[] };
}

export interface FeedResponse {
  status: string;
  data: {
    announcements: unknown[];
    upcomingEvents: BackendEvent[];
  };
}

export function getEvents(query?: string): Promise<EventsResponse> {
  return request<EventsResponse>("GET", `/events${query ? `?${query}` : ""}`);
}

export function getFeed(): Promise<FeedResponse> {
  return request<FeedResponse>("GET", "/feed");
}

// ── Event RSVP (protected) ───────────────────────────────────

export function rsvpEvent(
  eventId: string,
): Promise<{ status: string; message: string }> {
  return request("POST", `/events/${eventId}/rsvp`);
}

export function cancelRsvp(
  eventId: string,
): Promise<{ status: string; message: string }> {
  return request("DELETE", `/events/${eventId}/rsvp`);
}

// ── Contact (no backend endpoint yet) ────────────────────────

export interface ContactPayload {
  username: string;
  track: string;
  email: string;
  phone: string;
  message: string;
}

export async function sendContactMessage(
  _payload: ContactPayload,
): Promise<void> {
  // TODO: implement when backend adds POST /v1/contact
  await Promise.resolve();
}

// ── Feedback (planned — reviews model not yet implemented) ───

export interface FeedbackPayload {
  trackId: string;
  text: string;
  rating: number;
}

export async function submitTrackFeedback(
  _payload: FeedbackPayload,
): Promise<void> {
  // TODO: implement when backend adds POST /v1/tracks/:id/reviews
  await Promise.resolve();
}
