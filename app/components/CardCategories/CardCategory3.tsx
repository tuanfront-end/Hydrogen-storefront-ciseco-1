import React, {type FC} from 'react';
import {CATS_DISCOVER} from './data';
import {Link} from '../link';
import {Image} from '@shopify/hydrogen';
import ButtonSecondary from '../Button/ButtonSecondary';

export interface CardCategory3Props {
  className?: string;
  featuredImage?: string;
  name?: string;
  desc?: string;
  color?: string;
}

const CardCategory3: FC<CardCategory3Props> = ({
  className = '',
  featuredImage = CATS_DISCOVER[2].featuredImage,
  name = CATS_DISCOVER[2].name,
  desc = CATS_DISCOVER[2].desc,
  color = CATS_DISCOVER[2].color,
}) => {
  return (
    <Link
      href={'/collection'}
      className={`nc-CardCategory3 block ${className}`}
    >
      <div
        className={`relative w-full aspect-w-16 aspect-h-11 sm:aspect-h-9 h-0 rounded-2xl overflow-hidden group ${color}`}
      >
        <div>
          <div className="absolute inset-5 sm:inset-8">
            <div className="absolute end-0 w-1/2 max-w-[260px] h-full object-contain drop-shadow-xl">
              <Image
                alt=""
                data={{
                  url: 'https://cdn.shopify.com/s/files/1/0688/4927/1039/products/Main_b9e0da7f-db89-4d41-83f0-7f417b02831d.jpg?v=1709178217',
                  with: 800,
                  height: 1000,
                }}
              />
            </div>
          </div>
        </div>
        <span className="opacity-0 group-hover:opacity-40 absolute inset-0 bg-black/10 transition-opacity"></span>

        <div>
          <div className="absolute inset-5 sm:inset-8 flex flex-col">
            <div className="max-w-xs">
              <span className={`block mb-2 text-sm text-slate-700`}>
                {name}
              </span>
              {desc && (
                <h2
                  className={`text-xl md:text-2xl text-slate-900 font-semibold`}
                  dangerouslySetInnerHTML={{__html: desc}}
                ></h2>
              )}
            </div>
            <div className="mt-auto">
              <ButtonSecondary
                sizeClass="py-3 px-4 sm:py-3.5 sm:px-6"
                fontSize="text-sm font-medium"
                className="nc-shadow-lg"
              >
                Show me all
              </ButtonSecondary>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default CardCategory3;
