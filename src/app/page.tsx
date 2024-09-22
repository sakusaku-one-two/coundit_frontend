"use client";

import React from 'react';
import { useEffect } from 'react';
import { useSelector,useDispatch} from 'react-redux';
import { RootState,AppDispatch } from './redux/store';
import { fetchArticles } from './redux/articleSlice';
import { stat } from 'fs';
import { STATIC_STATUS_PAGES } from 'next/dist/shared/lib/constants';






export default function Home() {
  const dispatch:AppDispatch = useDispatch();
  const articles = useSelector((state:RootState) => state.articles.articles);
  const status =  useSelector((state:RootState) => state.articles.status);

  useEffect(() => {
    if (status === 'idle'){ //まだ一回もリクエストが送らられてreduxにデータがない場合にリクエストが送信されて更新される。
      dispatch(fetchArticles());
    }

  },[status,dispatch]);



  return (
   <div>
      {
        articles.map((article) => {
          return (
            <li key={article.id}>
              {article.title}
            </li>
          )
        })
      }

   </div>
  );
}
