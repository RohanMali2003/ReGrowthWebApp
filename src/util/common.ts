import { PRIMARY_DATE_FORMAT } from 'src/constants/date';
import { format } from 'date-fns/format';

export const getValidDate = (date: number | string | Date) => {
  const d = new Date(date);

  // If it's not NaN then return the date
  if (!isNaN(d.valueOf())) {
    return d;
  }

  if (typeof date === 'string') {
    // UTC format will show invalid for firefox
    if (new RegExp(/UTC/, 'i').test(date)) {
      const [calendarDate, time] = date.split(' ');
      return new Date(`${calendarDate}T${time}Z`);
    }
  }

  throw new Error('Not a valid date string');
};

export const formatDate = (
  date: number | string | Date,
  dateFormat: string = PRIMARY_DATE_FORMAT,
) => {
  let formattedDate = '';

  try {
    formattedDate = format(getValidDate(date), dateFormat);
  } catch {
    console.warn(`Invalid date returned: ${date}, returning blank string`);
  }

  return formattedDate;
};
