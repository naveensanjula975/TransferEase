import React from 'react';

// Simple class name utility
const cn = (...classes) => classes.filter(Boolean).join(' ');

const Card = ({
  children,
  className,
  variant = 'default',
  size = 'default',
  padding = 'default',
  shadow = 'default',
  border = true,
  rounded = 'default',
  hover = false,
  clickable = false,
  onClick
}) => {
  const baseStyles = 'bg-white transition-all duration-200';

  const variants = {
    default: 'border-gray-200',
    primary: 'border-blue-200 bg-blue-50',
    secondary: 'border-gray-300 bg-gray-50',
    success: 'border-green-200 bg-green-50',
    warning: 'border-yellow-200 bg-yellow-50',
    danger: 'border-red-200 bg-red-50',
    info: 'border-blue-200 bg-blue-50'
  };

  const sizes = {
    sm: 'max-w-sm',
    default: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-xl',
    full: 'w-full'
  };

  const paddings = {
    none: 'p-0',
    sm: 'p-3',
    default: 'p-4',
    lg: 'p-6',
    xl: 'p-8'
  };

  const shadows = {
    none: '',
    sm: 'shadow-sm',
    default: 'shadow',
    md: 'shadow-md',
    lg: 'shadow-lg',
    xl: 'shadow-xl'
  };

  const roundeds = {
    none: '',
    sm: 'rounded-sm',
    default: 'rounded-md',
    lg: 'rounded-lg',
    xl: 'rounded-xl',
    full: 'rounded-full'
  };

  const hoverStyles = hover || clickable ? 'hover:shadow-md hover:-translate-y-1' : '';
  const clickableStyles = clickable || onClick ? 'cursor-pointer' : '';
  const borderStyles = border ? 'border' : '';

  return (
    <div
      className={cn(
        baseStyles,
        borderStyles,
        variants[variant],
        sizes[size],
        paddings[padding],
        shadows[shadow],
        roundeds[rounded],
        hoverStyles,
        clickableStyles,
        className
      )}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

// Card Header
export const CardHeader = ({
  children,
  className,
  title,
  subtitle,
  action,
  border = true
}) => {
  return (
    <div className={cn(
      'flex items-center justify-between',
      border && 'border-b border-gray-200 pb-3 mb-4',
      className
    )}>
      <div className="flex-1 min-w-0">
        {title && (
          <h3 className="text-lg font-semibold text-gray-900 truncate">
            {title}
          </h3>
        )}
        {subtitle && (
          <p className="text-sm text-gray-500 mt-1">
            {subtitle}
          </p>
        )}
        {children}
      </div>
      {action && (
        <div className="flex-shrink-0 ml-4">
          {action}
        </div>
      )}
    </div>
  );
};

// Card Body
export const CardBody = ({
  children,
  className,
  padding = 'none'
}) => {
  const paddings = {
    none: '',
    sm: 'p-3',
    default: 'p-4',
    lg: 'p-6'
  };

  return (
    <div className={cn(paddings[padding], className)}>
      {children}
    </div>
  );
};

// Card Footer
export const CardFooter = ({
  children,
  className,
  border = true,
  justify = 'end'
}) => {
  const justifyStyles = {
    start: 'justify-start',
    center: 'justify-center',
    end: 'justify-end',
    between: 'justify-between'
  };

  return (
    <div className={cn(
      'flex items-center',
      justifyStyles[justify],
      border && 'border-t border-gray-200 pt-3 mt-4',
      className
    )}>
      {children}
    </div>
  );
};

// Stat Card
export const StatCard = ({
  title,
  value,
  icon,
  change,
  changeType = 'neutral',
  className,
  onClick
}) => {
  const changeColors = {
    positive: 'text-green-600',
    negative: 'text-red-600',
    neutral: 'text-gray-600'
  };

  const changeIcons = {
    positive: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 11l5-5m0 0l5 5m-5-5v12" />
      </svg>
    ),
    negative: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 13l-5 5m0 0l-5-5m5 5V6" />
      </svg>
    ),
    neutral: null
  };

  return (
    <Card
      className={cn('hover:shadow-md transition-shadow', className)}
      clickable={!!onClick}
      onClick={onClick}
    >
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">{value}</p>
          {change && (
            <div className={cn('flex items-center mt-2 text-sm', changeColors[changeType])}>
              {changeIcons[changeType]}
              <span className="ml-1">{change}</span>
            </div>
          )}
        </div>
        {icon && (
          <div className="flex-shrink-0 ml-4">
            <div className="w-8 h-8 text-gray-400">
              {icon}
            </div>
          </div>
        )}
      </div>
    </Card>
  );
};

// Info Card
export const InfoCard = ({
  type = 'info',
  title,
  message,
  action,
  onClose,
  className
}) => {
  const types = {
    info: {
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200',
      textColor: 'text-blue-800',
      iconColor: 'text-blue-500',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    },
    success: {
      bgColor: 'bg-green-50',
      borderColor: 'border-green-200',
      textColor: 'text-green-800',
      iconColor: 'text-green-500',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
      )
    },
    warning: {
      bgColor: 'bg-yellow-50',
      borderColor: 'border-yellow-200',
      textColor: 'text-yellow-800',
      iconColor: 'text-yellow-500',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
        </svg>
      )
    },
    error: {
      bgColor: 'bg-red-50',
      borderColor: 'border-red-200',
      textColor: 'text-red-800',
      iconColor: 'text-red-500',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    }
  };

  const typeConfig = types[type];

  return (
    <div className={cn(
      'border rounded-md p-4',
      typeConfig.bgColor,
      typeConfig.borderColor,
      className
    )}>
      <div className="flex items-start">
        <div className={cn('flex-shrink-0', typeConfig.iconColor)}>
          {typeConfig.icon}
        </div>
        <div className="ml-3 flex-1">
          {title && (
            <h3 className={cn('text-sm font-medium', typeConfig.textColor)}>
              {title}
            </h3>
          )}
          <div className={cn('text-sm', typeConfig.textColor, title && 'mt-1')}>
            {message}
          </div>
          {action && (
            <div className="mt-3">
              {action}
            </div>
          )}
        </div>
        {onClose && (
          <div className="ml-auto flex-shrink-0">
            <button
              onClick={onClose}
              className={cn(
                'rounded-md p-1.5 hover:bg-black hover:bg-opacity-10 focus:outline-none focus:ring-2 focus:ring-black focus:ring-opacity-10',
                typeConfig.iconColor
              )}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Card;
