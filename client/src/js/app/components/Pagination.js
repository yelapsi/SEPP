import React from "react";

const Pagination = ({postsPerPage, totalPosts, paginate, currentPage}) => {
    const pageNumbers = [];

    let n = 10;
    let l = currentPage - n/2;
    let r = currentPage + n/2 - 1;
    let max = Math.ceil(totalPosts / postsPerPage);

    if(max <= n){
        l = 1;
        r = max;
    } else {
        if(l <= 1){
            l = 1;
            r = n;
        }
    
        if(r >= max){
            l = max-n+1;
            r = max;
        }
    }

    for(let i = l; i <= r; i++){
        pageNumbers.push(i);
    }
    
    return (
        <nav className='a1'>
            <ul className='pagination'>
                {pageNumbers.length > postsPerPage
                    ?<li key={0}>
                        <a onClick={() => paginate(1)} href='!#' className='page-link'>{"<<"}</a>
                    </li>
                    :<li></li>
                }

                {pageNumbers.map(number => (
                    <li key={number}>
                        {number == currentPage
                        ?<a onClick={() => paginate(number)} href='!#' className='active'>
                            {number}
                        </a>
                        :<a onClick={() => paginate(number)} href='!#' className='page-link'>
                            {number}
                        </a>}
                    </li>
                ))}

                {pageNumbers.length > postsPerPage
                    ?<li key={pageNumbers.length/postsPerPage}>
                        <a onClick={() => paginate(max)} href='!#' className='page-link'>{">>"}</a>
                    </li>
                    :<li></li>
                }
            </ul>
        </nav>
    )
}

export default Pagination