import { useCallback, useEffect, useMemo, useState, type ReactNode } from "react";
import * as api from "../services/api";
import { ApiError } from "../services/api";
import { AuthContext } from "./authContextInstance";

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<api.AuthUser | null>(null);
  const [loading, setLoading] = useState(true);

  const refreshUser = useCallback(async () => {
    try {
      const res = await api.getMe();
      setUser(res.data.user);
    } catch (err) {
      // Not logged in (401) or network error — treat as signed out.
      if (!(err instanceof ApiError) || err.status !== 401) {
        // Non-auth errors are logged for visibility, but we still fall
        // back to a signed-out state so the UI doesn't hang.
        console.error("Failed to load current user:", err);
      }
      setUser(null);
    }
  }, []);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      await refreshUser();
      if (!cancelled) setLoading(false);
    })();
    return () => {
      cancelled = true;
    };
  }, [refreshUser]);

  const logout = useCallback(async () => {
    try {
      await api.signOut();
    } finally {
      setUser(null);
    }
  }, []);

  const value = useMemo(
    () => ({ user, loading, setUser, refreshUser, logout }),
    [user, loading, refreshUser, logout],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
