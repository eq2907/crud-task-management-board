import { AvaStackedData } from '../utils/AvaStackedData';
import type { Avatar } from '../types/Avatar';
import { Plus } from 'lucide-react';

interface AvaStackedProps {
  /** If provided, only renders avatars with these IDs from the pool */
  assigneeIds?: number[];
  /** Maximum avatars to show before showing +N indicator */
  maxVisible?: number;
  size?: 'sm' | 'md';
}

function AvaStacked({ assigneeIds, maxVisible = 3, size = 'sm' }: AvaStackedProps) {
  const pool: Avatar[] = assigneeIds
    ? AvaStackedData.filter((a) => assigneeIds.includes(a.id))
    : AvaStackedData;

  const visible = pool.slice(0, maxVisible);
  const overflow = pool.length - visible.length;

  return (
    <div className={`avatar-stacked avatar-stacked--${size}`}>
      {visible.map((data: Avatar) => (
        <img key={data.id} src={data.avaimg} alt="User Avatar" />
      ))}
      {overflow > 0 && (
        <div className="avatar-stacked__text">{overflow}+</div>
      )}
      <button className="btn-team-add btn btn--gray" type="button" aria-label="Add team member">
        <Plus size={20} />
      </button>
    </div>
  );
}

export { AvaStacked };