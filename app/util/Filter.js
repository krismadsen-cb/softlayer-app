const Filter = {
  'by': {
    'contains': (filter, row) => row[filter.id].toLowerCase().includes(filter.value.toLowerCase())
  }
};

export default Filter;
