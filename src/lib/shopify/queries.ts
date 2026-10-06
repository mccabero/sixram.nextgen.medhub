export const PRODUCT_FIELDS = /* GraphQL */ `
  fragment ProductFields on Product {
    id
    title
    handle
    description
    descriptionHtml
    availableForSale
    productType
    vendor
    tags
    featuredImage {
      url
      altText
    }
    images(first: 8) {
      edges {
        node {
          url
          altText
        }
      }
    }
    collections(first: 8) {
      edges {
        node {
          id
          title
          handle
          description
          image {
            url
            altText
          }
          seo {
            title
            description
          }
        }
      }
    }
    priceRange {
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
    }
    variants(first: 20) {
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
  }
`;

export const COLLECTION_FIELDS = /* GraphQL */ `
  fragment CollectionFields on Collection {
    id
    title
    handle
    description
    image {
      url
      altText
    }
    seo {
      title
      description
    }
  }
`;

export const CART_FIELDS = /* GraphQL */ `
  fragment CartFields on Cart {
    id
    checkoutUrl
    totalQuantity
    cost {
      subtotalAmount {
        amount
        currencyCode
      }
      totalAmount {
        amount
        currencyCode
      }
    }
    lines(first: 100) {
      edges {
        node {
          id
          quantity
          cost {
            totalAmount {
              amount
              currencyCode
            }
          }
          merchandise {
            ... on ProductVariant {
              id
              title
              price {
                amount
                currencyCode
              }
              product {
                handle
                title
                featuredImage {
                  url
                  altText
                }
              }
            }
          }
        }
      }
    }
  }
`;

export const GET_PRODUCTS_QUERY = /* GraphQL */ `
  ${PRODUCT_FIELDS}
  query GetProducts($query: String, $sortKey: ProductSortKeys, $reverse: Boolean) {
    products(first: 100, query: $query, sortKey: $sortKey, reverse: $reverse) {
      edges {
        node {
          ...ProductFields
        }
      }
    }
  }
`;

export const GET_PRODUCT_BY_HANDLE_QUERY = /* GraphQL */ `
  ${PRODUCT_FIELDS}
  query GetProductByHandle($handle: String!) {
    product(handle: $handle) {
      ...ProductFields
    }
  }
`;

export const GET_COLLECTIONS_QUERY = /* GraphQL */ `
  ${COLLECTION_FIELDS}
  query GetCollections {
    collections(first: 50) {
      edges {
        node {
          ...CollectionFields
        }
      }
    }
  }
`;

export const GET_COLLECTION_PRODUCTS_QUERY = /* GraphQL */ `
  ${PRODUCT_FIELDS}
  ${COLLECTION_FIELDS}
  query GetCollectionProducts($handle: String!) {
    collection(handle: $handle) {
      ...CollectionFields
      products(first: 100) {
        edges {
          node {
            ...ProductFields
          }
        }
      }
    }
  }
`;

export const GET_CART_QUERY = /* GraphQL */ `
  ${CART_FIELDS}
  query GetCart($cartId: ID!) {
    cart(id: $cartId) {
      ...CartFields
    }
  }
`;

export const CREATE_CART_MUTATION = /* GraphQL */ `
  ${CART_FIELDS}
  mutation CreateCart($lines: [CartLineInput!]) {
    cartCreate(input: { lines: $lines }) {
      cart {
        ...CartFields
      }
      userErrors {
        field
        message
      }
    }
  }
`;

export const ADD_TO_CART_MUTATION = /* GraphQL */ `
  ${CART_FIELDS}
  mutation AddToCart($cartId: ID!, $lines: [CartLineInput!]!) {
    cartLinesAdd(cartId: $cartId, lines: $lines) {
      cart {
        ...CartFields
      }
      userErrors {
        field
        message
      }
    }
  }
`;

export const UPDATE_CART_MUTATION = /* GraphQL */ `
  ${CART_FIELDS}
  mutation UpdateCart($cartId: ID!, $lines: [CartLineUpdateInput!]!) {
    cartLinesUpdate(cartId: $cartId, lines: $lines) {
      cart {
        ...CartFields
      }
      userErrors {
        field
        message
      }
    }
  }
`;

export const REMOVE_CART_LINE_MUTATION = /* GraphQL */ `
  ${CART_FIELDS}
  mutation RemoveCartLine($cartId: ID!, $lineIds: [ID!]!) {
    cartLinesRemove(cartId: $cartId, lineIds: $lineIds) {
      cart {
        ...CartFields
      }
      userErrors {
        field
        message
      }
    }
  }
`;
