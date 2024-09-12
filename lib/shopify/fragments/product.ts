import imageFragment from './image';
import seoFragment from './seo';

const productFragment = /* GraphQL */ `
  fragment product on Product {
    id
    handle
    availableForSale
    title
    description
    descriptionHtml
    options {
      id
      name
      values
    }
    priceRange {
      maxVariantPrice {
        amount
        currencyCode
      }
      minVariantPrice {
        amount
        currencyCode
      }
    }
    compareAtPriceRange {
      maxVariantPrice {
        amount
        currencyCode
      }
      minVariantPrice {
        amount
        currencyCode
      }
    }
    variants(first: 250) {
      edges {
        node {
          id
          title
          availableForSale
          selectedOptions {
            name
            value
          }
          price {
            amount
            currencyCode
          }
        }
      }
    }
    featuredImage {
      ...image
    }
    images(first: 20) {
      edges {
        node {
          ...image
        }
      }
    }
    seo {
      ...seo
    }
    tags
    updatedAt

    # Fetch multiple metafields
    metafields(
      identifiers: [
        { key: "sub_title", namespace: "custom" }
        { key: "truncated_product_text", namespace: "custom" }
        { key: "reviews", namespace: "rating_count" }
        { key: "associated_products", namespace: "custom" }
      ]
    ) {
      key
      namespace
      value
    }
  }
  ${imageFragment}
  ${seoFragment}
`;

export default productFragment;
