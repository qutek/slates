import useApp from "@frontend/hooks/useApp";

export default function TextInput({ className }: { className: string }) {
  const { inputRef } = useApp();
  return (
    <textarea
      ref={inputRef}
      className={className}
      placeholder="Enter text..."
    ></textarea>
  );
}
