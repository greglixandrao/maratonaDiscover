let data = {
  name: 'Greg Lixandrão',
  avatar: 'https://avatars.githubusercontent.com/u/13009208?v=4',
  'monthly-budget': 2000,
  'days-per-week': 5,
  'hours-per-day': 4,
  'vacation-per-year': 4,
  'value-hour': 70,
};

module.exports = {
  get() {
    return data;
  },
  update(newData) {
    data = newData;
  },
};
