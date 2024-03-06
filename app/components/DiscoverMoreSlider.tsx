import {useRef} from 'react';
import Heading from './Heading/Heading';
import CardCategory3 from './CardCategories/CardCategory3';
import {CATS_DISCOVER} from './CardCategories/data';
import useSnapSlider from '~/hooks/useSnapSlider';

const DiscoverMoreSlider = () => {
  const sliderRef = useRef<HTMLDivElement>(null);
  const {scrollToNextSlide, scrollToPrevSlide} = useSnapSlider({sliderRef});

  return (
    <div className={`nc-DiscoverMoreSlider `}>
      <Heading
        className="mb-12 lg:mb-14 text-neutral-900 dark:text-neutral-50 container"
        desc=""
        rightDescText="Good things are waiting for you"
        hasNextPrev
        onClickNext={scrollToNextSlide}
        onClickPrev={scrollToPrevSlide}
      >
        Discover more
      </Heading>
      <div className="">
        <div
          ref={sliderRef}
          className="relative w-full flex gap-4 sm:gap-8 snap-x snap-mandatory overflow-x-auto scroll-p-l-container hiddenScrollbar"
        >
          <div className="w-0 nc-p-l-container"></div>
          {CATS_DISCOVER.map((item, index) => (
            <div
              key={`${index + 1}`}
              className="mySnapItem snap-start shrink-0 last:pr-4 lg:last:pr-10"
            >
              <div className="bg-black w-64 sm:w-96 lg:w-[28rem] xl:w-[34.5rem] flex ">
                <CardCategory3
                  name={item.name}
                  desc={item.desc}
                  featuredImage={
                    'https://cdn.shopify.com/s/files/1/0688/4927/1039/products/Main_b9e0da7f-db89-4d41-83f0-7f417b02831d.jpg?v=1709178217'
                  }
                  color={item.color}
                  className="w-full h-full"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DiscoverMoreSlider;
