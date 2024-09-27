"use client";
import { useState,useContext, SyntheticEvent,useEffect } from "react";
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
import { Tag } from "@/app/redux/tagsSlice";
import { MyTags } from "./myTags";
import { useSelector } from "react-redux";
import { RootState } from "@/app/redux/store";


export function CreateSheet() {
    const tags:Tag[] = useSelector((state:RootState) => state.tags.tags);
    const [title,setTitle] = useState<string>("");
    const [description,setDescription] = useState<string>("");
    const [body,setBody] = useState<string>("");


   
    // const onSave = (e:SyntheticEvent) => {
    //   e.preventDefault(); //サーバーに再度ページの取得をさせないため
      
    //  setArticleEditState({isEdit:false,EditArticle:undefined});
    // };

    
  

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline">新規作成</Button>
      </SheetTrigger>
      <SheetContent className="bg-white">
      <SheetHeader> 
          <SheetTitle>記事の編集</SheetTitle>
          <SheetDescription>
              編集してください。
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
                    タグ
              </Label>
              <MyTags tags={tags}/>
            </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}
