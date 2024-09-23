"use client";

import React from "react";
import { Article } from "../redux/articleSlice";
import ArticleRecord from "./articleRecord";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
  } from "@/components/ui/carousel"
  


const ArticlesPage:React.FC<Article[]> = ({articles}) =>{

    return (
        <div className="flex items-center justify-center">
        <Carousel>
             <CarouselContent className="h-1/2">
             {
                articles.map((article:Article) => {
                    return (
                        <CarouselItem> <ArticleRecord key={article.id} article={article}/> </CarouselItem> 
                     );
                })
            }
               
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
        </Carousel>

        
            
        </div>
    )
};

export default ArticlesPage;