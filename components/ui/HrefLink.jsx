'use client';

import Link from 'next/link';
import { trackLinkClick } from '@/lib/analytics';

function isNativeAnchorHref(href) {
 return typeof href === 'string' && /^(mailto:|tel:|https?:)/i.test(href);
}

export default function HrefLink({ href, children, className, target, rel, onClick, ...rest }) {
 function handleClick(event) {
  const label =
   (typeof children === 'string' ? children : undefined) ||
   rest['aria-label'] ||
   rest.title;

  trackLinkClick(href, { label });
  onClick?.(event);
 }

 if (isNativeAnchorHref(href)) {
  const isHttp = /^https?:/i.test(href);

  return (
   <a
    href={href}
    className={className}
    target={target ?? (isHttp ? '_blank' : undefined)}
    rel={rel ?? (isHttp ? 'noopener noreferrer' : undefined)}
    onClick={handleClick}
    {...rest}
   >
    {children}
   </a>
  );
 }

 return (
  <Link href={href} className={className} onClick={handleClick} {...rest}>
   {children}
  </Link>
 );
}
