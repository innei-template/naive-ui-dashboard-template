export interface Pager {
  total: number
  size: number
  currentPage: number
  totalPage: number
  hasPrevPage: boolean
  hasNextPage: boolean
}
export interface PaginateResult<T> {
  data: T[]
  pagination: Pager
}
