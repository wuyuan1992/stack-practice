import { useEffect, useMemo, useState } from 'react';
import { useApiTab } from '@/context/InternalRouter/hooks';
import Api from './Api';
import Button from '@/components/ui/Button';
import Activity from '@/components/ui/Activity';

function ApiTabs() {
  const { tab: apiTab, updateTab: updateApiTab } = useApiTab();

  const [activeTab, setActiveTab] = useState<string>();
  const [loadedTabs, setLoadedTabs] = useState<Set<string>>(new Set());

  useEffect(() => {
    if (apiTab) setActiveTab(apiTab);
  }, [apiTab]);

  useEffect(() => {
    if (!activeTab) return;
    setLoadedTabs((prev) => new Set([...prev, activeTab]));
  }, [activeTab]);

  const apiTabs = useMemo(() => {
    return [
      {
        key: '1',
        name: '接口 1',
        content: <Api key="111" id={1} />,
      },
      {
        key: '2',
        name: '接口 2',
        content: <Api key="222" id={2} />,
      },
    ];
  }, []);

  return (
    <div className="w-full h-full flex flex-col">
      <div className="flex w-full gap-2">
        {apiTabs.map(({ key, name }) => (
          <Button key={key} onClick={() => updateApiTab(key)}>
            {name}
          </Button>
        ))}
      </div>
      <div className="w-full flex-1 overflow-auto scroll-element">
        {apiTabs
          .filter((tab) => loadedTabs.has(tab.key))
          .map(({ key, content }) => (
            <Activity visible={key === activeTab} key={key}>
              {content}
            </Activity>
          ))}
      </div>
    </div>
  );
}

export default ApiTabs;
