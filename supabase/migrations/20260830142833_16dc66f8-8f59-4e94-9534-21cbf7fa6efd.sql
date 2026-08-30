CREATE TYPE public.app_role AS ENUM ('admin', 'user');

CREATE TABLE public.user_roles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role public.app_role NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (user_id, role)
);
GRANT SELECT ON public.user_roles TO authenticated;
GRANT ALL ON public.user_roles TO service_role;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view their own roles" ON public.user_roles FOR SELECT TO authenticated USING (auth.uid() = user_id);

CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role public.app_role)
RETURNS boolean LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = _user_id AND role = _role)
$$;

CREATE TABLE public.products (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text NOT NULL UNIQUE,
  name text NOT NULL,
  texture text NOT NULL,
  description text NOT NULL DEFAULT '',
  lengths integer[] NOT NULL DEFAULT '{}',
  price_cents integer NOT NULL,
  image_key text NOT NULL DEFAULT 'straight',
  featured boolean NOT NULL DEFAULT false,
  active boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.products TO anon, authenticated;
GRANT ALL ON public.products TO service_role;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can view active bundles" ON public.products FOR SELECT TO anon, authenticated USING (active = true);

CREATE TABLE public.orders (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  reference text NOT NULL UNIQUE,
  customer_name text NOT NULL,
  email text NOT NULL,
  phone text NOT NULL DEFAULT '',
  address_line1 text NOT NULL,
  address_line2 text NOT NULL DEFAULT '',
  city text NOT NULL,
  state text NOT NULL DEFAULT '',
  postal_code text NOT NULL DEFAULT '',
  country text NOT NULL DEFAULT 'United States',
  notes text NOT NULL DEFAULT '',
  status text NOT NULL DEFAULT 'pending',
  total_cents integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT ALL ON public.orders TO service_role;
GRANT SELECT ON public.orders TO authenticated;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Admins can view orders" ON public.orders FOR SELECT TO authenticated USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can update orders" ON public.orders FOR UPDATE TO authenticated USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE TABLE public.order_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id uuid NOT NULL REFERENCES public.orders(id) ON DELETE CASCADE,
  product_id uuid NOT NULL REFERENCES public.products(id),
  product_name text NOT NULL,
  length integer NOT NULL,
  quantity integer NOT NULL CHECK (quantity > 0),
  unit_price_cents integer NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT ALL ON public.order_items TO service_role;
GRANT SELECT ON public.order_items TO authenticated;
ALTER TABLE public.order_items ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Admins can view order items" ON public.order_items FOR SELECT TO authenticated USING (public.has_role(auth.uid(), 'admin'));

CREATE TABLE public.inquiries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  phone text NOT NULL DEFAULT '',
  message text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT ALL ON public.inquiries TO service_role;
GRANT SELECT ON public.inquiries TO authenticated;
ALTER TABLE public.inquiries ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Admins can view inquiries" ON public.inquiries FOR SELECT TO authenticated USING (public.has_role(auth.uid(), 'admin'));

INSERT INTO public.products (slug, name, texture, description, lengths, price_cents, image_key, featured) VALUES
('silk-straight-trio', 'Silk Straight Trio', 'Straight', 'Three bundles of sleek, tangle-free straight hair with a natural sheen. Holds a bone-straight finish wash after wash.', '{14,16,18,20,22,24}', 20000, 'straight', true),
('midnight-straight-deluxe', 'Midnight Straight Deluxe', 'Straight', 'Four thick straight bundles for maximum fullness. Minimal shedding, double-weft construction.', '{16,18,20,22,24,26}', 28500, 'straight', false),
('glass-straight-luxe', 'Glass Straight Luxe', 'Straight', 'Our highest-grade straight hair with a mirror finish. Heat friendly and effortlessly smooth.', '{18,20,22,24,26,28}', 34000, 'straight', false),
('body-wave-signature', 'Body Wave Signature', 'Body Wave', 'Soft, bouncy waves that fall beautifully with or without styling. The everyday favorite.', '{14,16,18,20,22,24}', 21500, 'body', true),
('body-wave-fullset', 'Body Wave Full Set', 'Body Wave', 'Four bundles of loose, voluminous waves for a full, glamorous silhouette.', '{16,18,20,22,24,26}', 29500, 'body', false),
('sunset-body-wave', 'Sunset Body Wave', 'Body Wave', 'Airy, brushed-out waves with plenty of movement. Blends seamlessly with natural texture.', '{18,20,22,24,26}', 26000, 'body', false),
('deep-wave-classic', 'Deep Wave Classic', 'Deep Wave', 'Rich, defined curl pattern that stays springy and full when wet or dry.', '{14,16,18,20,22,24}', 22500, 'deep', true),
('deep-wave-luxe', 'Deep Wave Luxe', 'Deep Wave', 'Dense deep wave bundles with a tight, uniform pattern and long-lasting definition.', '{16,18,20,22,24,26}', 31000, 'deep', false),
('custom-society-bundle', 'Custom Society Bundle', 'Deep Wave', 'Build your own set — mix textures and lengths. Tell us what you want in the order notes.', '{14,16,18,20,22,24,26,28}', 24000, 'deep', false);