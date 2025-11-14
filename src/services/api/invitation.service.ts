import { API_ENDPOINTS } from "./config"
import type { ApiResponse, Invitation } from "./types"

export const invitationService = {
  getByName: async (name: string): Promise<Invitation> => {
    try {
      const response = await fetch(API_ENDPOINTS.invitations.getByName(name))

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const result: ApiResponse<Invitation> = await response.json()

      if (!result.success) {
        throw new Error(result.message || "Failed to fetch invitation")
      }

      return result.data
    } catch (error) {
      console.error("Error fetching invitation:", error)
      throw error
    }
  },

  getAll: async (): Promise<Record<string, Invitation>> => {
    try {
      const response = await fetch(API_ENDPOINTS.invitations.getAll())

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const result: ApiResponse<Record<string, Invitation>> =
        await response.json()

      if (!result.success) {
        throw new Error(result.message || "Failed to fetch invitations")
      }

      return result.data
    } catch (error) {
      console.error("Error fetching invitations:", error)
      throw error
    }
  },
}
