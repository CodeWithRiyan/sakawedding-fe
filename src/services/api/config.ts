// In production, use relative URL (same domain)
// In development, use localhost:3001
export const API_BASE_URL =
  import.meta.env.VITE_API_URL ||
  (import.meta.env.MODE === "production" ? "" : "http://localhost:3001")

export const API_ENDPOINTS = {
  invitations: {
    getAll: () => `${API_BASE_URL}/api/invitations`,
    getByName: (name: string) => `${API_BASE_URL}/api/invitations/${name}`,
  },
  comments: {
    getByInvitation: (invitationId: string, page = 1, limit = 10) =>
      `${API_BASE_URL}/api/comments/${invitationId}?page=${page}&limit=${limit}`,
    create: (invitationId: string) =>
      `${API_BASE_URL}/api/comments/${invitationId}`,
  },
}
