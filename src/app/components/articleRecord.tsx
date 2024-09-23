"use client";

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
  

import type { FC } from "react"; 
import React from "react";
import { useState } from "react";
import { Article } from "../redux/articleSlice";

import ArticleDialog from './articleDialog';

const ArticleRecord:FC<{article:Article}> = ({ article }) =>{
    const [isOpen,setIsOpen] = useState<boolean>(false);//ダイアログの開閉フラグ

    const OnClickDialog = (e:React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
        setIsOpen(true);
    };
    
    return (
        <div className="max-w-sm rounded overflow-hidden shadow-lg bg-white" onClick={OnClickDialog}>
        <Card>
            <CardHeader>
            <CardTitle>{article.title}</CardTitle>
            <CardDescription>{article.description}</CardDescription>
            </CardHeader>
            <CardContent>
            <p>{article.user.username}</p>
            </CardContent>
            <CardFooter>
                <ArticleDialog article={article} isOpen={isOpen} setIsOpen={setIsOpen} />
            </CardFooter>
        </Card>
    </ div>    
    );
    
};

export default ArticleRecord;