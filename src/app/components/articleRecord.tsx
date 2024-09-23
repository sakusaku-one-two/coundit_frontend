"use client";

import type { FC } from "react"; 
import React from "react";
import { useState } from "react";
import { Article } from "../redux/articleSlice";

import ArticleDialog from './articleDialog';

const ArticleRecord:FC<Article> = ({ article }) =>{
    const [isOpen,setIsOpen] = useState<boolean>(false);//ダイアログの開閉フラグ

    const OnClickDialog = (e:React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
        setIsOpen(true);
    };
    
    return (
        <div className="max-w-sm rounded overflow-hidden shadow-lg bg-white" onClick={OnClickDialog}>
            <div className="px-6 py-4">
                <div className="font-bold text-xl mb-2">{article.title}</div>
                <p>{article.user.username}</p>
            </div>
            <ArticleDialog article={article} isOpen={isOpen} setIsOpen={setIsOpen} />
        </ div>
    );
    
};

export default ArticleRecord;