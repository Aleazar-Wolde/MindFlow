// src/components/ui/stat-card.tsx
import React from 'react';
import { Card } from './card';
import classNames from 'classnames';

export interface StatCardProps {
  icon: React.ReactNode;
  label: string;
  value: number;
  delta?: number;        // percentage change
  deltaPositive?: boolean; // true for green 'up', false for red 'down'
}

export const StatCard: React.FC<StatCardProps> = ({ icon, label, value, delta, deltaPositive }) => {
  const deltaClass = deltaPositive ? 'text-green-500' : 'text-red-500';

  return (
    <Card className="flex items-center space-x-4 p-4">
      <div className="p-3 rounded-full bg-indigo-100 text-indigo-600">
        {icon}
      </div>
      <div>
        <p className="text-sm font-medium text-gray-500">{label}</p>
        <p className="text-2xl font-bold text-gray-800">{value}</p>
        {delta !== undefined && (
          <p className={classNames('text-xs font-medium', deltaClass)}>
            {deltaPositive ? '+' : '-'}{Math.abs(delta)}% vs yesterday
          </p>
        )}
      </div>
    </Card>
  );
};
