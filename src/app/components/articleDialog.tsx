"use client";
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog"
import { Cross2Icon } from "@radix-ui/react-icons";
import React from "react";
import { Article } from "../redux/articleSlice";
import { useRecoilState } from "recoil";
import { ArticleEdit } from "@/components/layout/recoilState";

interface ArticleProps {
    article: Article; // 記事のデータ
    isOpen: boolean; // ダイアログが開いているかどうかの状態
    setIsOpen: (arg: boolean) => void; // ダイアログの開閉を制御する関数
}

const ArticleDialog: React.FC<ArticleProps> = ({ article, setIsOpen, isOpen }) => {
    // ボタンがクリックされたときの処理
    const [ArticleEditState,setArticleEditState] = useRecoilState(ArticleEdit);
    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
        setArticleEditState({isEdit:true,EditArticle:article});
        setIsOpen(false); // ダイアログを閉じる
    };

    const cloes = (e:React.MouseEvent) =>{
        e.stopPropagation();
        setIsOpen(false);
    }

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            
            <DialogContent className="p-4 bg-white rounded shadow-lg">
                <div className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
                    <Cross2Icon className="h-4 w-4" onClick={cloes} />
                    <span className="sr-only">Close</span>
                </div>
                <DialogHeader className="border-b pb-2 mb-4"> 
                    <DialogTitle className="text-xl font-bold">{article.title}</DialogTitle> 
                    <DialogDescription className="text-gray-600">{article.description}</DialogDescription>
                </DialogHeader>
                <div className="text-gray-800"> 
                    {article.body}
                </div>
                <DialogFooter>
                
                    <Button className="bg-blue-500 text-white p-2 rounded" onClick={cloes}>閉じる</Button>
                    <Button className="bg-blue-500 text-white p-2 rounded" onClick={handleClick}>編集</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default ArticleDialog;


 {/* <DialogPrimitive.Close className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
        <Cross2Icon className="h-4 w-4" />
        <span className="sr-only">Close</span>
      </DialogPrimitive.Close> */}