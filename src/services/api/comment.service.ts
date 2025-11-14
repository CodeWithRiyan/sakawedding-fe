import { API_ENDPOINTS } from "./config"
import type { Comment, PaginatedApiResponse, ApiResponse } from "./types"

export interface CreateCommentDto {
  author: string
  message: string
}

export const commentService = {
  getByInvitation: async (
    invitationId: string,
    page = 1,
    limit = 10
  ): Promise<PaginatedApiResponse<Comment[]>> => {
    try {
      const response = await fetch(
        API_ENDPOINTS.comments.getByInvitation(invitationId, page, limit)
      )

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const result: PaginatedApiResponse<Comment[]> = await response.json()

      if (!result.success) {
        throw new Error("Failed to fetch comments")
      }

      return result
    } catch (error) {
      console.error("Error fetching comments:", error)
      throw error
    }
  },

  create: async (
    invitationId: string,
    data: CreateCommentDto
  ): Promise<Comment> => {
    try {
      const response = await fetch(
        API_ENDPOINTS.comments.create(invitationId),
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      )

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`)
      }

      const result: ApiResponse<Comment> = await response.json()

      if (!result.success) {
        throw new Error(result.message || "Failed to create comment")
      }

      return result.data
    } catch (error) {
      console.error("Error creating comment:", error)
      throw error
    }
  },
}
