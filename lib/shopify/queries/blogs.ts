import articleFragment from '../fragments/blog';

export const getArticleQuery = /* GraphQL */ `
  query getSingleArticle($id: ID!) {
    article(id: $id) {
      ...article
    }
  }
  ${articleFragment}
`;

export const getLatestArticlesQuery = /* GraphQL */ `
  query getLatestArticles {
    articles(reverse: true, first: 4) {
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
