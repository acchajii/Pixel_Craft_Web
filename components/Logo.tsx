export default function Logo({ size = 32 }: { size?: number }) {
  // P built from pixel blocks: stem, bowl, and one detached "pixel".
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" role="img" aria-label="PixelCraft logo">
      <rect x="4" y="4" width="8" height="24" rx="1.5" fill="#2F6BFF" />
      <rect x="14" y="4" width="10" height="8" rx="1.5" fill="#2F6BFF" />
      <rect x="14" y="14" width="10" height="8" rx="1.5" fill="#2F6BFF" opacity=".55" />
      <rect x="26" y="9" width="4" height="4" rx="1" fill="#E8ECF4" />
    </svg>
  );
}
