export function safeParseInt(value: string | number) {
  if (!value) return 0;
  if (typeof value === 'number') return value;
  return parseInt(value, 10);
}
