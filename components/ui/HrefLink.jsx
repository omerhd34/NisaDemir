import Link from 'next/link';

function isNativeAnchorHref(href) {
 return typeof href === 'string' && /^(mailto:|tel:|https?:)/i.test(href);
}

export default function HrefLink({ href, children, className, target, rel, ...rest }) {
 if (isNativeAnchorHref(href)) {
  const isHttp = /^https?:/i.test(href);

  return (
   <a
    href={href}
    className={className}
    target={target ?? (isHttp ? '_blank' : undefined)}
    rel={rel ?? (isHttp ? 'noopener noreferrer' : undefined)}
    {...rest}
   >
    {children}
   </a>
  );
 }

 return (
  <Link href={href} className={className} {...rest}>
   {children}
  </Link>
 );
}
