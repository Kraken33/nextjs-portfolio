import dayjs from 'dayjs';

export const parseDate2Range = ({
  dateFrom,
  dateTo,
}: {
  dateFrom: string;
  dateTo: string;
}) => {
  const from = {
    year: dayjs(dateFrom).year(),
    month: dayjs(dateFrom).month(),
  };
  const to = {
    year: dayjs(dateTo).year(),
    month: dayjs(dateTo).month(),
  };

  if (from.year === to.year) {
    return {
      from: dayjs(dateFrom).format('MMM'),
      to: dayjs(dateFrom).format('MMM YYYY'),
    };
  } else if (from.year !== to.year) {
    return {
      from: from.year,
      to: to.year,
    };
  }

  return {
    from: dateFrom,
    to: dateTo,
  };
};
