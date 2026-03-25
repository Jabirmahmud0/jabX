export default function SkeletonCard({ size = 'normal' }) {
  const h = size === 'large' ? 'h-[500px]' : size === 'tall' ? 'h-[600px] md:h-full' : 'h-[400px]';
  return (
    <div className={`w-full ${h} rounded-2xl bg-border-subtle animate-pulse border border-border-subtle relative overflow-hidden`} />
  );
}
