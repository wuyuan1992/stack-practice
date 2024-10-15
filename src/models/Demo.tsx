import { useCallback } from 'react';
import Icon from '@/components/ui/Icon';
import Button from '@/components/ui/Button';
import { useDispatch as useZooDispatch, useStore as useZooStore, ZooAction, fetchAndSetBear } from '@/models/zoo';
import IconButton from '@/components/ui/IconButton';
import { CircleMinus, CirclePlus } from 'lucide-react';

function ModelDemo() {
  const dispatch = useZooDispatch();

  const { bear: bearCount } = useZooStore((state) => state.zoo);

  const init = useCallback(async () => {
    const count = await fetchAndSetBear();
    console.log(count);
  }, []);

  return (
    <div className="flex gap-4 items-center">
      <Button onClick={init}> Reset </Button>

      <IconButton key="plus" onClick={() => dispatch({ type: ZooAction.INCREASE })}>
        <Icon icon={<CirclePlus />} />
      </IconButton>

      <span className="inline-block w-4 text-center">{bearCount}</span>

      <IconButton key="minus" onClick={() => dispatch({ type: ZooAction.DECREASE })}>
        <Icon icon={<CircleMinus />} />
      </IconButton>
    </div>
  );
}

export default ModelDemo;
