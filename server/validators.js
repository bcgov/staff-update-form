export function validateFirstname(value) {
  if (typeof value !== 'string' || value.trim() === '') {
    return 'First name must be a non-empty string.';
  } 
  if (/\d/.test(value)) {
    return 'First name must not contain numbers.';
  }
  return null;
}
