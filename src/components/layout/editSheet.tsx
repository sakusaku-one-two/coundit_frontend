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
} from "@/components/ui/sheet";
import { Textarea } from "@/components/ui/textarea";
import { ArticleEdit} from "./recoilState";
import { useRecoilState } from "recoil";
import EditForm from "./editForm";




export function EditSheet() {
    const [ArticleEditState,setArticleEditState] = useRecoilState(ArticleEdit);
    const {isEdit} = ArticleEditState;
    


  
    
    // const onSave = (e:SyntheticEvent) => {
    //   e.preventDefault(); //サーバーに再度ページの取得をさせないため
      
    //  setArticleEditState({isEdit:false,EditArticle:undefined});
    // };

    
    const setOpenFlag = (flag:boolean) =>{
      setArticleEditState((prev) => ({...prev, isEdit:flag}));
    };

  return (
    <Sheet open={isEdit} onOpenChange={setOpenFlag}>
      <SheetTrigger asChild>
        <Button variant="outline">Open</Button>
      </SheetTrigger>
      <SheetContent className="bg-white">
        <EditForm />
      </SheetContent>
    </Sheet>
  )
}
