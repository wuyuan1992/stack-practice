import ResizableGrid from '.';

function ResizableGridDemo() {
  return (
    <div
      className="border"
      style={{
        width: 400,
        height: 300,
      }}
    >
      <ResizableGrid key="grid-1">
        <div>left</div>

        <ResizableGrid key="grid-2" vertical maxFirstSize={120}>
          <div>right-top</div>
          <div>right-bottom</div>
        </ResizableGrid>
      </ResizableGrid>
    </div>
  );
}

export default ResizableGridDemo;
