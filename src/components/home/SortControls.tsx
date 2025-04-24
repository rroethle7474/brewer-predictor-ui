import React from 'react';

interface SortControlsProps {
  sortField: 'name' | 'wins';
  sortDirection: 'asc' | 'desc';
  onSort: (field: 'name' | 'wins') => void;
}

const SortControls: React.FC<SortControlsProps> = ({ 
  sortField, 
  sortDirection, 
  onSort 
}) => {
  const getSortIcon = (field: 'name' | 'wins') => {
    if (sortField !== field) return null;
    
    return sortDirection === 'asc' 
      ? <span className="inline-block ml-1">↑</span> 
      : <span className="inline-block ml-1">↓</span>;
  };
  
  return (
    <div className="flex mb-4 text-sm">
      <span className="mr-2 text-gray-600">Sort by:</span>
      <button
        onClick={() => onSort('name')}
        className={`mr-3 focus:outline-none ${
          sortField === 'name' ? 'font-bold text-brewers-navy' : 'text-gray-600'
        }`}
      >
        Name {getSortIcon('name')}
      </button>
      <button
        onClick={() => onSort('wins')}
        className={`focus:outline-none ${
          sortField === 'wins' ? 'font-bold text-brewers-navy' : 'text-gray-600'
        }`}
      >
        Predicted Wins {getSortIcon('wins')}
      </button>
    </div>
  );
};

export default SortControls;