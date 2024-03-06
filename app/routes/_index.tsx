import {defer, type LoaderFunctionArgs} from '@shopify/remix-oxygen';
import {Await, useLoaderData, Link, type MetaFunction} from '@remix-run/react';
import {Suspense} from 'react';
import {Image, Money} from '@shopify/hydrogen';
import type {
  FeaturedCollectionFragment,
  RecommendedProductsQuery,
} from 'storefrontapi.generated';
import {PAGE_QUERY} from './pages.$handle';
import SectionHero2 from '~/components/SectionHero/SectionHero2';
import DiscoverMoreSlider from '~/components/DiscoverMoreSlider';
import SectionSliderProductCard from '~/components/SectionSliderProductCard';
import ProductCard from '~/components/ProductCard';

export const meta: MetaFunction = () => {
  return [{title: 'Hydrogen | Home'}];
};

export async function loader({context}: LoaderFunctionArgs) {
  const {storefront} = context;
  const {collections} = await storefront.query(FEATURED_COLLECTION_QUERY);
  const featuredCollection = collections.nodes[0];
  const recommendedProducts = storefront.query(RECOMMENDED_PRODUCTS_QUERY);

  //

  const {page} = await context.storefront.query(PAGE_QUERY, {
    variables: {
      handle: 'home',
    },
  });

  return defer({featuredCollection, recommendedProducts, page});
}

export default function Homepage() {
  const data = useLoaderData<typeof loader>();

  return (
    <div className="home relative">
      <SectionHero2 />

      <div className="mt-24 lg:mt-32">
        <DiscoverMoreSlider />
        <div className="mt-24 lg:mt-32">
          <RecommendedProducts products={data.recommendedProducts} />
        </div>
      </div>

      <div className="container relative space-y-24 my-24 lg:space-y-32 lg:my-32">
        <RecommendedProducts products={data.recommendedProducts} />
      </div>

      <h1>Featured collection</h1>
      <FeaturedCollection collection={data.featuredCollection} />
      <hr />
    </div>
  );
}

function FeaturedCollection({
  collection,
}: {
  collection: FeaturedCollectionFragment;
}) {
  if (!collection) return null;
  const image = collection?.image;
  return (
    <Link
      className="featured-collection"
      to={`/collections/${collection.handle}`}
    >
      {image && (
        <div className="featured-collection-image">
          <Image data={image} sizes="100vw" />
        </div>
      )}
      <h1>{collection.title}</h1>
    </Link>
  );
}

function RecommendedProducts({
  products,
}: {
  products: Promise<RecommendedProductsQuery>;
}) {
  return (
    <div className="recommended-products">
      <h2>Recommended Products</h2>
      <Suspense fallback={<div>Loading...</div>}>
        <Await resolve={products}>
          {({products}) => (
            // <div className="recommended-products-grid">
            //   {products.nodes.map((product) => (
            //     <ProductCard key={product.id} data={product} />
            //     // <Link
            //     //   key={product.id}
            //     //   className="recommended-product"
            //     //   to={`/products/${product.handle}`}
            //     // >
            //     //   <Image
            //     //     data={{
            //     //       ...product.images.nodes[0],
            //     //     }}
            //     //     aspectRatio="1/1"
            //     //     sizes="(min-width: 45em) 20vw, 50vw"
            //     //   />
            //     //   <h4>{product.title}</h4>
            //     //   <small>
            //     //     <Money data={product.priceRange.minVariantPrice} />
            //     //   </small>
            //     // </Link>
            //   ))}
            // </div>

            <SectionSliderProductCard data={products.nodes} />
          )}
        </Await>
      </Suspense>
      <br />
    </div>
  );
}

const FEATURED_COLLECTION_QUERY = `#graphql
  fragment FeaturedCollection on Collection {
    id
    title
    image {
      id
      url
      altText
      width
      height
    }
    handle
  }
  query FeaturedCollection($country: CountryCode, $language: LanguageCode)
    @inContext(country: $country, language: $language) {
    collections(first: 1, sortKey: UPDATED_AT, reverse: true) {
      nodes {
        ...FeaturedCollection
      }
    }
  }
` as const;

const RECOMMENDED_PRODUCTS_QUERY = `#graphql
  fragment RecommendedProduct on Product {
    id
    title
    handle
    description
    priceRange {
      minVariantPrice {
        amount
        currencyCode
      }
    }
    images(first: 1) {
      nodes {
        id
        url
        altText
        width
        height
      }
    }
  }
  query RecommendedProducts ($country: CountryCode, $language: LanguageCode)
    @inContext(country: $country, language: $language) {
    products(first: 4, sortKey: UPDATED_AT, reverse: true) {
      nodes {
        ...RecommendedProduct
      }
    }
  }
` as const;
