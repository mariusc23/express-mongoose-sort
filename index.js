'use strict';

function isSortAsc(sortString) {
  return sortString[0] !== '-';
}

function sortMiddleware(req, res, next) {
  let querySort = req.query.sort;

  if (querySort) {
    let sort = {};

    if (typeof querySort === 'string') {
      querySort = querySort.split(',');
    }

    if (Array.isArray(querySort)) {
      querySort.forEach(function(query) {
        sort[query.replace(/^-/, '')] = isSortAsc(query) ? 1 : -1;
      });
    }
    else {
      for (let key in querySort) {
        if (querySort.hasOwnProperty(key)) {
          sort[key] = parseInt(querySort[key], 10) > 0 ? 1 : -1;
        }
      }
    }

    res.locals.sort = sort;
  }
  next();
}

module.exports = sortMiddleware;
