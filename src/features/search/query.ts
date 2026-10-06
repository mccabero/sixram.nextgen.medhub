export function getStringParam(value?: string | string[]) {
  if (Array.isArray(value)) {
    return value[0] ?? "";
  }

  return value ?? "";
}

export function getNumberParam(
  value?: string | string[],
  fallback = 1,
) {
  const resolved = getStringParam(value);
  const parsed = Number.parseInt(resolved, 10);

  return Number.isNaN(parsed) || parsed < 1 ? fallback : parsed;
}
