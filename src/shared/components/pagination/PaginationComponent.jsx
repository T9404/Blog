import React from 'react';
import { Pagination } from 'react-bootstrap';

function CustomPagination({ currentPage, onPageChange, totalPages }) {
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

                const items = [];
                for (let number = 1; number <= Math.min(totalPages, maxVisiblePages); number++) {
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
}

function PaginationComponent({ currentPage, onPageChange, totalPages }) {
        return (
            <CustomPagination
                currentPage={currentPage}
                onPageChange={onPageChange}
                totalPages={totalPages}
            />
        );
}

export default PaginationComponent;