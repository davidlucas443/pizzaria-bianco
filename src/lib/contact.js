export function whatsappLink(number, message) {
  const digits = number.replace(/\D/g, '');
  return /^[1-9]\d{9,14}$/.test(digits) ? `https://wa.me/${digits}?text=${encodeURIComponent(message)}` : null;
}
export function phoneLink(number) {
  const digits = number.replace(/\D/g, '');
  return /^[1-9]\d{9,14}$/.test(digits) ? `tel:+${digits}` : null;
}
export function mapLink(address) { return address.trim() ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}` : null; }
export function socialLink(value) {
  try { const url = new URL(value); return url.protocol === 'https:' ? url.href : null; } catch { return null; }
}
