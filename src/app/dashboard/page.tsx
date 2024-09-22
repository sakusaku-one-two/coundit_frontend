"use client";

import React from 'react';
import { useEffect } from 'react';
import { useSelector,useDispatch} from 'react-redux';
import {RootState, AppDispatch} from '../redux/store';
import { fetchArticles } from '../redux/articleSlice';




const DashbordPage:React.FC = () => {
  const dispatch:AppDispatch = useDispatch();
  const articles = useSelector((state:RootState) => state.articles.articles);
  const status = useSelector((state:RootState) => state.articles.status);

  useEffect(() =>{
    if(status === 'idle') {
      dispatch(fetchArticles());
    }
  },[status,dispatch]);

  
  return (
    <div>
      <h1>記事一覧</h1>
      {status === 'loading' && <p>loading....</p>}
      {status === 'succeeded' && (
        <ul>
          {articles.map(article => (
            <li key={article.id}>{article.title}</li>
          ))}
        </ul>
      )}
      {status === 'failed' && <p>Error loading articles</p>}
    </div>
  );
};

export default DashbordPage;
