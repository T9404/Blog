import React from 'react';
import { Pagination } from 'react-bootstrap';

const CustomPagination = ({ currentPage, onPageChange, totalPages }) => {
    const handlePageChange = (page) => {
        onPageChange(page);
    };
    
    const handlePrevClick = () => {
        if (currentPage > 1) {
            handlePageChange(currentPage - 1);
        }
    };
    
    const handleNextClick = () => {
        if (currentPage < totalPages) {
            handlePageChange(currentPage + 1);
        }
    };
    
    const renderPageNumbers = () => {
        const maxVisiblePages = 3;
        const middlePage = Math.ceil(maxVisiblePages / 2);
        const startPage = Math.max(1, currentPage - middlePage + 1);
        const endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
        
        const items = [];
        for (let number = startPage; number <= endPage; number++) {
            items.push(
                <Pagination.Item
                    key={number}
                    active={number === currentPage}
                    onClick={() => handlePageChange(number)}
                >
                    {number}
                </Pagination.Item>
            );
        }
        return items;
    };
    
    return (
        <Pagination>
            <Pagination.Prev onClick={handlePrevClick} />
            {renderPageNumbers()}
            <Pagination.Next onClick={handleNextClick} />
        </Pagination>
    );
};

const PaginationComponent = ({ currentPage, onPageChange, totalPages }) => (
    <CustomPagination currentPage={currentPage} onPageChange={onPageChange} totalPages={totalPages} />
);

export default PaginationComponent;