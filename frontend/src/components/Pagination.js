const Pagination = ({ activePage, onPageChange, totalPages, paginationRange }) => {
    return (
        <div className="pagination">
            <button name="first" onClick={() => onPageChange(1)}>
                First
            </button>
            <button name="previous" onClick={() => onPageChange(activePage - 1)} disabled={activePage === 1}>
                Previous
            </button>
            {paginationRange.map((page) => (
                <div key={page} className={activePage === page ? 'active-page' : ''}>
                    <button
                        name={'page-' + page}
                        style={{ fontWeight: page === activePage ? 'bold' : 'normal' }}
                        onClick={() => onPageChange(page)}
                    >
                        {page}
                    </button>
                </div>
            ))}
            <button name="next" onClick={() => onPageChange(activePage + 1)} disabled={activePage === totalPages}>
                Next
            </button>
            <button name="last" onClick={() => onPageChange(totalPages)}>
                Last
            </button>
        </div>
    );
};

export default Pagination;
