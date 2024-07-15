// fragments/article.ts
// fragments/article.ts
const articleFragment = /* GraphQL */ `
  fragment article on Article {
    id
    title
    handle
    excerpt(truncateAt: 500)
    contentHtml
    authorV2 {
      name
    }
    image {
      url
    }
    seo {
      description
      title
    }
    blog {
      handle
    }
    publishedAt
    metafield(key: "promo", namespace: "global") {
      value
      type
      reference {
        ... on Product {
          id
          title
          handle
        }
      }
    }
  }
`;

export default articleFragment;
