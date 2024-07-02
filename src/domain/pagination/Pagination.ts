
export const ONE_PAGES_CONTENT_SIZE: number = 5; // 한 페이지에 보여줄 이력의 갯수
export const ONE_PAGES_CONTENT_SIZE_20: number = 20; // 한 페이지에 보여줄 이력의 갯수
export const BUTTON_SIZE: number = 5; // 페이지에서 보여줄 버튼의 갯수

export interface Pagination {
    pageNumber: number, // 페이지 인덱스 = 페이지 버튼 - 1
    totalPages: number, // 총 페이지 수
    content: object[] // 페이지에 표현할 데이터
}