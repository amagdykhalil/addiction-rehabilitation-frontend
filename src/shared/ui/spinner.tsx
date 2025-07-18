export const Spinner = ({ className }: { className?: string }) => {
  return (
    <div
      className={`w-10 h-10 border-4 border-gray-200 border-t-blue-500 rounded-full animate-spin ${className || ""}`}
    />
  );
};
