export default function elasticDataFrame(dataFrame, fetch) {
  return {
    get currentPosition() {
      return dataFrame.current_page;
    },
    get hasMore() {
      return dataFrame.has_next_page;
    },
    get recordsPerRequest() {
      return dataFrame.records_per_page;
    },
    get totalPossibleRequests() {
      return dataFrame.total_pages;
    },
    get totalRecords() {
      return dataFrame.total_records;
    },
    next: () => {
      if (dataFrame.has_next_page) {
        fetch({
          page: dataFrame.current_page + 1,
          recordsPerPage: dataFrame.records_per_page,
          ...dataFrame.request
        });
      }
    }
  };
}
