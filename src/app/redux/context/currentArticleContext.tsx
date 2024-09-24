"use client";

import React, { createContext,useState} from "react";
import { Article } from "../articleSlice";
import { boolean, set } from "zod";

export interface CurrentArticle {
    articleSheet : Article|null;
    isOpenSheet : boolean;
    setArticleSheet:(updateArticle:Article) =>void;
    setIsOpenSheet:(updateOpen:boolean) =>void;
}

const initalState:CurrentArticle = {
    articleSheet: null,
    isOpenSheet:false,
    setArticleSheet:(updateArticle:Article)=>void 0,
    setIsOpenSheet:(updateOpen:boolean)=>void 0,    
};


export const CurrentArticleContext = createContext<CurrentArticle>(initalState);

export const CurrentArticleProvider = ({ children }: {
    children:React.ReactNode
}) =>{

    const [artilceSheet,setArticleSheet] = useState<Article|null>(null);
    const [isOpenSheet,setIsOpenSheet] = useState<boolean>(false);


 
    return (
        <CurrentArticleContext.Provider value={{
            articleSheet:null,
            isOpenSheet:false,
            setArticleSheet:setArticleSheet,
            setIsOpenSheet:setIsOpenSheet,
        }}>
            {children}
        </CurrentArticleContext.Provider>
    );
};
