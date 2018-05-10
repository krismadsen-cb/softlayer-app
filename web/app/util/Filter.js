const Filter = {
  'by': {
    'contains': (filter, row) => row[filter.id].toString().toLowerCase().includes(filter.value.toLowerCase())
  }
};

export default Filter;
