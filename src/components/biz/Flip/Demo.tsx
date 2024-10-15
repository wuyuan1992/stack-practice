import { useState } from 'react';
import Flip from './index';
import Button from '@/components/ui/Button';

function FlipDemo() {
  const [start, setStart] = useState(0);
  const [end, setEnd] = useState(10);
  const [step, setStep] = useState(1);

  const [preview, setPreview] = useState(false);

  return (
    <div className="mb-8 w-[240px]">
      <div className="flex items-center gap-4">
        <input
          type="range"
          key="max"
          value={start}
          onChange={(e) => setStart(parseInt(e.target.value, 10))}
          min={0}
          max={end}
          step={1}
          disabled={preview}
        />
        <div>start: {start}</div>
      </div>
      <div className="flex items-center gap-4">
        <input
          type="range"
          key="max"
          value={end}
          onChange={(e) => setEnd(parseInt(e.target.value, 10))}
          min={start}
          max={100}
          step={1}
          disabled={preview}
        />
        <div>end: {end}</div>
      </div>

      <div className="flex items-center gap-4">
        <input
          type="range"
          key="max"
          value={step}
          onChange={(e) => setStep(parseInt(e.target.value, 10))}
          min={0}
          max={10}
          step={1}
          disabled={preview}
        />
        <div>step: {step}</div>
      </div>

      <Button onClick={() => setPreview((prev) => !prev)}>{preview ? `End` : `Start`}</Button>

      {preview && (
        <>
          <Flip key="forwards" start={start} end={end} step={step} />
          <Flip key="backwards" start={start} end={end} step={step} backwards />
        </>
      )}
    </div>
  );
}

export default FlipDemo;
