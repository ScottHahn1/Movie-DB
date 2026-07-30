import { useSearchParams } from "react-router-dom";

type Props = {
    currentPage: number;
    setSearchParams: ReturnType<typeof useSearchParams>[1];
    totalPages: number;
}

const MorePages = ({ currentPage, setSearchParams, totalPages }: Props) => {
    const numOfPagesToDisplay = 5;

    const formulateArrLength = () => {
        if (currentPage >= totalPages) return 1;
        return Math.min(totalPages - currentPage + 1, numOfPagesToDisplay);
    }

    return (
         <div className='more-pages'>
            {
                Array.from({ length: formulateArrLength() }).map((_, index) => (
                    <span 
                        key={`${currentPage}-${index}`}
                        onClick={() => setSearchParams(prev => {
                            const newParams = new URLSearchParams(prev);
                            newParams.set('page', (currentPage + index).toString());
                            return newParams;
                        })}
                        className={index === 0 ? 'active-page pointer' : 'pointer'}
                    >
                        {currentPage + index}
                    </span>
                ))
            }
        </div>
    )
}

export default MorePages;