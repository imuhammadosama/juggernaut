import './Pagination.css';
export default function Pagination({
  itemsPerPage,
  totalItems,
  paginate,
  currentPage,
  itemsOnPage,
}) {
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
    pageNumbers.push(i);
  }
  return (
    <div className='flex space-between'>
      <div>
        <p>
          Showing {itemsOnPage}/{totalItems}
        </p>
      </div>
      <div>
        <ul className='pagination'>
          {pageNumbers.map((number) => (
            <li className='pagination-item' key={number}>
              <span
                className={
                  currentPage === number
                    ? 'pagination-number-active px-16 py-8 mr-4'
                    : 'pagination-number px-16 py-8 mr-4'
                }
                onClick={() => paginate(number)}
              >
                {number}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
