import productFragment from '../fragments/product';

export const getProductQuery = /* GraphQL */ `
  query getProduct($handle: String!) {
    product(handle: $handle) {
      ...product
    }
  }
  ${productFragment}
`;

export const getProductsQuery = /* GraphQL */ `
  query getProducts($sortKey: ProductSortKeys, $reverse: Boolean, $query: String) {
    products(sortKey: $sortKey, reverse: $reverse, query: $query, first: 100) {
      edges {
        node {
          ...product
        }
      }
    }
  }
  ${productFragment}
`;

export const getProductRecommendationsQuery = /* GraphQL */ `
  query getProductRecommendations($productId: ID!) {
    productRecommendations(productId: $productId) {
      ...product
    }
  }
  ${productFragment}
`;

export const getProductMetafieldsQuery = /* GraphQL */ `
  query getProductMetafieldQuery($handle: String!, $key: String!, $namespace: String!) {
    productByHandle(handle: $handle) {
      metafield(key: $key, namespace: $namespace) {
        key
        value
      }
    }
  }
`;

export const getProductByIdQuery = /* GraphQL */ `
  query getProductByIdQuery($id: ID!) {
    product(id: $id) {
      ...product
    }
  }
  ${productFragment}
`;
