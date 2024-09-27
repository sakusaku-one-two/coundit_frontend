import { type CarouselApi } from "@/components/ui/carousel"
import React from "react"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { Card, CardContent } from "@/components/ui/card"
import { Tag } from "@/app/redux/tagsSlice"


export function MyTags({tags}:{tags:Tag[]}) {
  const [api, setApi] = React.useState<CarouselApi>()
  const [current, setCurrent] = React.useState(0)
  const [count, setCount] = React.useState(0)

  React.useEffect(() => {
    if (!api) {
      return
    }

    setCount(api.scrollSnapList().length)
    setCurrent(api.selectedScrollSnap() + 1)

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1)
    })
  }, [api])

  return (
    <Carousel setApi={setApi}  opts={{
      align: "start",
    }}
    className="">
      <span>枚数：{tags.length}</span>
      <CarouselContent >
        {
          tags.map((tag) => {
            return (
              <CarouselItem key={tag.id} className="">
                <div className="p-1">
                  <Card>
                    <CardContent className="flex aspect-square items-center justify-center p-6 bg-slate-400">
                      <span className="">{tag.name}</span>
                    </CardContent>
                  </Card>
              </div>
                
              </CarouselItem>
            );
          })
        }
        
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
      
    </Carousel>
  )
}
