import { useState, useEffect } from "react";
import { fetchNotifications } from "../api/notifications";

export function useNotifications(page, filter) {
  const [notifications, setNotifications] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        setError(null);

        const data = await fetchNotifications(page, filter);

        setNotifications(data.notifications || []);
        setTotal(data.total || data.notifications?.length || 0);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [page, filter]);

  return {
    notifications,
    total,
    totalPages: Math.max(1, Math.ceil(total / 10)),
    loading,
    error,
  };
}