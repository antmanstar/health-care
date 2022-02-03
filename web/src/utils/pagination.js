export default function paginate(dataFrame, fetch) {
  return {
    get currentPage() {
      return dataFrame && dataFrame.current_page;
    },
    get hasNext() {
      return dataFrame && dataFrame.has_next_page;
    },
    get hasPrev() {
      return dataFrame && dataFrame.has_previous_page;
    },
    get recordsPerPage() {
      return dataFrame && dataFrame.records_per_page;
    },
    get totalPages() {
      return dataFrame && dataFrame.total_pages;
    },
    get totalRecords() {
      return dataFrame && dataFrame.total_records;
    },
    goTo: page => {
      fetch({ ...dataFrame.request, page, recordsPerPage: dataFrame.records_per_page });
    },
    next: () => {
      if (dataFrame.has_next_page) {
        fetch({
          ...dataFrame.request,
          page: dataFrame.current_page + 1,
          recordsPerPage: dataFrame.records_per_page,
        });
      }
    },
    prev: () => {
      if (dataFrame.has_previous_page) {
        fetch({
          ...dataFrame.request,
          page: dataFrame.current_page - 1,
          recordsPerPage: dataFrame.records_per_page,
        });
      }
    }
  };
}
