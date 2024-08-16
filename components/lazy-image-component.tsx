// Separate file: LazyImageComponent.js
import Image from 'next/image';
import indisch from '../public/indisch.png';

export default function LazyImage({ isXs, isMdUp, isLgUp }) {
  return (
    <Image
      src={indisch}
      alt="Indischer Weihrauch mit Zink"
      loading="eager"
      objectFit="contain"
      priority
      style={{
        height: isXs ? '380px' : isLgUp ? '420px' : 'auto',
        width: 'auto',
        position: 'absolute',
        bottom: 0,
        right: isMdUp ? '10%' : 'unset',
        left: isXs ? '50%' : 'unset',
        transform: isXs ? 'translate(-50%, 0%)' : 'unset',
        zIndex: 1,
        maxWidth: '100%' // Ensure it doesn't exceed parent container width
      }}
      width={500}
      height={500}
    />
  );
}
