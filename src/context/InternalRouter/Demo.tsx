import { useNavigate } from 'react-router-dom';
import { useNavigateToApi, useNavigateToTest } from '@/context/InternalRouter/hooks';
import Button from '@/components/ui/Button';

function RouterDemo() {
  const navigateToApi = useNavigateToApi();
  const navigateToTest = useNavigateToTest();
  const navigate = useNavigate();

  return (
    <div>
      <div className="flex gap-4">
        <Button onClick={() => navigate('/login')}>登录</Button>
        <Button onClick={() => navigate('/projects')}>项目列表</Button>
      </div>

      <div className="flex gap-4">
        <Button onClick={() => navigateToApi(1, 1)}>跳转 api-1</Button>
        <Button onClick={() => navigateToApi(2, 1)}>跳转 api-2</Button>
        <Button onClick={() => navigateToTest(1, 1)}>跳转 test-1</Button>
        <Button onClick={() => navigateToTest(2, 1)}>跳转 test-2</Button>
      </div>
    </div>
  );
}

export default RouterDemo;
