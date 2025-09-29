-- Bonsai Ecommerce - Seed de dados iniciais
-- A senha é senha123 para todos os usuários

-- Usuários
INSERT INTO users (id, name, password, email) VALUES ('b1a7e2c2-1f2e-4c3a-8e1a-2b3c4d5e6f70', 'Admin Bonsai', '$2a$10$bajxMbkqITBPvcq1/HOsROrYF2dB9aD2neeUuo9Jds31u3Z/C3D2m', 'admin@bonsai.com');
INSERT INTO users (id, name, password, email) VALUES ('c2b8f3d3-2e3f-5d4b-9f2b-3c4d5e6f7a81', 'Cliente Bonsai', '$2a$10$bajxMbkqITBPvcq1/HOsROrYF2dB9aD2neeUuo9Jds31u3Z/C3D2m', 'cliente@bonsai.com');
INSERT INTO users (id, name, password, email) VALUES ('d3c9a4e4-3f4a-6e5c-0a3c-4d5e6f7a8b92', 'Maria Oliveira', '$2a$10$bajxMbkqITBPvcq1/HOsROrYF2dB9aD2neeUuo9Jds31u3Z/C3D2m', 'maria@bonsai.com');
INSERT INTO users (id, name, password, email) VALUES ('e4d0b5f5-4a5b-7f6d-1b4d-5e6f7a8b9c03', 'João Souza', '$2a$10$bajxMbkqITBPvcq1/HOsROrYF2dB9aD2neeUuo9Jds31u3Z/C3D2m', 'joao@bonsai.com');

-- Categorias
INSERT INTO categories (id, name, created_by, updated_by) VALUES ('f5e1c2b3-5d6e-4f7a-8b9c-0a1b2c3d4e5f', 'Ferramentas', 'b1a7e2c2-1f2e-4c3a-8e1a-2b3c4d5e6f70', 'b1a7e2c2-1f2e-4c3a-8e1a-2b3c4d5e6f70');
INSERT INTO categories (id, name, created_by, updated_by) VALUES ('a6b2d3c4-6e7f-5a8b-9c0d-1e2f3a4b5c6d', 'Vasos', 'b1a7e2c2-1f2e-4c3a-8e1a-2b3c4d5e6f70', 'b1a7e2c2-1f2e-4c3a-8e1a-2b3c4d5e6f70');
INSERT INTO categories (id, name, created_by, updated_by) VALUES ('b7c3e4d5-7f8a-6b9c-0d1e-2f3a4b5c6d7e', 'Bonsais', 'b1a7e2c2-1f2e-4c3a-8e1a-2b3c4d5e6f70', 'b1a7e2c2-1f2e-4c3a-8e1a-2b3c4d5e6f70');
INSERT INTO categories (id, name, created_by, updated_by) VALUES ('c8d4f5e6-8a9b-7c0d-1e2f-3a4b5c6d7e8f', 'Substratos', 'b1a7e2c2-1f2e-4c3a-8e1a-2b3c4d5e6f70', 'b1a7e2c2-1f2e-4c3a-8e1a-2b3c4d5e6f70');
INSERT INTO categories (id, name, created_by, updated_by) VALUES ('d9e5a6b7-9b0c-8d1e-2f3a-4b5c6d7e8f9a', 'Adubos', 'b1a7e2c2-1f2e-4c3a-8e1a-2b3c4d5e6f70', 'b1a7e2c2-1f2e-4c3a-8e1a-2b3c4d5e6f70');

