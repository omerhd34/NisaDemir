export function getLegalLastUpdated() {
 return new Date().toLocaleDateString('tr-TR', {
  day: 'numeric',
  month: 'long',
  year: 'numeric',
 });
}
