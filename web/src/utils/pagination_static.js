import { useState } from 'react';

const paginate = (data, recordsPerPage) => {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(data.length / recordsPerPage);

  return {
    get currentPage() {
      return currentPage;
    },
    get hasNext() {
      return currentPage < totalPages ? true : false;
    },
    get hasPrev() {
      return currentPage != 1 ? true : false;
    },
    get recordsPerPage() {
      return recordsPerPage;
    },
    get totalPages() {
      return totalPages;
    },
    get totalRecords() {
      return data.length;
    },
    get currentData() {
      var retArry = [];
      for (var i = 0; i < recordsPerPage; i++) {
        retArry.push(data[(currentPage - 1) * recordsPerPage + i]);
      }
      return retArry;
    },
    goTo: page => {
      var retArry = [];
      var newPage = (page < 1 || page > totalPages) ? currentPage : page;
      for (var i = 0; i < recordsPerPage; i++) {
        retArry.push(data[(newPage - 1) * recordsPerPage + i]);
      }
      setCurrentPage(newPage);
      return retArry;
    },
    next: () => {
      var retArry = [];
      var page = currentPage < totalPages ? currentPage + 1 : currentPage;
      for (var i = 0; i < recordsPerPage; i++) {
        retArry.push(data[(page - 1) * recordsPerPage + i]);
      }
      setCurrentPage(page);
      return retArry;
    },
    prev: () => {
      var retArry = [];
      var page = currentPage == 1 ? 1 : currentPage - 1;
      for (var i = 0; i < recordsPerPage; i++) {
        retArry.push(data[(page - 1) * recordsPerPage + i]);
      }
      setCurrentPage(page);
      return retArry;
    }
  };
};

export default paginate;