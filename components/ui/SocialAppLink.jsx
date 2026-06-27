'use client';

import { trackLinkClick } from '@/lib/analytics';
import { openAppOrWeb } from '@/lib/socialAppLinks';

export default function SocialAppLink({
 appHref,
 webHref,
 href,
 tryAppOnDesktop = false,
 children,
 className,
 onClick,
 ...rest
}) {
 const webUrl = webHref ?? href;

 function handleClick(event) {
  const label =
   (typeof children === 'string' ? children : undefined) ||
   rest['aria-label'] ||
   rest.title;

  trackLinkClick(webUrl, { label });
  onClick?.(event);
  if (event.defaultPrevented || !appHref) return;

  event.preventDefault();
  openAppOrWeb(appHref, webUrl, { tryAppOnDesktop });
 }

 return (
  <a href={webUrl} className={className} onClick={handleClick} {...rest}>
   {children}
  </a>
 );
}