-- Produtos
INSERT INTO products (id, name, description, price, image_url, category_id, created_by, updated_by) VALUES ('e1f2a3b4-1c2d-3e4f-5a6b-7c8d9e0f1a2b', 'Bonsai Ficus', 'Bonsai de Ficus com 5 anos, vaso cerâmico', 199.90, 'https://picsum.photos/200/300', 'b7c3e4d5-7f8a-6b9c-0d1e-2f3a4b5c6d7e', 'b1a7e2c2-1f2e-4c3a-8e1a-2b3c4d5e6f70', 'b1a7e2c2-1f2e-4c3a-8e1a-2b3c4d5e6f70');
INSERT INTO products (id, name, description, price, image_url, category_id, created_by, updated_by) VALUES ('f2a3b4c5-2d3e-4f5a-6b7c-8d9e0f1a2b3c', 'Tesoura de Poda', 'Tesoura profissional para bonsai', 39.90, 'https://picsum.photos/200/300', 'f5e1c2b3-5d6e-4f7a-8b9c-0a1b2c3d4e5f', 'b1a7e2c2-1f2e-4c3a-8e1a-2b3c4d5e6f70', 'b1a7e2c2-1f2e-4c3a-8e1a-2b3c4d5e6f70');
INSERT INTO products (id, name, description, price, image_url, category_id, created_by, updated_by) VALUES ('a3b4c5d6-3e4f-5a6b-7c8d-9e0f1a2b3c4d', 'Bonsai Junípero', 'Bonsai de Junípero, 8 anos, vaso esmaltado', 349.00, 'https://picsum.photos/200/300', 'b7c3e4d5-7f8a-6b9c-0d1e-2f3a4b5c6d7e', 'b1a7e2c2-1f2e-4c3a-8e1a-2b3c4d5e6f70', 'b1a7e2c2-1f2e-4c3a-8e1a-2b3c4d5e6f70');
INSERT INTO products (id, name, description, price, image_url, category_id, created_by, updated_by) VALUES ('b4c5d6e7-4f5a-6b7c-8d9e-0f1a2b3c4d5e', 'Vaso Japonês', 'Vaso importado para bonsai, cerâmica azul', 59.90, 'https://picsum.photos/200/300', 'a6b2d3c4-6e7f-5a8b-9c0d-1e2f3a4b5c6d', 'b1a7e2c2-1f2e-4c3a-8e1a-2b3c4d5e6f70', 'b1a7e2c2-1f2e-4c3a-8e1a-2b3c4d5e6f70');
INSERT INTO products (id, name, description, price, image_url, category_id, created_by, updated_by) VALUES ('c5d6e7f8-5a6b-7c8d-9e0f-1a2b3c4d5e6f', 'Substrato Akadama', 'Substrato japonês para bonsai, 2L', 29.90, 'https://picsum.photos/200/300', 'c8d4f5e6-8a9b-7c0d-1e2f-3a4b5c6d7e8f', 'b1a7e2c2-1f2e-4c3a-8e1a-2b3c4d5e6f70', 'b1a7e2c2-1f2e-4c3a-8e1a-2b3c4d5e6f70');
INSERT INTO products (id, name, description, price, image_url, category_id, created_by, updated_by) VALUES ('d6e7f8a9-6b7c-8d9e-0f1a-2b3c4d5e6f7a', 'Adubo Orgânico', 'Adubo especial para bonsai, 500g', 19.90, 'https://picsum.photos/200/300', 'd9e5a6b7-9b0c-8d1e-2f3a-4b5c6d7e8f9a', 'b1a7e2c2-1f2e-4c3a-8e1a-2b3c4d5e6f70', 'b1a7e2c2-1f2e-4c3a-8e1a-2b3c4d5e6f70');

-- Endereços
INSERT INTO addresses (id, user_id, street, complement, zip_code, neighborhood, city, state, number, created_by, updated_by) VALUES ('e7f8a9b0-7c8d-9e0f-1a2b-3c4d5e6f7a8b', 'c2b8f3d3-2e3f-5d4b-9f2b-3c4d5e6f7a81', 'Rua das Palmeiras', 'Apto 101', '80000-000', 'Centro', 'Curitiba', 'PR', '100', 'b1a7e2c2-1f2e-4c3a-8e1a-2b3c4d5e6f70', 'b1a7e2c2-1f2e-4c3a-8e1a-2b3c4d5e6f70');
INSERT INTO addresses (id, user_id, street, complement, zip_code, neighborhood, city, state, number, created_by, updated_by) VALUES ('f8a9b0c1-8d9e-0f1a-2b3c-4d5e6f7a8b9c', 'd3c9a4e4-3f4a-6e5c-0a3c-4d5e6f7a8b92', 'Av. Brasil', 'Casa', '81000-000', 'Jardim Social', 'Curitiba', 'PR', '200', 'b1a7e2c2-1f2e-4c3a-8e1a-2b3c4d5e6f70', 'b1a7e2c2-1f2e-4c3a-8e1a-2b3c4d5e6f70');
INSERT INTO addresses (id, user_id, street, complement, zip_code, neighborhood, city, state, number, created_by, updated_by) VALUES ('a9b0c1d2-9e0f-1a2b-3c4d-5e6f7a8b9c0d', 'e4d0b5f5-4a5b-7f6d-1b4d-5e6f7a8b9c03', 'Rua das Laranjeiras', '', '82000-000', 'Batel', 'Curitiba', 'PR', '50', 'b1a7e2c2-1f2e-4c3a-8e1a-2b3c4d5e6f70', 'b1a7e2c2-1f2e-4c3a-8e1a-2b3c4d5e6f70');

