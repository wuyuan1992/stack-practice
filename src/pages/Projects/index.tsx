import { useNavigate } from 'react-router-dom';
import Button from '@/components/ui/Button';

function Projects() {
  const navigate = useNavigate();
  return (
    <div>
      <Button onClick={() => navigate('/projects/1')}>项目1</Button>
      <Button onClick={() => navigate('/projects/2')}>项目2</Button>
      <Button onClick={() => navigate('/projects/3')}>项目3</Button>
    </div>
  );
}

export default Projects;
