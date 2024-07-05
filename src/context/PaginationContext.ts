import { createContext } from "react";


interface PageableProp {
    pageNumber:number
}

interface SimplePageContextProp {
    pageable: PageableProp,
    totalPages: number,
}


export const MessageHistContext = createContext<SimplePageContextProp>({
    pageable: {
        pageNumber: 0
    },
    totalPages: 0
});

export const MessageRetryContext = createContext<SimplePageContextProp>({
    pageable: {
        pageNumber: 0
    },
    totalPages: 0
});

export const BatchJobExecutionHistContext = createContext<SimplePageContextProp>({
    pageable: {
        pageNumber: 0
    },
    totalPages: 0
});