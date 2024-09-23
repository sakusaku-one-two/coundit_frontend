"use client";

import React, { createContext} from "react";
import { Article } from "../articleSlice";
import { boolean } from "zod";

export interface CurrentArticle {
    article : Article|null;
    isOpen : boolean;
}

const initalState:CurrentArticle = {
    article: null,
    isOpen:false,
};


export const CurrentArticleContext = createContext<CurrentArticle>(initalState);

export const CurrentArticleProvider = ({ children }: {
    children:React.ReactNode
}) =>{
    return (
        <CurrentArticleContext.Provider value={initalState}>
            {children}
        </CurrentArticleContext.Provider>
    );
};
