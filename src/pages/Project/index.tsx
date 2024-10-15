import InternalRouterContextProvider from '@/context/InternalRouter/Provider';
import MainTabMap from './MainTabs';
import ProjectHeader from './ProjectHeader';

function Project() {
  return (
    <InternalRouterContextProvider>
      <div className="w-screen h-screen overflow-hidden flex flex-col">
        <ProjectHeader />
        <div className="flex flex-1 items-stretch justify-stretch">
          <MainTabMap />
        </div>
      </div>
    </InternalRouterContextProvider>
  );
}

export default Project;
