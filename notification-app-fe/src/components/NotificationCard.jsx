import {
  Card,
  CardContent,
  Chip,
  Stack,
  Typography,
} from "@mui/material";

export function NotificationCard({ notification }) {
  return (
    <Card>
      <CardContent>
        <Stack spacing={1}>
          <Chip
            label={notification.Type}
            size="small"
            sx={{ width: "fit-content" }}
          />

          <Typography variant="body1">
            {notification.Message}
          </Typography>

          <Typography
            variant="caption"
            color="text.secondary"
          >
            {notification.Timestamp}
          </Typography>
        </Stack>
      </CardContent>
    </Card>
  );
}