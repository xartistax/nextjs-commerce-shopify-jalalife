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

    metafields(
      identifiers: [
        { key: "custom_author", namespace: "custom" }
        { key: "promo", namespace: "custom" }
      ]
    ) {
      value
      type
      reference {
        ... on Product {
          handle
        }
        ... on Page {
          handle
        }
      }
    }
  }
`;

export default articleFragment;
