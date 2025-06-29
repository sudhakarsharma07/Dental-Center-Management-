import React from 'react';
import { Stethoscope } from 'lucide-react';

export const Logo: React.FC<{ size?: 'sm' | 'lg' }> = ({ size = 'lg' }) => {
  const iconSize = size === 'sm' ? 20 : 28;
  const textSize = size === 'sm' ? 'text-lg' : 'text-2xl';

  return (
    <div className="flex items-center gap-2">
      <div className="bg-blue-100 p-2 rounded-full shadow-sm">
        <Stethoscope className={`text-blue-700`} width={iconSize} height={iconSize} />
      </div>
      <span className={`${textSize} font-bold text-blue-800`}>
        Dental<span className="text-green-500">Care</span>
      </span>
    </div>
  );
};
