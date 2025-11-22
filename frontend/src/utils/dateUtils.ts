export function formatDateShort(iso?: string | null) {
  if (!iso) return '';
  try {
    const d = new Date(iso);
    // Use locale-aware options
    return d.toLocaleString(undefined, {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  } catch (_e) {
    return iso;
  }
}

export function relativeTimeFromNow(iso?: string | null) {
  if (!iso) return '';
  const rtf = (function () {
    try {
      return new Intl.RelativeTimeFormat(undefined, { numeric: 'auto' });
    } catch (_) {
      return null as unknown as Intl.RelativeTimeFormat | null;
    }
  })();

  const d = new Date(iso).getTime();
  const now = Date.now();
  const diff = Math.floor((d - now) / 1000); // seconds

  const divisions: Array<[number, Intl.RelativeTimeFormatUnit]> = [
    [60, 'second'],
    [60, 'minute'],
    [24, 'hour'],
    [7, 'day'],
    [4.34524, 'week'],
    [12, 'month'],
    [Number.POSITIVE_INFINITY, 'year']
  ];

  let duration = diff;
  let unit: Intl.RelativeTimeFormatUnit = 'second';

  for (const [div, u] of divisions) {
    if (Math.abs(duration) < div) {
      unit = u;
      break;
    }
    duration = Math.round(duration / div);
  }

  // If RTF available, use it, otherwise fallback to simple string
  if (rtf) {
    return rtf.format(duration, unit);
  }

  // Fallback: show ±n unit
  return `${duration} ${unit}${Math.abs(duration) !== 1 ? 's' : ''}`;
}
