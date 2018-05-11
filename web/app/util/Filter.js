function mapNullToEmpty(a) {
  return a === null ? '' : a
}

const Filter = {
  'by': {
    'contains': (filter, row) => mapNullToEmpty(row[filter.id]).toString().toLowerCase().includes(filter.value.toLowerCase())
  }
};

export default Filter;
