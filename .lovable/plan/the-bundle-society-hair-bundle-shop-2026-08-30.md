# The Bundle Society — Hair Bundle Shop

No Shopify. A self-contained storefront with a browsable bundle catalog, a cart, and an order request form. Orders are saved in the app's own database so you can review them; no payment processor is connected — you follow up with customers to arrange payment.

## Look and feel

Straight from the flyer: soft off-white background, lime green and bubblegum pink as the two accents, heavy rounded-card layout with soft drop shadows, chunky rounded geometric headline type, and pill buttons in green with a white arrow badge.

## Pages

- **Home (`/`)** — Hero card with "The Bundle Society / Premium Bundles" lockup and a "Let's build your look" button, featured bundles row, "Starting at $200" price band, benefits list (premium hair bundles, soft/full/long-lasting, straight • body wave • deep wave, multiple lengths, custom orders welcome), and a "Limited bundles available" strip.
- **Shop (`/shop`)** — Grid of bundles with texture and length filters, price, and add-to-cart.
- **Bundle detail (`/shop/$slug`)** — Photos, description, length and quantity picker, add to cart.
- **Cart (`/cart`)** — Line items, quantity edit, remove, subtotal, checkout button.
- **Checkout / Order request (`/checkout`)** — Form: name, email, phone, shipping address, notes; submits the cart as an order.
- **Order confirmation (`/order/$id`)** — Thank-you page with the order summary and reference number.
- **Contact (`/contact`)** — Inquiry form for custom bundle requests.

## How ordering works

1. Customer adds bundles to the cart (cart persists in the browser).
2. On checkout they submit contact and shipping details.
3. The order and its line items are saved to the database, with prices re-checked server-side so totals can't be tampered with.
4. Customer sees a confirmation with a reference number; you review orders in the database and reach out to collect payment.

## Technical notes

- Enable Lovable Cloud for the database (orders, order items, product catalog, contact inquiries).
- Tables: `products` (name, slug, texture, lengths, price, images, active), `orders` (customer contact, shipping, status, total, reference), `order_items` (order, product, length, qty, unit price), `inquiries`.
- Products are publicly readable; orders and inquiries are insert-only from the public site and readable only by an admin role stored in a separate `user_roles` table. All inserts validated with Zod on the client and re-validated in the server function.
- Seed the catalog with a starter set of bundles (straight, body wave, deep wave; multiple lengths) so the shop is populated from the first load.
- Cart state in localStorage; order creation via a TanStack Start server function.
- Product imagery generated to match the flyer's styling.
- No payment provider and no Shopify connection.

## Not included

- Online payment capture, real inventory sync, shipping-rate calculation, customer accounts. An admin dashboard for managing orders can be added later if you want one.
