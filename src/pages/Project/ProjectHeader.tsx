import Icon from '@/components/ui/Icon';
import IconButton from '@/components/ui/IconButton';
import { AlarmClock, User } from 'lucide-react';

function ProjectHeader() {
  return (
    <div className="flex items-center justify-between gap-2 p-2">
      <div className="flex gap-2 items-center justify-start">
        <p>title</p>
      </div>

      <div className="flex gap-2 items-center justify-end">
        <IconButton type="text" variant="outlined">
          <Icon icon={<AlarmClock />} />
        </IconButton>
        <IconButton type="text" variant="outlined">
          <Icon icon={<User />} />
        </IconButton>
      </div>
    </div>
  );
}

export default ProjectHeader;
