import { useState } from "react";
import {
  Alert,
  Badge,
  Box,
  CircularProgress,
  Divider,
  Pagination,
  Stack,
  Typography,
  Card,
  CardContent,
} from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";

import { NotificationFilter } from "../components/NotificationFilter";
import { useNotifications } from "../hooks/useNotifications";

export function NotificationsPage() {
  const [filter, setFilter] = useState("All");
  const [page, setPage] = useState(1);

  const { notifications, loading, error } = useNotifications();

  const itemsPerPage = 10;
  const unreadCount = notifications.length;

  const handleFilterChange = (newFilter) => {
    if (newFilter) {
      setFilter(newFilter);
      setPage(1);
    }
  };

  const handlePageChange = (_, newPage) => {
    setPage(newPage);
  };

  const filteredNotifications =
    filter === "All"
      ? notifications
      : notifications.filter((n) => n.Type === filter);

  const totalPages = Math.max(
    1,
    Math.ceil(filteredNotifications.length / itemsPerPage)
  );

  const paginatedNotifications = filteredNotifications.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  return (
    <Box sx={{ maxWidth: 720, mx: "auto", px: 2, py: 4 }}>
      {/* Header */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 1.5,
          mb: 3,
        }}
      >
        <Badge badgeContent={unreadCount} color="primary" max={99}>
          <NotificationsIcon sx={{ fontSize: 28 }} />
        </Badge>

        <Typography variant="h5" fontWeight={700}>
          Notifications
        </Typography>
      </Box>

      <Divider sx={{ mb: 3 }} />

      {/* Filters */}
      <Box sx={{ mb: 3 }}>
        <NotificationFilter
          value={filter}
          onChange={handleFilterChange}
        />
      </Box>

      {/* Loading */}
      {loading && (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            py: 6,
          }}
        >
          <CircularProgress />
        </Box>
      )}

      {/* Error */}
      {!loading && error && (
        <Alert severity="error">
          Failed to load notifications: {error}
        </Alert>
      )}

      {/* Empty State */}
      {!loading && !error && paginatedNotifications.length === 0 && (
        <Alert severity="info">
          No notifications found
        </Alert>
      )}

      {/* Notifications */}
      {!loading && !error && paginatedNotifications.length > 0 && (
        <Stack spacing={2}>
          {paginatedNotifications.map((n, index) => (
            <Card key={n.ID || index}>
              <CardContent>
                <Typography variant="subtitle2" color="primary">
                  {n.Type}
                </Typography>

                <Typography variant="body1" sx={{ mt: 1 }}>
                  {n.Message}
                </Typography>

                <Typography
                  variant="caption"
                  color="text.secondary"
                >
                  {n.Timestamp}
                </Typography>
              </CardContent>
            </Card>
          ))}
        </Stack>
      )}

      {/* Pagination */}
      {!loading && totalPages > 1 && (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            mt: 4,
          }}
        >
          <Pagination
            count={totalPages}
            page={page}
            onChange={handlePageChange}
            color="primary"
            shape="rounded"
          />
        </Box>
      )}
    </Box>
  );
}