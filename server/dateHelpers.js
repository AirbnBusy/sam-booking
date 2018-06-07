const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];

const getPositionOfFirstDayOfMonth = (year, month) => new Date(year, month, 1).getDay();
const getNumberOfDaysInMonth = (year, month) => new Date(year, month, 0).getDate();
const getMonthName = month => monthNames[Number(month)];

module.exports = {
  getPositionOfFirstDayOfMonth,
  getNumberOfDaysInMonth,
  getMonthName,
};
