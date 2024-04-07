export function padStart(string: any, length: number = 0, chars = ' ') {
  const str = String(string);
  if (typeof String.prototype.padStart === 'function') {
    return str.padStart(length, chars);
  }
  if (str.length >= length) {
    return str;
  }
  return (Array(length).join(chars) + str).slice(-length);
}

export function parseTime(time?: string) {
  let h = 0, m = 0, s = 0, ms = 0;
  if (time) {
    const tr = time.match(/(\d{1,2}):(\d{1,2})(:(\d{1,2})([.:]\d+)?)?/);
    if (tr) {
      h = +tr[1] || 0;
      m = +tr[2] || 0;
      s = +tr[4] || 0;
      ms = +tr[5] || 0;
    }
  }
  const d = new Date();
  d.setHours(h, m, s, ms);
  return d;
}

export interface IDateTimeParseConfig {
  date?: string | number | Date | null;
  time?: string | number | Date | null;
  datetime?: string | number | Date | null;
  utc?: boolean;
}

export function parseDate(cfg?: string | number | Date | null | IDateTimeParseConfig) {
  let dt = cfg, isUTC = false;
  if (cfg instanceof Date) {
    return cfg;
  } else if (typeof cfg === 'object') {
    dt = cfg?.date || cfg?.time || cfg?.datetime || cfg;
    isUTC = cfg?.utc ?? false;
  }
  if (typeof dt === 'string') {
    dt = dt.replace(/-/g, '/').replace(/(\d)(T)(\d)/i, '$1 $3');
    if (!/z$/i.test(dt)) {
      const dt_matched = dt.match(/^(\d{4})[-/]?(\d{1,2})?[-/]?(\d{0,2})[Tt\s]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?[.:]?(\d+)?$/);
      if (dt_matched) {
        const dt_matched_MM = (parseInt(dt_matched[2]) - 1) || 0;
        const dt_matched_ms = parseInt((dt_matched[7] || '0').substring(0, 3));
        if (isUTC) {
          return new Date(Date.UTC(
            +dt_matched[1] || 0,
            dt_matched_MM,
            +dt_matched[3] || 1,
            +dt_matched[4] || 0,
            +dt_matched[5] || 0,
            +dt_matched[6] || 0,
            dt_matched_ms
          ));
        }
        return new Date(
          +dt_matched[1] || 0,
          dt_matched_MM,
          +dt_matched[3] || 1,
          +dt_matched[4] || 0,
          +dt_matched[5] || 0,
          +dt_matched[6] || 0,
          dt_matched_ms
        );
      }
    }
  }
  return new Date(dt as VarDate);
}

export function parseDatetime(cfg?: string | number | Date | null | IDateTimeParseConfig) {
  let time = cfg;
  if (typeof cfg === 'object' && !(cfg instanceof Date)) {
    time = cfg?.date || cfg?.time || cfg?.datetime;
  }
  if (typeof time === 'string' && /^\d{1,2}:\d{1,2}.*$/.test(time)) {
    return parseTime(time);
  }
  return parseDate(cfg);
}

export interface IDateTimeConstructedInfo {
  year: string;
  month: string;
  date: string;
  hours: string;
  minutes: string;
  seconds: string;
  milliseconds: string;
  $dt: Date;
}
export function deconstructDate(dt: Date, pad = true): IDateTimeConstructedInfo {
  const year = '' + (pad ? padStart(dt.getFullYear(), 4, '0') : dt.getFullYear());
  const month = '' + (pad ? padStart(dt.getMonth() + 1, 2, '0') : dt.getMonth() + 1);
  const date = '' + (pad ? padStart(dt.getDate(), 2, '0') : dt.getDate());
  const hours = '' + (pad ? padStart(dt.getHours(), 2, '0') : dt.getHours());
  const minutes = '' + (pad ? padStart(dt.getMinutes(), 2, '0') : dt.getMinutes());
  const seconds = '' + (pad ? padStart(dt.getSeconds(), 2, '0') : dt.getSeconds());
  const milliseconds = '' + (pad ? padStart(dt.getMilliseconds(), 3, '0') : dt.getMilliseconds());
  return {
    year,
    month,
    date,
    hours,
    minutes,
    seconds,
    milliseconds,
    $dt: dt
  };
}

function formatterTransform(formatter: string | Function = "datetime"): Function {
  if (typeof formatter === 'function') return formatter;
  if (typeof formatter !== 'string') return () => formatter;
  let template = formatter;
  switch (formatter) {
    case 'date':
      template = 'YYYY-MM-DD';
      break;
    case 'time':
      template = 'HH:mm:ss';
      break;
    case 'datetime':
      template = 'YYYY-MM-DD HH:mm:ss';
      break;
  }
  return (deconstructedDateTimeInfo: IDateTimeConstructedInfo) => {
    const { year, month, date, hours, minutes, seconds, milliseconds } = deconstructedDateTimeInfo;
    return template
      .replace(
        /(Y{4}|y{4})|(MM)|(DD)|(HH)|(mm)|(sss)|(ss)/gm,
        (matched, tYear, tMonth, tDate, tHours, tMinutes, tMilliseconds, tSeconds) => {
          if (tYear) return year;
          if (tMonth) return month;
          if (tDate) return date;
          if (tHours) return hours;
          if (tMinutes) return minutes;
          if (tSeconds) return seconds;
          if (tMilliseconds) return milliseconds;
          return '';
        }
      );
  };
}

export function datetimeFormatter(cfg?: string | number | Date | null | IDateTimeParseConfig, formatter: string | Function = "datetime", pad: boolean = true): string {
  const datetime = parseDatetime(cfg);
  const deconstructedDateTimeInfo = deconstructDate(datetime, pad);
  const formatterFunc = formatterTransform(formatter);
  return formatterFunc(deconstructedDateTimeInfo);
}
