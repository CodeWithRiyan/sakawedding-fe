export interface Couple {
  groom: {
    name: string
    photo: string
    title: string
    parent: string
  }
  bride: {
    name: string
    photo: string
    title: string
    parent: string
  }
}

export interface Event {
  for: string[]
  name: string
  dateFrom: string
  dateTo?: string
  location: string
  locationUrl: string
}

export interface LoveStory {
  title: string
  description: string
}

export interface Invitation {
  id: string
  couple: Couple
  events: Event[]
  loveStory: LoveStory[]
}

export interface Comment {
  id: string
  invitationId: string
  author: string
  message: string
  createdAt: string
}

export interface Pagination {
  currentPage: number
  totalPages: number
  totalComments: number
  limit: number
  hasNextPage: boolean
  hasPreviousPage: boolean
}

export interface ApiResponse<T> {
  success: boolean
  data: T
  message?: string
}

export interface PaginatedApiResponse<T> extends ApiResponse<T> {
  pagination: Pagination
}
