"use client";
import { Article } from '@/app/redux/articleSlice';
import {
    RecoilRoot,
    atom,
    selector,
    useRecoilState,
    useRecoilValue,
  } from 'recoil';
  

  export const ArticleEdit = atom<{isEdit:boolean,EditArticle:Article|undefined}>({
    key: 'ArticleEdit', // unique ID (with respect to other atoms/selectors)
    default: {
        isEdit:false,
        EditArticle:undefined
    }, // default value (aka initial value)
  });




