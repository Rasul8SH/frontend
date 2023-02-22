import React from "react"
import PropTypes from "prop-types"

const TableHeader = ({ onSort, selectedSort, columns }) => {
  const caretUp = <i className="bi bi-caret-up-fill"></i>
  const caretDown = <i className="bi bi-caret-down-fill"></i>

  const handleSort = (item) => {
    if (selectedSort.path === item) {
      onSort({
        ...selectedSort,
        order: selectedSort.order === "asc" ? "desc" : "asc"
      })
    } else {
      onSort({ path: item, order: "asc" })
    }
  }

  const renderCaret = (currentPath) => {
    if (selectedSort.path === currentPath) {
      if (selectedSort.order === "asc") {
        return caretDown
      }
      return caretUp
    }
    return null
  }

  return (
    <thead>
      <tr>
        {Object.keys(columns).map((column) => (
          <th
            key={column}
            onClick={columns[column].path ? () => handleSort(columns[column].path) : undefined}
            scope="col"
            {...{ role: columns[column].path && "button" }}
          >
            {columns[column].name}
            {renderCaret(columns[column].path)}
          </th>
        ))}
      </tr>
    </thead>
  )
}

TableHeader.propTypes = {
  selectedSort: PropTypes.object.isRequired,
  onSort: PropTypes.func.isRequired,
  columns: PropTypes.object.isRequired
}

export default TableHeader
