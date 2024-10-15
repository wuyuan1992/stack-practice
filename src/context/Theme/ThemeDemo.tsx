import ThemeSelect from '@/components/basic/ThemeSelect';
import Button from '@/components/ui/Button';

function ThemeDemo() {
  return (
    <div className="border rounded-md p-4">
      <ThemeSelect />
      <Button type="primary">Primary</Button>
    </div>
  );
}

export default ThemeDemo;
