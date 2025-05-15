# Quill-like Store

A single-page web application that simulates an e-commerce store similar to Quill.com. The application features a dynamic product catalog, shopping cart functionality, and search capabilities.

## Features

- Responsive product grid display
- Dynamic shopping cart
- Real-time search functionality
- Analytics tracking
- Modern and clean UI design

## Analytics Tracking

The application tracks the following analytics in a JSON object:

- Cart items and quantities
- Search history with timestamps
- Viewed products
- Last activity timestamp

## How to Use

1. Open `index.html` in a web browser
2. Browse the product catalog
3. Use the search bar to find specific products
4. Add items to your cart
5. View your cart in the sidebar
6. Remove items from your cart if needed
7. Proceed to checkout

## Technical Details

The application is built using:
- HTML5
- CSS3 (with Flexbox and Grid)
- Vanilla JavaScript
- Font Awesome icons

## Data Storage

All analytics are stored in a JSON object called `analytics` which includes:
```javascript
{
    cart: [], // Current cart items
    searchHistory: [], // Search terms and timestamps
    viewedProducts: [], // Product IDs viewed by user
    lastUpdated: "timestamp" // Last activity timestamp
}
```

## Development

To modify the product catalog, edit the `products.js` file. Each product should have:
- id
- name
- price
- image
- description

## Browser Support

The application works in all modern browsers that support ES6+ JavaScript features. 