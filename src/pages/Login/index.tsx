import { useNavigate } from 'react-router-dom';
import Button from '@/components/ui/Button';

function Login() {
  const navigate = useNavigate();
  return (
    <div>
      <h3>Login</h3>
      <Button onClick={() => navigate('/projects/1')}>项目1</Button>
    </div>
  );
}

export default Login;
