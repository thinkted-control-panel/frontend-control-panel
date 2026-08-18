import React from 'react';
import Link from 'next/link';

export interface BreadcrumbItem {
  label: string;
  onClick?: () => void;
  href?: string;
}

interface BreadcrumbProps {
  items: (string | BreadcrumbItem)[];
}

export function Breadcrumb({ items }: BreadcrumbProps) {
  if (!items || items.length === 0) return null;

  return (
    <div className="text-xs text-[#8E95A5] font-poppins -mb-2 flex items-center">
      {items.map((item, index) => {
        const isLast = index === items.length - 1;
        const isString = typeof item === 'string';
        const label = isString ? item : item.label;
        
        let element = <span>{label}</span>;
        
        if (!isString && item.href) {
            element = <Link href={item.href} className="cursor-pointer hover:underline text-gray-500">{label}</Link>;
        } else if (!isString && item.onClick) {
            element = <span onClick={item.onClick} className="cursor-pointer hover:underline text-gray-500">{label}</span>;
        }

        return (
          <React.Fragment key={index}>
            {isLast ? (
              <span className="font-semibold text-gray-700">{label}</span>
            ) : (
              <>
                {element}
                <span className="mx-1">/</span>
              </>
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
}
