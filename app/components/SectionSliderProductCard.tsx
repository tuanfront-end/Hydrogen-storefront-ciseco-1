import React, {type FC, useEffect, useId, useRef, useState} from 'react';
import Heading from '@/components/Heading/Heading';
import ProductCard, {type TProduct} from './ProductCard';
import useSnapSlider from '~/hooks/useSnapSlider';

export interface SectionSliderProductCardProps {
  className?: string;
  itemClassName?: string;
  heading?: string;
  headingFontClassName?: string;
  headingClassName?: string;
  subHeading?: string;
  data?: TProduct[];
}

const SectionSliderProductCard: FC<SectionSliderProductCardProps> = ({
  className = '',
  itemClassName = '',
  headingFontClassName,
  headingClassName = 'mb-12 lg:mb-14 text-neutral-900 dark:text-neutral-50 container',
  heading,
  subHeading = 'REY backpacks & bags',
  data = [],
}) => {
  const sliderRef = useRef<HTMLDivElement>(null);
  const {scrollToNextSlide, scrollToPrevSlide} = useSnapSlider({sliderRef});

  return (
    <div className={`nc-SectionSliderProductCard  ${className}`}>
      <div className={`  `}>
        <Heading
          className={headingClassName}
          fontClass={headingFontClassName}
          rightDescText={subHeading}
          hasNextPrev
          onClickNext={scrollToNextSlide}
          onClickPrev={scrollToPrevSlide}
        >
          {heading || `New Arrivals`}
        </Heading>
        <div
          ref={sliderRef}
          className="relative w-full flex gap-4 sm:gap-8 snap-x snap-mandatory overflow-x-auto scroll-p-l-container hiddenScrollbar"
        >
          <div className="w-0 nc-p-l-container"></div>
          {data.map((item, index) => (
            <div
              key={index}
              className={`mySnapItem mySnapItem snap-start shrink-0 w-64 sm:w-96 lg:w-[18.5rem] flex  ${itemClassName} `}
            >
              <ProductCard className="w-full" data={item} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SectionSliderProductCard;
