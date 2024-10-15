export type Maybe<T> = T | null;

export type Connection<T> = {
  edges: Array<Edge<T>>;
};

export type Edge<T> = {
  node: T;
};

export type Cart = Omit<ShopifyCart, 'lines'> & {
  lines: CartItem[];
};

export type CartItem = {
  id: string;
  quantity: number;
  cost: {
    totalAmount: Money;
    comparedAmount: Money;
  };
  merchandise: {
    id: string;
    title: string;
    selectedOptions: {
      name: string;
      value: string;
    }[];
    product: Product;
  };
};

export type Collection = ShopifyCollection & {
  path: string;
};

export type Image = {
  url: string;
  altText: string;
  width: number;
  height: number;
};

export type MenuItem = {
  title: string;
  path: string;
};

export type Menu = {
  title: string;
  path: string;
  items?: MenuItem[]; // Optional array of sub-menu items
};

export type Money = {
  amount: string;
  currencyCode: string;
};

export type Page = {
  id: string;
  title: string;
  handle: string;
  body: string;
  bodySummary: string;
  seo?: SEO;
  createdAt: string;
  updatedAt: string;
};

export type Metafield = {
  value: string; // Assuming the value is always a string, can be changed to 'any' if it's dynamic.
  // Optional field for metafield type
};

export type Product = Omit<ShopifyProduct, 'variants' | 'images'> & {
  variants: ProductVariant[];
  images: Image[];
  metafields: Metafield[];
};

export type ProductOption = {
  id: string;
  name: string;
  values: string[];
};

export type ProductVariant = {
  id: string;
  title: string;
  availableForSale: boolean;
  selectedOptions: {
    name: string;
    value: string;
  }[];
  price: Money;
};

export type SEO = {
  title: string;
  description: string;
};

export type ShopifyCart = {
  id: string;
  checkoutUrl: string;
  cost: {
    subtotalAmount: Money;
    totalAmount: Money;
    totalTaxAmount: Money;
    comparedAmount: Money;
  };
  lines: Connection<CartItem>;
  totalQuantity: number;
};

export type ShopifyCollection = {
  handle: string;
  title: string;
  description: string;
  image?: {
    url: string; // Change to an object that includes a url
  };
  seo: SEO;
  updatedAt: string;
};

export type ShopifyProduct = {
  id: string;
  handle: string;
  availableForSale: boolean;
  title: string;
  description: string;
  descriptionHtml: string;
  options: ProductOption[];
  priceRange: {
    maxVariantPrice: Money;
    minVariantPrice: Money;
  };
  compareAtPriceRange: {
    maxVariantPrice: Money;
    minVariantPrice: Money;
  };
  variants: Connection<ProductVariant>;
  featuredImage: Image;
  images: Connection<Image>;
  metafields: Metafield[];
  seo: SEO;
  tags: string[];
  updatedAt: string;
};

export type ShopifyCartOperation = {
  data: {
    cart: ShopifyCart;
  };
  variables: {
    cartId: string;
  };
};

export type ShopifyCreateCartOperation = {
  data: { cartCreate: { cart: ShopifyCart } };
};

export type ShopifyAddToCartOperation = {
  data: {
    cartLinesAdd: {
      cart: ShopifyCart;
    };
  };
  variables: {
    cartId: string;
    lines: {
      merchandiseId: string;
      quantity: number;
    }[];
  };
};

export type ShopifyRemoveFromCartOperation = {
  data: {
    cartLinesRemove: {
      cart: ShopifyCart;
    };
  };
  variables: {
    cartId: string;
    lineIds: string[];
  };
};

export type ShopifyUpdateCartOperation = {
  data: {
    cartLinesUpdate: {
      cart: ShopifyCart;
    };
  };
  variables: {
    cartId: string;
    lines: {
      id: string;
      merchandiseId: string;
      quantity: number;
    }[];
  };
};

export type ShopifyCollectionOperation = {
  data: {
    collection: ShopifyCollection;
  };
  variables: {
    handle: string;
  };
};

export type ShopifyCollectionProductsOperation = {
  data: {
    collection: {
      products: Connection<ShopifyProduct>;
    };
  };
  variables: {
    handle: string;
    reverse?: boolean;
    sortKey?: string;
  };
};

export type ShopifyCollectionsOperation = {
  data: {
    collections: Connection<ShopifyCollection>;
  };
};

export type ShopifyMenuOperation = {
  data: {
    menu?: {
      items: {
        title: string;
        url: string;
      }[];
    };
  };
  variables: {
    handle: string;
  };
};

export type ShopifyPageOperation = {
  data: { pageByHandle: Page };
  variables: { handle: string };
};

export type ShopifyPagesOperation = {
  data: {
    pages: Connection<Page>;
  };
};

export type ShopifyProductOperation = {
  data: { product: ShopifyProduct };
  variables: {
    handle: string;
  };
};

export type ShopifyProductOperatioWithId = {
  data: { product: ShopifyProduct };
  variables: {
    id: string;
  };
};

export type ShopifyProductRecommendationsOperation = {
  data: {
    productRecommendations: ShopifyProduct[];
  };
  variables: {
    productId: string;
  };
};

export type ShopifyProductsOperation = {
  data: {
    products: Connection<ShopifyProduct>;
  };
  variables: {
    query?: string;
    reverse?: boolean;
    sortKey?: string;
  };
};

export type ShopifyArticle = {
  id: string;
  title: string;
  handle: string;
  excerpt: string;
  contentHtml: string;
  authorV2: {
    name: string;
  };
  image: {
    altText: string;
    url: string;
  };
  metafields: Metafield[];
  blog: {
    handle: string;
  };
  seo?: SEO;
  publishedAt: string;
  updatedAt: string;
};

export type ShopifyArticleOperation = {
  data: { article: ShopifyArticle };
  variables: {
    id: string;
  };
};

export type ShopifyArticlesOperation = {
  data: { articles: { edges: { node: ShopifyArticle }[] } };
  variables?: {};
};

export interface ShopifyArticleByHandleOperation {
  data: {
    shop: {
      name: string;
    };
    blog: {
      articleByHandle: ShopifyArticle;
    };
  };
  variables: {
    blogHandle: string;
    articleHandle: string;
  };
}

export interface ShopifyProductMetafield {
  value: any;
  key: string;
  namespace: string;
}

export interface ShopifyProductMetafieldsOperation {
  data: any;
  query: string;
  variables: {
    handle: string;
    key: string;
    namespace: string;
  };
}

export interface TextNode {
  type: 'text';
  value: string;
  bold?: boolean;
  italic?: boolean;
}

export interface LinkNode {
  type: 'link';
  url: string;
  target: string;
  children: TextNode[];
  bold?: boolean;
  italic?: boolean;
}

export type ParagraphNode = TextNode | LinkNode;

export interface HeadingNode {
  type: 'heading';
  level: number;
  children: TextNode[];
}

export interface ListItemNode {
  children: TextNode[];
}

export interface ListNode {
  type: 'list';
  listType: 'unordered' | 'ordered';
  children: ListItemNode[];
}

export interface Paragraph {
  type: 'paragraph';
  children: ParagraphNode[];
}

export interface Content {
  type: 'root';
  children: (HeadingNode | ListNode | Paragraph)[];
}
