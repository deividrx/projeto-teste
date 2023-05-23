export interface Page<T> {
  content: Array<T>;
  totalElements: number;
  totalPages: number;
  number: number;
}

export interface Pageable {
  size?: number,
  page?: number,
  sort?: string
}
