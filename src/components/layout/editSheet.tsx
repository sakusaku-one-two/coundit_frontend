"use client";
import { useState,useContext, SyntheticEvent } from "react";
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
} from "@/components/ui/sheet"
import { CurrentArticleContext } from "@/app/redux/context/currentArticleContext";
import { ArticleEdit} from "./recoilState";
import { useRecoilState } from "recoil";




export function EditSheet() {
    const [ArticleEditState,setArticleEditState] = useRecoilState(ArticleEdit);
    const {isEdit,EditArticle} = ArticleEditState;

    
    const onSave = (e:SyntheticEvent) => {
      e.preventDefault(); //サーバーに再度ページの取得をさせないため
      
     setArticleEditState({isEdit:false,EditArticle:null});
    };
    const setOpenFlag = (flag:boolean) =>{
      setArticleEditState({isEdit:flag,EditArticle:null});
    };

  return (
    <Sheet open={isEdit} onOpenChange={setOpenFlag}>
      <SheetTrigger asChild>
        <Button variant="outline">Open</Button>
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
            <Input id="title" value={EditArticle?.title} className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-right">
              説明
            </Label>
            <Input id="description" value={EditArticle?.description} className="col-span-3" />
          </div>

        </div>
        <SheetFooter>
          <SheetClose asChild>
            <Button type="submit" onSubmit={() => setOpenFlag(!isEdit)}>Save changes</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}
