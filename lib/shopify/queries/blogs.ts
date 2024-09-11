import articleFragment from '../fragments/blog';

export const getLatestArticlesQuery = /* GraphQL */ `
  query getLatestArticles {
    articles(first: 4, reverse: true) {
      edges {
        node {
          ...article
        }
      }
    }
  }
  ${articleFragment}
`;

export const getArticleByHandleQuery = /* GraphQL */ `
  query GetArticleByHandle($blogHandle: String!, $articleHandle: String!) {
    blog(handle: $blogHandle) {
      articleByHandle(handle: $articleHandle) {
        ...article
      }
    }
  }
  ${articleFragment}
`;
