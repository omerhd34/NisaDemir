const PHONE_DISPLAY_GROUPS = [4, 3, 2, 2];

export function formatPhoneDisplay(value) {
 const digits = value.replace(/\D/g, "").slice(0, PHONE_DISPLAY_GROUPS.reduce((a, b) => a + b, 0));
 let result = "";
 let index = 0;

 for (const size of PHONE_DISPLAY_GROUPS) {
  if (index >= digits.length) break;
  const chunk = digits.slice(index, index + size);
  if (!chunk) break;
  if (result) result += " ";
  result += chunk;
  index += size;
 }

 return result;
}

export function phoneTelFromDisplay(display) {
 if (!display?.trim()) return "";
 let digits = display.replace(/\D/g, "");
 if (!digits) return "";
 if (digits.startsWith("0")) {
  digits = `90${digits.slice(1)}`;
 } else if (!digits.startsWith("90")) {
  digits = `90${digits}`;
 }
 return `+${digits}`;
}

export function phoneTelUrl(tel) {
 if (!tel) return "";
 return `tel:${tel}`;
}

export function phoneWhatsAppDigits(tel) {
 if (!tel) return "";
 return tel.replace(/\D/g, "");
}

export function phoneWhatsAppUrl(tel) {
 const digits = phoneWhatsAppDigits(tel);
 return digits ? `https://wa.me/${digits}` : "";
}

export function phoneWhatsAppAppUrl(tel) {
 const digits = phoneWhatsAppDigits(tel);
 return digits ? `whatsapp://send?phone=${digits}` : "";
}
