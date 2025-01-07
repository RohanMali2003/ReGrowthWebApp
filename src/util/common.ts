import { PRIMARY_DATE_FORMAT } from 'src/constants/date';
import { format, parse } from 'date-fns';

export const getValidDate = (date: number | string | Date) => {
  const d = new Date(date);

  // If it's not NaN then return the date
  if (!isNaN(d.valueOf())) {
    return new Date(d.toDateString()); // Strip the time part
  }

  if (typeof date === 'string') {
    const parsedDate = parse(date, PRIMARY_DATE_FORMAT, new Date());
    if (!isNaN(parsedDate.valueOf())) {
      return new Date(parsedDate.toDateString()); // Strip the time part
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

export function formatRegDate(date: string): string {
  const [day, month, year] = date.split('-');
  return `${year}-${month}-${day}`;
}
