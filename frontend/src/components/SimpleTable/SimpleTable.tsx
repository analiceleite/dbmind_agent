import { useTheme } from '../../contexts/ThemeContext';
import { darkTheme, lightTheme } from '../../styles/theme';

function isNumberValue(v: any) {
  return v !== null && v !== undefined && !Array.isArray(v) && !isNaN(Number(v));
}

function isIsoDateString(s: any) {
  if (typeof s !== 'string') return false;
  return /^\d{4}-\d{2}-\d{2}(T\d{2}:\d{2}:\d{2}(?:\.\d+)?Z?)?$/.test(s);
}

function formatCellValue(val: any) {
  if (val === null || val === undefined) return '';
  if (isNumberValue(val)) return Number(val).toLocaleString();
  if (isIsoDateString(val)) return new Date(val).toLocaleString();
  return String(val);
}

function exportCSV(columns: any[], rows: any[], filename = 'table.csv') {
  const header = columns.map((c) => (c.label || c.key)).join(',');
  const lines = rows.map((r) => columns.map((c) => {
    const val = r[c.key];
    if (val === null || val === undefined) return '';
    const s = String(val).replace(/"/g, '""');
    return `"${s}"`;
  }).join(','));
  const csv = [header, ...lines].join('\n');
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

export default function SimpleTable({ data }: { data: any }) {
  if (!data) return null;
  const columns = (data.columns && data.columns.length) ? data.columns : (data.rows && data.rows.length ? Object.keys(data.rows[0]).map((k: string) => ({ key: k, label: k })) : []);
  const rows = data.rows || [];

  const { theme } = (() => {
    try {
      return useTheme();
    } catch (e) {
      return { theme: 'dark' } as any;
    }
  })();
  const themeColors = theme === 'dark' ? darkTheme : lightTheme;

  return (
    <div style={{ padding: 8, color: themeColors.textPrimary }}>
      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8, marginBottom: 8 }}>
        <button
          onClick={() => exportCSV(columns, rows)}
          title="Export table as CSV"
          aria-label="Export table as CSV"
          style={{ cursor: 'pointer',padding: '6px 10px', fontSize: 13, background: themeColors.bgSecondary, color: themeColors.textPrimary, border: `1px solid ${themeColors.borderPrimary}`, borderRadius: 4 }}
        >
          Export CSV
        </button>
        <button
          onClick={() => navigator.clipboard?.writeText(JSON.stringify({ columns, rows }, null, 2))}
          title="Copy table data as JSON to clipboard"
          aria-label="Copy table data as JSON to clipboard"
          style={{ cursor: 'pointer', padding: '6px 10px', fontSize: 13, background: themeColors.bgSecondary, color: themeColors.textPrimary, border: `1px solid ${themeColors.borderPrimary}`, borderRadius: 4 }}
        >
          Copy JSON
        </button>
      </div>

      <div style={{ overflowX: 'auto', border: `1px solid ${themeColors.borderPrimary}`, borderRadius: 6, background: themeColors.bgPrimary }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ background: themeColors.bgSecondary }}>
              {columns.map((c: any) => (
                <th key={c.key} style={{ textAlign: 'left', padding: '10px 12px', borderBottom: `1px solid ${themeColors.borderPrimary}`, fontWeight: 600, fontSize: 13, color: themeColors.textPrimary }}>{c.label || c.key}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((r: any, i: number) => (
              <tr key={i} style={{ background: i % 2 === 0 ? themeColors.bgPrimary : themeColors.bgTertiary }}>
                {columns.map((c: any) => {
                  const raw = r[c.key];
                  const formatted = formatCellValue(raw);
                  const alignRight = isNumberValue(raw);
                  return (
                    <td
                      key={c.key}
                      title={String(raw ?? '')}
                      style={{ padding: '10px 12px', borderBottom: `1px solid ${themeColors.borderPrimary}`, maxWidth: 600, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', textAlign: alignRight ? 'right' : 'left', fontFamily: alignRight ? 'monospace' : 'inherit', color: themeColors.textPrimary }}
                    >
                      {formatted}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
