import { useMemo } from 'react';
import { useTestTab } from '@/context/InternalRouter/hooks';
import BizTabs from '@/components/ui/Tabs';

function TestScenarioTabs() {
  const { tab: testTab, updateTab: updateTestTab } = useTestTab();

  const testTabs = useMemo(() => {
    return [
      {
        key: '1',
        name: '测试 1',
        content: <div style={{ width: 800, height: 600, border: '1px solid #ddd' }}>测试 1</div>,
      },
      {
        key: '2',
        name: '测试 2',
        content: <div style={{ width: 800, height: 600, border: '1px solid #ddd' }}>测试 2</div>,
      },
    ];
  }, []);

  return <BizTabs tabs={testTabs} value={testTab || String(testTabs[0].key)} onChange={updateTestTab} />;
}

export default TestScenarioTabs;
