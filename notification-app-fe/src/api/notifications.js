const TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiYXVkIjoiaHR0cDovLzIwLjI0NC41Ni4xNDQvZXZhbHVhdGlvbi1zZXJ2aWNlIiwiZW1haWwiOiIyMzAzMDUxMDUwMjA5QHBhcnVsdW5pdmVyc2l0eS5hYy5pbiIsImV4cCI6MTc4MjgxMzYzOCwiaWF0IjoxNzgyODEyNzM4LCJpc3MiOiJBZmZvcmQgTWVkaWNhbCBUZWNobm9sb2dpZXMgUHJpdmF0ZSBMaW1pdGVkIiwianRpIjoiMGIyZDUzNWQtYWQwMC00MDc3LTkzN2QtOTY5ZjE5ZmU4ODEzIiwibG9jYWxlIjoiZW4tSU4iLCJuYW1lIjoiZGFyc2hhbiBwYXR3YXJpIiwic3ViIjoiZDE1YzMyNjgtNzU0Yy00ODM5LWI1M2UtZWM1ODNiOWYzOWYzIn0sImVtYWlsIjoiMjMwMzA1MTA1MDIwOUBwYXJ1bHVuaXZlcnNpdHkuYWMuaW4iLCJuYW1lIjoiZGFyc2hhbiBwYXR3YXJpIiwicm9sbE5vIjoiMjMwMzA1MTA1MDIwOSIsImFjY2Vzc0NvZGUiOiJjSnFhRUIiLCJjbGllbnRJRCI6ImQxNWMzMjY4LTc1NGMtNDgzOS1iNTNlLWVjNTgzYjlmMzlmMyIsImNsaWVudFNlY3JldCI6InZZeFViTVVxalFVQ1pRZGoifQ.sT_NHhuOAySv9b2vk3Hz2fxNKD5WLf-aOHSN0Fu8fsU";

export async function fetchNotifications(
  page = 1,
  limit = 10,
  notificationType = ""
) {
  let url =
    `http://4.224.186.213/evaluation-service/notifications?page=${page}&limit=${limit}`;

  if (notificationType && notificationType !== "All") {
    url += `&notification_type=${notificationType}`;
  }

  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${TOKEN}`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch notifications");
  }

  return response.json();
}