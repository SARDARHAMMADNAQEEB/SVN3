import React from 'react'

function PaginationComponent({ totalPages, paginate }) {
  return (
    <div>
    {/* {Array.from({ length: totalPages }, (_, index) => (
      <button key={index} onClick={() => paginate(index + 1)}>
        {index + 1}
      </button>
    ))} */}
  </div>
  )
}

export default PaginationComponent