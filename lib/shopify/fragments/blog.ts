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

    metafield(key: "custom_author", namespace: "custom") {
      value
      type
    }
  }
`;

export default articleFragment;
