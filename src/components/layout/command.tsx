"use client";
import {
    Calculator,
    Calendar,
    CreditCard,
    Settings,
    Smile,
    User,
  } from "lucide-react"
  
  import {
    CommandDialog,
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
    CommandSeparator,
    CommandShortcut,
  } from "@/components/ui/command";
  import { useRef, useEffect,useState ,useContext} from "react";
  import { useSelector,useDispatch} from 'react-redux';
  import { CurrentArticleContext } from "@/app/redux/context/currentArticleContext";
  import { RootState,AppDispatch } from "@/app/redux/store";
  import ArticleRecord from "@/app/components/articleRecord";
  import { Article } from "@/app/redux/articleSlice";
import ArticleDialog from "@/app/components/articleDialog";
import { tree } from "next/dist/build/templates/app-page";
import { ArticleEdit } from "./recoilState";
import { useRecoilState,RecoilRoot } from "recoil";
const Row = ({
    article
}:{article:Article}) => {
    const [dOpen,setDopne] = useState<boolean>(false);

    const handleOpen = (e) =>{

        setDopne((open) => !open);
    };

    return (
        <div className="flex flex-col-2" onSelect={()=> setDopne((open) =>!open )} onClick={handleOpen}>
            <div className="flex flex-row items-between p-4">
                <User></User>
                <span>{article.user.username}</span>
                <span>{article.title}</span>
            </div>
            <div className="flex flex-row justify-center items-between p-4">

                <ArticleDialog isOpen={dOpen} setIsOpen={setDopne} article={article}/>
            </div>
        </div>
    );
};


  export function CommandDemo() {
    const [EditArticleData,setArticleEditState] = useRecoilState(ArticleEdit);
    const {isEdit,EditArticle} = EditArticleData;


    const [isOpen,setIsOpen] = useState<boolean>(false);
    const articles = useSelector((state:RootState) => state.articles.articles);//記事のリストを取得
    const status = useSelector((state:RootState) => state.articles.status);//記事を取得のステータスを取得

    useEffect(() =>{
        const down = (e: KeyboardEvent) => {
            if(e.key === "k" && (e.metaKey || e.ctrlKey)) {
                e.preventDefault();
                setIsOpen((open) => !open)
            }
        }
        document.addEventListener('keydown',down);
        return () => document.removeEventListener('keydown',down)
    },[]);

    const handleKeyDown = (e: React.KeyboardEvent, onSelect: () => void) => {
        if (e.key === 'Enter') {
            alert(""); // エンターキーが押されたときにonSelectを呼び出す
        }
    };

    const OnRowSelect = (article:Article) =>{
        alert(article.id);
        setArticleEditState({
          isEdit:true,
          EditArticle:article as Article | undefined,
        });
    };

    return (
      <RecoilRoot>
        <CommandDialog open={isOpen} onOpenChange={setIsOpen}>
      <Command className="rounded-lg border shadow-md md:min-w-[450px]">
        <CommandInput placeholder="Type a command or search..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Suggestions">
            { articles.map((article:Article) => {
                     
    
                    return (
                        <CommandItem key={article.id} onSelect={() => OnRowSelect(article)}>
                            <Row article={article}></Row>
                        </CommandItem>
                    );
                })

            }
            
             
            <CommandItem>
              <Smile className="mr-2 h-4 w-4" />
              <span>Search Emoji</span>
            </CommandItem>
            <CommandItem disabled>
              <Calculator className="mr-2 h-4 w-4" />
              <span>Calculator</span>
            </CommandItem>
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup heading="Settings">
            <CommandItem>
              <User className="mr-2 h-4 w-4" />
              <span>Profile</span>
              <CommandShortcut>⌘P</CommandShortcut>
            </CommandItem>
            <CommandItem>
              <CreditCard className="mr-2 h-4 w-4" />
              <span>Billing</span>
              <CommandShortcut>⌘B</CommandShortcut>
            </CommandItem>
            <CommandItem>
              <Settings className="mr-2 h-4 w-4" />
              <span>Settings</span>
              <CommandShortcut>⌘S</CommandShortcut>
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </Command>
      </CommandDialog>
      </RecoilRoot>
    )
  }
  