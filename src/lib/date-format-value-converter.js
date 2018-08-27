import moment from 'moment';

export class DateFormatValueConverter {
  toView(value, format) {
    if (value && value != 'Invalid Date') {
      return moment(value).format(format);
    }
    else
      return "";
  }

  fromView(dateString, format) {
    return moment(dateString, format).toDate();
  }
}
