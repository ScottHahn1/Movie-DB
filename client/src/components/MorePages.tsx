import { Dispatch, SetStateAction } from "react";

type Props = {
    pageNum: number;
    setPageNum: Dispatch<SetStateAction<number>>;
    totalPages: number;
}

const MorePages = ({ pageNum, setPageNum, totalPages }: Props) => {
    const handleClick = (newPage: number) => {
        setPageNum(newPage);
    }

    const numOfPagesToDisplay = 5;

    const formulateArrLength = () => {
        if (pageNum >= totalPages) return 1;
        return Math.min(totalPages - pageNum + 1, numOfPagesToDisplay);
    }

    return (
         <div className='more-pages'>
            {
                Array.from({ length: formulateArrLength() }).map((_, index) => (
                    <span 
                        key={`${pageNum}-${index}`}
                        onClick={() => handleClick(pageNum + index)}
                        className={index === 0 ? 'active-page' : ''}
                    >
                        {pageNum + index}
                    </span>
                ))
            }
        </div>
    )
}

export default MorePages;