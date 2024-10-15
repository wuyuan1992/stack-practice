import React, { ReactNode, useState, useEffect, useMemo, FC, PropsWithChildren } from 'react';
import clsx from 'clsx';
import Activity from '@/components/ui/Activity';
import Button from '@/components/ui/Button';

interface TabPane {
  key: string;
  name: string;
  content: ReactNode;
}

interface TabsProps {
  tabs: TabPane[];
  value: string;
  onChange: (key: string) => void;
  vertical?: boolean;
}

const TabButton: FC<
  PropsWithChildren<{
    isActive: boolean;
    onClick: () => void;
  }>
> = ({ children, isActive, onClick }) => {
  return (
    <Button
      className={clsx(
        'inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
        isActive
          ? 'bg-background text-foreground shadow-sm'
          : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground',
      )}
      onClick={onClick}
    >
      {children}
    </Button>
  );
};

const BizTabs: React.FC<TabsProps> = ({ tabs, value, onChange, vertical = false }) => {
  const [activeTab, setActiveTab] = useState(value);
  const [loadedTabs, setLoadedTabs] = useState<Set<string>>(new Set([value]));

  useEffect(() => {
    if (value !== undefined) {
      setActiveTab(value);
      setLoadedTabs((prev) => new Set([...prev, value]));
    }
  }, [value]);

  const triggers = useMemo(() => {
    return tabs.map(({ key, name }) => (
      <TabButton key={key} isActive={key === value} onClick={() => onChange(key)}>
        {name}
      </TabButton>
    ));
  }, [tabs, activeTab]);

  const content = useMemo(() => {
    return tabs
      .filter((tab) => loadedTabs.has(tab.key))
      .map(({ key, content }) => (
        <Activity visible={key === activeTab} key={key}>
          {content}
        </Activity>
      ));
  }, [tabs, activeTab, loadedTabs]);

  return (
    <div className={clsx('w-full max-h-full flex gap-4', vertical ? 'flex-row' : 'flex-col')}>
      <div className={clsx('flex max-w-full w-[400px] gap-2', vertical ? 'flex-col' : 'flex-row')}>{triggers}</div>
      <div className="w-full">{content}</div>
    </div>
  );
};

export default BizTabs;
