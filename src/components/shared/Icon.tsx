// src/components/shared/Icon.tsx
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { fab } from '@fortawesome/free-brands-svg-icons';

// Add all Font Awesome icons to the library
library.add(fas, fab);

interface IconProps {
  iconClass: string;
  className?: string;
}

const Icon: React.FC<IconProps> = ({ iconClass, className }) => {
  // Convert CSS class names like "fab fa-react" to FontAwesome IconProp
  const getIconProp = (iconClass: string): IconProp => {
    const parts = iconClass.split(' ');
    if (parts.length === 2) {
      const prefix = parts[0] === 'fab' ? 'fab' : 'fas';
      const iconName = parts[1].replace('fa-', '');
      return [prefix, iconName] as IconProp;
    }
    return ['fas', 'question'] as IconProp;
  };

  return (
    <FontAwesomeIcon 
      icon={getIconProp(iconClass)} 
      className={className} 
    />
  );
};

export default Icon;
