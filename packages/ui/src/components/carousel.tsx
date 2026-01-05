import {FunctionComponent, ReactNode, useState} from "react";
import {Pagination, SpaceBetween} from "@cloudscape-design/components";

interface CarouselProps {
  children: ReactNode[];
}

export const Carousel: FunctionComponent<CarouselProps> = ({children}) => {
  const [currentPage, setCurrentPage] = useState(1);
  return (
    <SpaceBetween size={"xxxs"} direction={"vertical"} alignItems={"center"}>
      {children.slice(currentPage-1,currentPage)}
      <Pagination
        currentPageIndex={currentPage}
        onChange={({detail}) =>
          setCurrentPage(detail.currentPageIndex)}
        pagesCount={children.length}
      />
    </SpaceBetween>
  )
}