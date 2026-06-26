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
