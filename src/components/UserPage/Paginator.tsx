import React from "react";

type PaginatorPropsType = {
    setLoader: (isLoading: boolean) => void
    onChangePage: (usersPage: number) => void
    currentPage: number
    totalUsersCount: number
    pageSize: number
}

export function Paginator(props: PaginatorPropsType) {
    let {
        totalUsersCount,
        pageSize,
        onChangePage,
        currentPage,
        setLoader
    } = props;
    const pagesCount = Math.ceil(totalUsersCount / pageSize)
    let pagesNumber: number[] = [];
    for (let i = 1; i <= pagesCount; i++) {
        pagesNumber = [...pagesNumber, i]
    }
    return (
        <>
            {pagesNumber.map(el =>
                <span key={el} onClick={() => {
                    onChangePage(el)
                    setLoader(true)
                }}
                      className={el === currentPage ? "active-page" : ""}>{el}
            </span>)}
        </>
    )
}