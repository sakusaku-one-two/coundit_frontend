"use client";
import React,{ FC, SyntheticEvent, useState } from 'react'
import { useRecoilState } from 'recoil';
import { ArticleEdit } from './recoilState';
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Textarea } from "@/components/ui/textarea";
import { updateArticle } from '@/app/redux/articleSlice';
import { useSelector,useDispatch} from 'react-redux';
import { RootState,AppDispatch } from './redux/store';



const EditForm:FC = () => {
  const dispathc:AppDispatch = useDispatch();
 
  const status =  useSelector((state:RootState) => state.articles.status);




    const [ArticleEditState,setArticleEditState] = useRecoilState(ArticleEdit);
    const {isEdit,EditArticle} = ArticleEditState;
    const [title,setTitle] = useState<string>(EditArticle? EditArticle.title : "nothing"  );
    const [description,setDescription] = useState<string>(EditArticle? EditArticle.description : "nothing");
    const [body,setBody] = useState<string>(EditArticle ? EditArticle.body : "nothing");

    const onSend = (e:SyntheticEvent) => {
      e.preventDefault();
      const update_article = {...EditArticle,title:title,description:description,body:body};
      dispathc(updateArticle(update_article));
      setArticleEditState({isEdit:false,EditArticle:update_article});
      
    };


  return (
    <div>
        <SheetHeader> 
          <SheetTitle>記事の編集</SheetTitle>
          <SheetDescription>
              編集してください。 Reduxの状態: ({status})
          </SheetDescription>
        </SheetHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              タイトル
            </Label>
            <Input id="title" value={title} onChange={(e) => setTitle(e.target.value)} className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-right">
              説明
            </Label>
            <Input id="description" value={description} onChange={(e) => setDescription(e.target.value)} className="col-span-3" />
          </div>
          <div>
              <Label htmlFor="body" className="text-right">
                内容
              </Label>
              <Textarea value={body} onChange={(e) => setBody(e.target.value)} className="col-span-3" />
          </div>
          <div>
              <Label htmlFor="body" className="text-right">
                {
                  EditArticle?.tags.map((tag) => {
                    return (
                      <div key={tag.id}>
                        {tag.name}
                      </div>
                    )
                  })
                }
              </Label>

          </div>
        </div>
        <SheetFooter>
          <SheetClose asChild onClick={onSend}>
            <Button type="submit">Save changes</Button>
          </SheetClose>
        </SheetFooter>

    </div>
  )
}

export default EditForm;