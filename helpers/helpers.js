const { format } = require('date-fns');

// helper para formatar datas
exports.formatDate = (date, formatString) => {
  return format(new Date(date), formatString);
}