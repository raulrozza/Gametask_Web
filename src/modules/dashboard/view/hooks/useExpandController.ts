import { useCallback, useState } from 'react';
import { FaSortUp, FaSortDown } from 'react-icons/fa';
import { IconType } from 'react-icons/lib';

interface UseExpandController {
  expanded: boolean;
  toggleExpand(): void;
  legend: string;
  Icon: IconType;
}

export default function useExpandController(): UseExpandController {
  const [expanded, setExpanded] = useState(false);

  const legend = expanded ? 'Contrair' : 'Expandir';

  const Icon = expanded ? FaSortUp : FaSortDown;

  const toggleExpand = useCallback(
    () => setExpanded(expanded => !expanded),
    [],
  );

  return { expanded, toggleExpand, legend, Icon };
}
