export const isEmpty = (value: any): boolean => {
  if (value == null) {
    return true;
  }
  if (
    Array.isArray(value) ||
    typeof value === 'string' ||
    typeof value === 'function' ||
    typeof value.getMonth === 'function'
  ) {
    return value.length === 0;
  }
  if (typeof value === 'object') {
    for (const key in value) {
      if (Object.prototype.hasOwnProperty.call(value, key)) {
        return false;
      }
    }
    return true;
  }
  return false;
};

export const truncateWithEllipsis = (
  str: string,
  maxLength: number,
): string => {
  if (str.length <= maxLength) {
    return str;
  } else {
    return str.substring(0, maxLength - 3) + '...';
  }
};
