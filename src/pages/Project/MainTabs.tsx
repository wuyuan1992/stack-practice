import { useMainTab } from '@/context/InternalRouter/hooks';
import { MainTabRoute, MainTabMap } from '@/constants/routes/internalRoutes';
import { useEffect, useMemo, useState } from 'react';
import { ErrorBoundary } from '@/components/basic/ErrorBoundary';
import ApiTabs from '../Apis/ApiTabs';
import TestScenarioTabs from '../TestScenarios/TestScenarioTabs';
import ResizableGrid from '@/components/basic/ResizableGrid';
import Activity from '@/components/ui/Activity';
import Button from '@/components/ui/Button';

function MainTabs() {
  const { tab: mainTab, updateTab: updateMainTab } = useMainTab();

  const [activeTab, setActiveTab] = useState(mainTab || MainTabMap[MainTabRoute.API_TAB].key);
  const [loadedTabs, setLoadedTabs] = useState<Set<string>>(new Set());

  useEffect(() => {
    if (mainTab) setActiveTab(mainTab);
  }, [mainTab]);

  useEffect(() => {
    setLoadedTabs((prev) => new Set([...prev, activeTab]));
  }, [activeTab]);

  const tabs = useMemo(() => {
    return [
      {
        key: MainTabMap[MainTabRoute.API_TAB].key,
        name: MainTabMap[MainTabRoute.API_TAB].name,
        content: (
          <ErrorBoundary message="Api-Manage-Error">
            <ApiTabs />
          </ErrorBoundary>
        ),
      },
      {
        key: MainTabMap[MainTabRoute.TEST_TAB].key,
        name: MainTabMap[MainTabRoute.TEST_TAB].name,
        content: (
          <ErrorBoundary message="Test-Manage-Error">
            <TestScenarioTabs />
          </ErrorBoundary>
        ),
      },
    ];
  }, []);

  return (
    <div className="w-full h-full overflow-hidden">
      <ResizableGrid initialFirstSize={120} minFirstSize={120} maxFirstSize={360}>
        <div className="flex w-full flex-col gap-2 p-2">
          {tabs.map(({ key, name }) => (
            <Button key={key} onClick={() => updateMainTab(key)}>
              {name}
            </Button>
          ))}
        </div>
        <div className="w-full h-full p-2">
          {tabs
            .filter((tab) => loadedTabs.has(tab.key))
            .map(({ key, content }) => (
              <Activity key={key} visible={key === activeTab}>
                {content}
              </Activity>
            ))}
        </div>
      </ResizableGrid>
    </div>
  );
}

export default MainTabs;
