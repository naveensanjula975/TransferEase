import React from 'react';
import { Link, useLocation } from 'react-router-dom';

// Simple class name utility
const cn = (...classes) => classes.filter(Boolean).join(' ');

const Breadcrumb = ({
  items = [],
  className,
  separator = '/',
  homeIcon = true,
  maxItems = 5
}) => {
  const location = useLocation();

  // Auto-generate breadcrumbs from current location if no items provided
  const generateBreadcrumbs = () => {
    const pathSegments = location.pathname.split('/').filter(Boolean);
    const breadcrumbs = [];

    // Add home
    breadcrumbs.push({
      label: 'Home',
      path: '/',
      icon: homeIcon && (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a1 1 0 00-.293-.707L12 2.586a1 1 0 00-1.414 0L1.293 8.293A1 1 0 001 9v0a2 2 0 002 2h0" />
        </svg>
      )
    });

    // Add path segments
    let currentPath = '';
    pathSegments.forEach((segment, index) => {
      currentPath += `/${segment}`;
      breadcrumbs.push({
        label: segment.charAt(0).toUpperCase() + segment.slice(1).replace('-', ' '),
        path: currentPath,
        isLast: index === pathSegments.length - 1
      });
    });

    return breadcrumbs;
  };

  const breadcrumbItems = items.length > 0 ? items : generateBreadcrumbs();

  // Truncate items if needed
  const displayItems = breadcrumbItems.length > maxItems
    ? [
        breadcrumbItems[0],
        { label: '...', isEllipsis: true },
        ...breadcrumbItems.slice(-maxItems + 2)
      ]
    : breadcrumbItems;

  return (
    <nav className={cn('flex', className)} aria-label="Breadcrumb">
      <ol className="inline-flex items-center space-x-1 md:space-x-3">
        {displayItems.map((item, index) => (
          <li key={index} className="inline-flex items-center">
            {/* Separator (except for first item) */}
            {index > 0 && (
              <div className="flex items-center">
                {typeof separator === 'string' ? (
                  <span className="mx-2 text-gray-400">{separator}</span>
                ) : (
                  <div className="mx-2 text-gray-400">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                )}
              </div>
            )}

            {/* Breadcrumb item */}
            {item.isEllipsis ? (
              <span className="text-gray-500">...</span>
            ) : item.isLast || !item.path ? (
              <span className={cn(
                'flex items-center text-sm font-medium text-gray-500',
                item.icon && 'space-x-2'
              )}>
                {item.icon && <span>{item.icon}</span>}
                <span>{item.label}</span>
              </span>
            ) : (
              <Link
                to={item.path}
                className={cn(
                  'flex items-center text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors',
                  item.icon && 'space-x-2'
                )}
              >
                {item.icon && <span>{item.icon}</span>}
                <span>{item.label}</span>
              </Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};

// Breadcrumb Item component for custom usage
export const BreadcrumbItem = ({
  children,
  href,
  isLast = false,
  className
}) => {
  return (
    <li className={cn('inline-flex items-center', className)}>
      {isLast ? (
        <span className="text-sm font-medium text-gray-500">
          {children}
        </span>
      ) : (
        <Link
          to={href}
          className="text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors"
        >
          {children}
        </Link>
      )}
    </li>
  );
};

// Simple breadcrumb without router
export const SimpleBreadcrumb = ({
  items = [],
  className,
  separator = '/',
  onItemClick
}) => {
  return (
    <nav className={cn('flex', className)} aria-label="Breadcrumb">
      <ol className="inline-flex items-center space-x-1 md:space-x-3">
        {items.map((item, index) => (
          <li key={index} className="inline-flex items-center">
            {/* Separator */}
            {index > 0 && (
              <div className="flex items-center">
                {typeof separator === 'string' ? (
                  <span className="mx-2 text-gray-400">{separator}</span>
                ) : (
                  <div className="mx-2 text-gray-400">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                )}
              </div>
            )}

            {/* Item */}
            {item.isLast ? (
              <span className={cn(
                'flex items-center text-sm font-medium text-gray-500',
                item.icon && 'space-x-2'
              )}>
                {item.icon && <span>{item.icon}</span>}
                <span>{item.label}</span>
              </span>
            ) : (
              <button
                onClick={() => onItemClick?.(item, index)}
                className={cn(
                  'flex items-center text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors',
                  item.icon && 'space-x-2'
                )}
              >
                {item.icon && <span>{item.icon}</span>}
                <span>{item.label}</span>
              </button>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumb;
