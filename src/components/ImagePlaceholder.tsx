import React from 'react';

interface ImagePlaceholderProps {
  label: string;
  piecesCount?: number;
  aspectRatio?: 'square' | 'product' | 'banner';
  src?: string;
  alt?: string;
  className?: string;
}

export const ImagePlaceholder: React.FC<ImagePlaceholderProps> = ({
  label,
  piecesCount,
  aspectRatio = 'product',
  src,
  alt,
  className = '',
}) => {
  const ratioClasses = {
    square: 'aspect-square',
    product: 'aspect-[4/3]',
    banner: 'aspect-[16/9]',
  }[aspectRatio];

  if (src) {
    return (
      <div
        className={`w-full overflow-hidden rounded-md bg-stone-100 border border-stone-200/80 ${ratioClasses} ${className}`}
      >
        <img
          src={src}
          alt={alt || label}
          referrerPolicy="no-referrer"
          className="h-full w-full object-cover object-center"
          loading="lazy"
        />
      </div>
    );
  }

  return (
    <div
      className={`w-full rounded-md bg-[#F4F3F0] border border-stone-200 flex flex-col items-center justify-center p-6 text-center select-none ${ratioClasses} ${className}`}
      role="img"
      aria-label={label}
    >
      <div className="flex items-center justify-center w-12 h-12 rounded-md bg-stone-200/70 text-stone-600 mb-3">
        {/* Minimalist underwear/boxer SVG icon outline */}
        <svg
          className="w-6 h-6 stroke-[1.5]"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          {/* Boxer waistband */}
          <path d="M4 6h16v3H4z" />
          {/* Left leg */}
          <path d="M4 9v9l5 1 3-3" />
          {/* Right leg */}
          <path d="M20 9v9l-5 1-3-3" />
          {/* Center stitch */}
          <path d="M12 9v7" />
        </svg>
      </div>

      <p className="text-xs font-semibold uppercase tracking-wider text-stone-700">
        {label}
      </p>

      {piecesCount && (
        <p className="text-xs text-stone-500 mt-1">
          Lot de {piecesCount} unités
        </p>
      )}

      <span className="mt-2 text-[11px] text-stone-600/90 bg-stone-200/60 px-2 py-0.5 rounded">
        Emplacement photo — Remplaçable
      </span>
    </div>
  );
};
