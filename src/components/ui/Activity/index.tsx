import { FC, PropsWithChildren, Suspense, useEffect, useRef } from 'react';

const ActivityInner: FC<PropsWithChildren<{ visible?: boolean }>> = ({ visible = false, children }) => {
  // Refs to hold promise and its resolver
  const promiseRef = useRef<Promise<void> | null>(null);
  const resolveRef = useRef<(() => void) | null>(null);

  // Function to resolve the promise
  const resolvePromise = () => {
    if (typeof resolveRef.current === 'function') {
      resolveRef.current();
      resolveRef.current = null;
      promiseRef.current = null;
    }
  };

  // Clean up the promise on unmount
  useEffect(() => () => resolvePromise(), []);

  if (!visible) {
    // If not visible, create a new promise to pause rendering
    if (resolveRef.current === null) {
      promiseRef.current = new Promise((resolve) => {
        resolveRef.current = resolve;
      });
    }
    const promise = promiseRef.current;
    throw promise;
  }

  // Resolve the promise if visible
  resolvePromise();

  return <>{children}</>;
};

const Activity: FC<PropsWithChildren<{ visible?: boolean }>> = ({ visible = false, children }) => {
  return (
    <Suspense fallback={null}>
      <ActivityInner visible={visible}>{children}</ActivityInner>
    </Suspense>
  );
};

export default Activity;
