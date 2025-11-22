-- Table for company budgets
CREATE TABLE budgets (
    id SERIAL PRIMARY KEY,
    department VARCHAR(100),
    year INTEGER,
    amount NUMERIC(12,2)
);

-- Table for company debts
CREATE TABLE debts (
    id SERIAL PRIMARY KEY,
    creditor VARCHAR(100),
    amount NUMERIC(12,2),
    due_date DATE,
    paid BOOLEAN DEFAULT FALSE
);
-- Insert fake budgets
INSERT INTO budgets (department, year, amount) VALUES
('Sales', 2025, 150000.00),
('IT', 2025, 90000.00),
('HR', 2025, 40000.00),
('Marketing', 2025, 60000.00);

-- Insert fake debts
INSERT INTO debts (creditor, amount, due_date, paid) VALUES
('Bank of America', 50000.00, '2025-12-31', FALSE),
('Global Suppliers Inc.', 12000.00, '2025-11-30', TRUE),
('Tech Partners LLC', 8000.00, '2026-01-15', FALSE);
-- Table creation
CREATE TABLE customers (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100),
    email VARCHAR(100),
    phone VARCHAR(20),
    city VARCHAR(50)
);

CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100),
    category VARCHAR(50),
    price NUMERIC(10,2)
);

CREATE TABLE employees (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100),
    position VARCHAR(50),
    salary NUMERIC(10,2)
);

CREATE TABLE sales (
    id SERIAL PRIMARY KEY,
    customer_id INTEGER REFERENCES customers(id),
    product_id INTEGER REFERENCES products(id),
    employee_id INTEGER REFERENCES employees(id),
    quantity INTEGER,
    sale_date DATE
);

-- Insert fake data
INSERT INTO customers (name, email, phone, city) VALUES
('Anna Smith', 'anna@company.com', '11999999999', 'New York'),
('Charles Brown', 'charles@company.com', '21988888888', 'Los Angeles'),
('Mary Green', 'mary@company.com', '31977777777', 'Chicago'),
('John White', 'john@company.com', '41966666666', 'Houston');

INSERT INTO products (name, category, price) VALUES
('Notebook Pro', 'Computers', 4500.00),
('Smartphone X', 'Phones', 2500.00),
('Gaming Chair', 'Furniture', 1200.00),
('4K Monitor', 'Computers', 1800.00);

INSERT INTO employees (name, position, salary) VALUES
('Fernanda Lee', 'Salesperson', 3500.00),
('Rafael Scott', 'Manager', 7000.00),
('Lucas Parker', 'Salesperson', 3200.00);

INSERT INTO sales (customer_id, product_id, employee_id, quantity, sale_date) VALUES
(1, 1, 1, 2, '2025-11-01'),
(2, 2, 2, 1, '2025-11-02'),
(3, 3, 3, 3, '2025-11-03'),
(4, 4, 1, 1, '2025-11-04'),
(1, 2, 2, 1, '2025-11-05'),
(2, 3, 3, 2, '2025-11-06');
