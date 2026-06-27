export function getGtmId() {
 return process.env.NEXT_PUBLIC_GTM_ID?.trim() || "";
}

export function getGa4Id() {
 return process.env.NEXT_PUBLIC_GA4_ID?.trim() || "";
}

export function pushDataLayerEvent(event, params = {}) {
 if (typeof window === "undefined") return;
 window.dataLayer = window.dataLayer || [];
 window.dataLayer.push({ event, ...params });
}

export function trackLinkClick(href, { label } = {}) {
 if (!href || typeof href !== "string") return;

 const payload = {
  link_url: href,
  ...(label ? { link_text: label } : {}),
 };

 if (href.startsWith("tel:")) {
  pushDataLayerEvent("phone_click", payload);
  return;
 }

 if (/wa\.me|whatsapp/i.test(href)) {
  pushDataLayerEvent("whatsapp_click", payload);
  return;
 }

 if (href.startsWith("mailto:")) {
  pushDataLayerEvent("email_click", payload);
  return;
 }

 if (/instagram\.com|instagram:\/\//i.test(href)) {
  pushDataLayerEvent("instagram_click", payload);
  return;
 }

 if (href === "/iletisim" || href.startsWith("/iletisim")) {
  pushDataLayerEvent("appointment_cta_click", payload);
 }
}
