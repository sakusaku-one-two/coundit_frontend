"use client";

import React from 'react';
import { useEffect } from 'react';
import { useSelector,useDispatch} from 'react-redux';
import { RootState,AppDispatch } from './redux/store';
import { fetchArticles } from './redux/articleSlice';
import ArticlesPage from './components/articlesPage';
import { fetchTags } from './redux/tagsSlice';






export default function Home() {
  const dispatch:AppDispatch = useDispatch();
  const articles = useSelector((state:RootState) => state.articles.articles);
  const status =  useSelector((state:RootState) => state.articles.status);

  useEffect(() => {
    if (status === 'idle'){ //まだ一回もリクエストが送らられてreduxにデータがない場合にリクエストが送信されて更新される。
      dispatch(fetchArticles());
      dispatch(fetchTags());
    }

  },[status,dispatch]);



  return (
   <div>
      <ArticlesPage articles={articles} />
   </div>
  );
}
