// src/components/ui/card.tsx
import React from 'react';
import classNames from 'classnames';

// Card container
export const Card: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ className, children, ...props }) => {
  return (
    <div
      className={classNames(
        'bg-white rounded-2xl shadow p-6',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

// CardHeader for title and actions
export const CardHeader: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ className, children, ...props }) => {
  return (
    <div
      className={classNames(
        'mb-4 flex items-center justify-between',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

// CardTitle for headings
export const CardTitle: React.FC<React.HTMLAttributes<HTMLHeadingElement>> = ({ className, children, ...props }) => {
  return (
    <h3
      className={classNames(
        'text-lg font-semibold text-gray-700',
        className
      )}
      {...props}
    >
      {children}
    </h3>
  );
};

// CardContent for body
export const CardContent: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ className, children, ...props }) => {
  return (
    <div
      className={classNames(
        'text-gray-600',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};
