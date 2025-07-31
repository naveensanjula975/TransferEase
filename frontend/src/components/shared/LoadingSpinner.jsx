import React from 'react';

// Simple class name utility
const cn = (...classes) => classes.filter(Boolean).join(' ');

const LoadingSpinner = ({
  size = 'default',
  className,
  color = 'blue',
  centered = false,
  overlay = false,
  text
}) => {
  const sizes = {
    xs: 'w-3 h-3',
    sm: 'w-4 h-4',
    default: 'w-6 h-6',
    lg: 'w-8 h-8',
    xl: 'w-12 h-12'
  };

  const colors = {
    blue: 'text-blue-600',
    gray: 'text-gray-600',
    green: 'text-green-600',
    red: 'text-red-600',
    yellow: 'text-yellow-600',
    purple: 'text-purple-600',
    white: 'text-white'
  };

  const spinner = (
    <div className={cn(
      'animate-spin',
      sizes[size],
      colors[color],
      className
    )}>
      <svg
        className="w-full h-full"
        fill="none"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        />
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        />
      </svg>
    </div>
  );

  const content = (
    <div className={cn(
      'flex items-center',
      text ? 'space-x-2' : '',
      centered ? 'justify-center' : ''
    )}>
      {spinner}
      {text && (
        <span className={cn(
          'text-sm font-medium',
          colors[color]
        )}>
          {text}
        </span>
      )}
    </div>
  );

  if (overlay) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
        <div className="bg-white rounded-lg p-6 shadow-xl">
          {content}
        </div>
      </div>
    );
  }

  if (centered) {
    return (
      <div className="flex items-center justify-center w-full h-full min-h-[200px]">
        {content}
      </div>
    );
  }

  return content;
};

// Pulse loading animation
export const PulseLoader = ({
  size = 'default',
  className,
  color = 'blue'
}) => {
  const sizes = {
    sm: 'w-2 h-2',
    default: 'w-3 h-3',
    lg: 'w-4 h-4'
  };

  const colors = {
    blue: 'bg-blue-600',
    gray: 'bg-gray-600',
    green: 'bg-green-600',
    red: 'bg-red-600',
    yellow: 'bg-yellow-600'
  };

  return (
    <div className={cn('flex space-x-1', className)}>
      <div className={cn(
        'rounded-full animate-pulse',
        sizes[size],
        colors[color]
      )} style={{ animationDelay: '0ms' }} />
      <div className={cn(
        'rounded-full animate-pulse',
        sizes[size],
        colors[color]
      )} style={{ animationDelay: '150ms' }} />
      <div className={cn(
        'rounded-full animate-pulse',
        sizes[size],
        colors[color]
      )} style={{ animationDelay: '300ms' }} />
    </div>
  );
};

// Skeleton loader
export const Skeleton = ({
  className,
  width,
  height,
  rounded = false,
  lines = 1
}) => {
  const skeletonClass = cn(
    'animate-pulse bg-gray-200',
    rounded ? 'rounded-full' : 'rounded',
    className
  );

  if (lines === 1) {
    return (
      <div
        className={skeletonClass}
        style={{
          width: width || '100%',
          height: height || '1rem'
        }}
      />
    );
  }

  return (
    <div className="space-y-2">
      {Array.from({ length: lines }, (_, i) => (
        <div
          key={i}
          className={skeletonClass}
          style={{
            width: i === lines - 1 ? '75%' : '100%',
            height: height || '1rem'
          }}
        />
      ))}
    </div>
  );
};

// Progress bar loader
export const ProgressBar = ({
  progress = 0,
  className,
  color = 'blue',
  size = 'default',
  showPercentage = false,
  animated = false
}) => {
  const sizes = {
    sm: 'h-1',
    default: 'h-2',
    lg: 'h-3'
  };

  const colors = {
    blue: 'bg-blue-600',
    gray: 'bg-gray-600',
    green: 'bg-green-600',
    red: 'bg-red-600',
    yellow: 'bg-yellow-600'
  };

  const clampedProgress = Math.min(Math.max(progress, 0), 100);

  return (
    <div className={cn('w-full', className)}>
      {showPercentage && (
        <div className="flex justify-between text-sm text-gray-600 mb-1">
          <span>Progress</span>
          <span>{Math.round(clampedProgress)}%</span>
        </div>
      )}
      <div className={cn(
        'w-full bg-gray-200 rounded-full overflow-hidden',
        sizes[size]
      )}>
        <div
          className={cn(
            'h-full transition-all duration-300 ease-out',
            colors[color],
            animated && 'bg-gradient-to-r from-current to-current bg-[length:200%_100%] animate-pulse'
          )}
          style={{ width: `${clampedProgress}%` }}
        />
      </div>
    </div>
  );
};

// Button loading state
export const ButtonLoader = ({
  size = 'sm',
  color = 'white',
  className
}) => {
  return (
    <LoadingSpinner
      size={size}
      color={color}
      className={cn('mr-2', className)}
    />
  );
};

export default LoadingSpinner;
