"use client";

import React from "react";
import { Article } from "../redux/articleSlice";
import ArticleRecord from "./articleRecord";


const ArticlesPage:React.FC<Article[]> = ({articles}) =>{

    return (
        <div className="flex items-center justify-center">
            {
                articles.map((article:Article) => {
                    return (
                        <ArticleRecord key={article.id} article={article}/> // 修正: 'articel' を 'article' に変更
                    );
                })
            }
        </div>
    )
};

export default ArticlesPage;