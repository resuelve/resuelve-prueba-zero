const getPagedItems = (list, params = {
  page: 1,
  sortBy: 'created_at',
  sortDirection: 'desc'
}) => {
  const page = Math.max(parseInt(params.page || 1, 10), 1)
  const sortBy = params.sortBy || 'created_at'
  const sortDirection = params.sortDirection || 'desc'
  const pageSize = 5
  const totalPages = Math.ceil(list.length / pageSize)
  const start = (page - 1) * pageSize
  const end = start + pageSize
  const itms = JSON.parse(JSON.stringify(list))
  itms.sort((a, b) => {
    if (sortDirection === 'desc') {
      if (a[sortBy] > b[sortBy]) return -1
      if (a[sortBy] < b[sortBy]) return 1
      return 0
    }
    if (a[sortBy] > b[sortBy]) return 1
    if (a[sortBy] < b[sortBy]) return -1
    return 0
  })
  const records = itms.slice(start, end)
  const pagination = {
    page,
    totalPages,
    totalItems: itms.length,
    hasMoreItems: end < list.length,
    sortBy,
    sortDirection
  }
  return {
    pagination, records
  }
}

module.exports = getPagedItems