-- Pedidos com total_price calculado
INSERT INTO orders (id, order_date, user_id, total_price, created_by, updated_by) VALUES ('b0c1d2e3-0f1a-2b3c-4d5e-6f7a8b9c0d1e', '2024-09-22T10:00:00', 'c2b8f3d3-2e3f-5d4b-9f2b-3c4d5e6f7a81', 239.80, 'b1a7e2c2-1f2e-4c3a-8e1a-2b3c4d5e6f70', 'b1a7e2c2-1f2e-4c3a-8e1a-2b3c4d5e6f70');
INSERT INTO orders (id, order_date, user_id, total_price, created_by, updated_by) VALUES ('c1d2e3f4-1a2b-3c4d-5e6f-7a8b9c0d1e2f', '2024-09-23T15:30:00', 'd3c9a4e4-3f4a-6e5c-0a3c-4d5e6f7a8b92', 408.90, 'b1a7e2c2-1f2e-4c3a-8e1a-2b3c4d5e6f70', 'b1a7e2c2-1f2e-4c3a-8e1a-2b3c4d5e6f70');
INSERT INTO orders (id, order_date, user_id, total_price, created_by, updated_by) VALUES ('d2e3f4a5-2b3c-4d5e-6f7a-8b9c0d1e2f3a', '2024-09-24T09:45:00', 'e4d0b5f5-4a5b-7f6d-1b4d-5e6f7a8b9c03', 49.80, 'b1a7e2c2-1f2e-4c3a-8e1a-2b3c4d5e6f70', 'b1a7e2c2-1f2e-4c3a-8e1a-2b3c4d5e6f70');

-- Itens dos pedidos
-- Pedido 1: Cliente Bonsai compra 1 Bonsai Ficus (199.90) + 1 Tesoura de Poda (39.90) = 239.80
INSERT INTO order_items (id, order_id, product_id, quantity, price, created_by, updated_by) VALUES ('11a1b1c1-1d1e-1f1a-1b1c-1d1e1f1a1b1c', 'b0c1d2e3-0f1a-2b3c-4d5e-6f7a8b9c0d1e', 'e1f2a3b4-1c2d-3e4f-5a6b-7c8d9e0f1a2b', 1, 199.90, 'b1a7e2c2-1f2e-4c3a-8e1a-2b3c4d5e6f70', 'b1a7e2c2-1f2e-4c3a-8e1a-2b3c4d5e6f70');
INSERT INTO order_items (id, order_id, product_id, quantity, price, created_by, updated_by) VALUES ('22b2c2d2-2e2f-2a2b-2c2d-2e2f2a2b2c2d', 'b0c1d2e3-0f1a-2b3c-4d5e-6f7a8b9c0d1e', 'f2a3b4c5-2d3e-4f5a-6b7c-8d9e0f1a2b3c', 1, 39.90, 'b1a7e2c2-1f2e-4c3a-8e1a-2b3c4d5e6f70', 'b1a7e2c2-1f2e-4c3a-8e1a-2b3c4d5e6f70');

-- Pedido 2: Maria Oliveira compra 1 Bonsai Junípero (349.00) + 1 Vaso Japonês (59.90) = 408.90
INSERT INTO order_items (id, order_id, product_id, quantity, price, created_by, updated_by) VALUES ('33c3d3e3-3f3a-3b3c-3d3e-3f3a3b3c3d3e', 'c1d2e3f4-1a2b-3c4d-5e6f-7a8b9c0d1e2f', 'a3b4c5d6-3e4f-5a6b-7c8d-9e0f1a2b3c4d', 1, 349.00, 'b1a7e2c2-1f2e-4c3a-8e1a-2b3c4d5e6f70', 'b1a7e2c2-1f2e-4c3a-8e1a-2b3c4d5e6f70');
INSERT INTO order_items (id, order_id, product_id, quantity, price, created_by, updated_by) VALUES ('44d4e4f4-4a4b-4c4d-4e4f-4a4b4c4d4e4f', 'c1d2e3f4-1a2b-3c4d-5e6f-7a8b9c0d1e2f', 'b4c5d6e7-4f5a-6b7c-8d9e-0f1a2b3c4d5e', 1, 59.90, 'b1a7e2c2-1f2e-4c3a-8e1a-2b3c4d5e6f70', 'b1a7e2c2-1f2e-4c3a-8e1a-2b3c4d5e6f70');

-- Pedido 3: João Souza compra 1 Substrato Akadama (29.90) + 1 Adubo Orgânico (19.90) = 49.80
INSERT INTO order_items (id, order_id, product_id, quantity, price, created_by, updated_by) VALUES ('55e5f5a5-5b5c-5d5e-5f5a-5b5c5d5e5f5a', 'd2e3f4a5-2b3c-4d5e-6f7a-8b9c0d1e2f3a', 'c5d6e7f8-5a6b-7c8d-9e0f-1a2b3c4d5e6f', 1, 29.90, 'b1a7e2c2-1f2e-4c3a-8e1a-2b3c4d5e6f70', 'b1a7e2c2-1f2e-4c3a-8e1a-2b3c4d5e6f70');
INSERT INTO order_items (id, order_id, product_id, quantity, price, created_by, updated_by) VALUES ('66f6a6b6-6c6d-6e6f-6a6b-6c6d6e6f6a6b', 'd2e3f4a5-2b3c-4d5e-6f7a-8b9c0d1e2f3a', 'd6e7f8a9-6b7c-8d9e-0f1a-2b3c4d5e6f7a', 1, 19.90, 'b1a7e2c2-1f2e-4c3a-8e1a-2b3c4d5e6f70', 'b1a7e2c2-1f2e-4c3a-8e1a-2b3c4d5e6f70');
