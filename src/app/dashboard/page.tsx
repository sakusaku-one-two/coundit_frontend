"use client";

import React from 'react';
import { useEffect } from 'react';
import { useSelector,useDispatch} from 'react-redux';
import {RootState, AppDispatch} from '../redux/store';
import { fetchArticles } from '../redux/articleSlice';
import ArticlesPage from '../components/articlesPage';



const DashbordPage:React.FC = () => {
  const dispatch:AppDispatch = useDispatch();
  const articles = useSelector((state:RootState) => state.articles.articles);//記事のリストを取得
  const status = useSelector((state:RootState) => state.articles.status);//記事を取得のステータスを取得

  useEffect(() =>{
    if(status === 'idle') {
      dispatch(fetchArticles());
    }
  },[status,dispatch]);

  
  return (
    <div>
      <h1>記事一覧</h1>
      <ArticlesPage articles={articles} />
    </div>
  );
};

export default DashbordPage;

