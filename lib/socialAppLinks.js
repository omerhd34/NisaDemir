export function whatsAppAppUrl(phone) {
 return `whatsapp://send?phone=${phone}`;
}

export function instagramAppUrl(username) {
 return `instagram://user?username=${username}`;
}

export function mailtoUrl(email) {
 return `mailto:${email}`;
}

export function outlookAppUrl(email) {
 return `ms-outlook://compose?to=${encodeURIComponent(email)}`;
}

export function mailLinkProps(email) {
 return {
  href: mailtoUrl(email),
  appHref: outlookAppUrl(email),
  tryAppOnDesktop: true,
 };
}

function isMobileDevice() {
 if (typeof navigator === 'undefined') return false;
 return /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
}

function launchAppUrl(appUrl) {
 if (isMobileDevice()) {
  window.location.href = appUrl;
  return;
 }

 const iframe = document.createElement('iframe');
 iframe.style.display = 'none';
 iframe.src = appUrl;
 document.body.appendChild(iframe);
 window.setTimeout(() => iframe.remove(), 2000);
}

export function openAppOrWeb(appUrl, webUrl, { tryAppOnDesktop = false } = {}) {
 const shouldTryApp = isMobileDevice() || tryAppOnDesktop;

 if (!shouldTryApp) {
  window.open(webUrl, '_blank', 'noopener,noreferrer');
  return;
 }

 let appOpened = false;

 const onVisibilityChange = () => {
  if (document.hidden) {
   appOpened = true;
  }
 };

 document.addEventListener('visibilitychange', onVisibilityChange);
 launchAppUrl(appUrl);

 window.setTimeout(() => {
  document.removeEventListener('visibilitychange', onVisibilityChange);
  if (!appOpened) {
   window.location.href = webUrl;
  }
 }, 1500);
}
