-- Enhanced fake company database with more comprehensive data

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

-- Table for suppliers
CREATE TABLE suppliers (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100),
    contact_email VARCHAR(100),
    phone VARCHAR(20),
    city VARCHAR(50)
);

-- Table for customers
CREATE TABLE customers (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100),
    email VARCHAR(100),
    phone VARCHAR(20),
    city VARCHAR(50),
    registration_date DATE
);

-- Table for products
CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100),
    category VARCHAR(50),
    price NUMERIC(10,2),
    stock_quantity INTEGER,
    supplier_id INTEGER REFERENCES suppliers(id)
);

-- Table for employees
CREATE TABLE employees (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100),
    position VARCHAR(50),
    salary NUMERIC(10,2),
    hire_date DATE,
    department VARCHAR(50)
);

-- Table for sales
CREATE TABLE sales (
    id SERIAL PRIMARY KEY,
    customer_id INTEGER REFERENCES customers(id),
    product_id INTEGER REFERENCES products(id),
    employee_id INTEGER REFERENCES employees(id),
    quantity INTEGER,
    unit_price NUMERIC(10,2),
    total_amount NUMERIC(10,2),
    sale_date DATE
);

-- Table for invoices
CREATE TABLE invoices (
    id SERIAL PRIMARY KEY,
    supplier_id INTEGER REFERENCES suppliers(id),
    amount NUMERIC(12,2),
    issue_date DATE,
    due_date DATE,
    paid BOOLEAN DEFAULT FALSE
);

-- Insert fake budgets
INSERT INTO budgets (department, year, amount) VALUES
('Sales', 2025, 150000.00),
('IT', 2025, 90000.00),
('HR', 2025, 40000.00),
('Marketing', 2025, 60000.00),
('Finance', 2025, 50000.00),
('Operations', 2025, 80000.00);

-- Insert fake debts
INSERT INTO debts (creditor, amount, due_date, paid) VALUES
('Bank of America', 50000.00, '2025-12-31', FALSE),
('Global Suppliers Inc.', 12000.00, '2025-11-30', TRUE),
('Tech Partners LLC', 8000.00, '2026-01-15', FALSE),
('Office Supplies Co.', 5000.00, '2025-12-15', FALSE),
('Marketing Agency', 15000.00, '2026-02-01', TRUE);

-- Insert fake suppliers
INSERT INTO suppliers (name, contact_email, phone, city) VALUES
('TechSupply Inc.', 'contact@techsupply.com', '555-0101', 'San Francisco'),
('OfficeFurnish', 'sales@officefurnish.com', '555-0102', 'Chicago'),
('ElectroMart', 'orders@electromart.com', '555-0103', 'New York'),
('GlobalParts', 'info@globalparts.com', '555-0104', 'Los Angeles');

-- Insert fake customers
INSERT INTO customers (name, email, phone, city, registration_date) VALUES
('Anna Smith', 'anna@company.com', '11999999999', 'New York', '2023-01-15'),
('Charles Brown', 'charles@company.com', '21988888888', 'Los Angeles', '2023-03-22'),
('Mary Green', 'mary@company.com', '31977777777', 'Chicago', '2023-05-10'),
('John White', 'john@company.com', '41966666666', 'Houston', '2023-07-05'),
('Lisa Johnson', 'lisa@company.com', '51955555555', 'Phoenix', '2023-09-18'),
('Michael Davis', 'michael@company.com', '61944444444', 'Philadelphia', '2024-01-20'),
('Sarah Wilson', 'sarah@company.com', '71933333333', 'San Antonio', '2024-03-12'),
('David Miller', 'david@company.com', '81922222222', 'San Diego', '2024-05-08');

-- Insert fake products
INSERT INTO products (name, category, price, stock_quantity, supplier_id) VALUES
('Notebook Pro', 'Computers', 4500.00, 15, 1),
('Smartphone X', 'Phones', 2500.00, 25, 3),
('Gaming Chair', 'Furniture', 1200.00, 10, 2),
('4K Monitor', 'Computers', 1800.00, 20, 1),
('Wireless Mouse', 'Accessories', 50.00, 50, 4),
('Mechanical Keyboard', 'Accessories', 150.00, 30, 4),
('External Hard Drive', 'Storage', 200.00, 40, 1),
('Webcam HD', 'Accessories', 80.00, 35, 3),
('Printer Laser', 'Office Equipment', 300.00, 12, 2),
('Router WiFi', 'Networking', 120.00, 18, 1);

-- Insert fake employees
INSERT INTO employees (name, position, salary, hire_date, department) VALUES
('Fernanda Lee', 'Salesperson', 3500.00, '2022-01-15', 'Sales'),
('Rafael Scott', 'Manager', 7000.00, '2021-06-01', 'Sales'),
('Lucas Parker', 'Salesperson', 3200.00, '2023-03-10', 'Sales'),
('Amanda Costa', 'IT Specialist', 4500.00, '2022-08-20', 'IT'),
('Bruno Silva', 'HR Coordinator', 3800.00, '2023-01-05', 'HR'),
('Carla Santos', 'Marketing Manager', 5500.00, '2021-11-12', 'Marketing'),
('Diego Oliveira', 'Accountant', 4200.00, '2022-04-18', 'Finance'),
('Elena Pereira', 'Operations Lead', 4800.00, '2020-09-25', 'Operations');

-- Insert fake sales
INSERT INTO sales (customer_id, product_id, employee_id, quantity, unit_price, total_amount, sale_date) VALUES
(1, 1, 1, 2, 4500.00, 9000.00, '2025-11-01'),
(2, 2, 2, 1, 2500.00, 2500.00, '2025-11-02'),
(3, 3, 3, 3, 1200.00, 3600.00, '2025-11-03'),
(4, 4, 1, 1, 1800.00, 1800.00, '2025-11-04'),
(1, 2, 2, 1, 2500.00, 2500.00, '2025-11-05'),
(2, 3, 3, 2, 1200.00, 2400.00, '2025-11-06'),
(5, 5, 1, 5, 50.00, 250.00, '2025-11-07'),
(6, 6, 2, 2, 150.00, 300.00, '2025-11-08'),
(7, 7, 3, 1, 200.00, 200.00, '2025-11-09'),
(8, 8, 1, 3, 80.00, 240.00, '2025-11-10'),
(3, 9, 2, 1, 300.00, 300.00, '2025-11-11'),
(4, 10, 3, 2, 120.00, 240.00, '2025-11-12'),
(1, 4, 1, 1, 1800.00, 1800.00, '2025-11-13'),
(2, 1, 2, 1, 4500.00, 4500.00, '2025-11-14'),
(5, 6, 3, 1, 150.00, 150.00, '2025-11-15');

-- Insert fake invoices
INSERT INTO invoices (supplier_id, amount, issue_date, due_date, paid) VALUES
(1, 25000.00, '2025-10-01', '2025-11-01', TRUE),
(2, 15000.00, '2025-10-15', '2025-11-15', FALSE),
(3, 30000.00, '2025-10-20', '2025-11-20', TRUE),
(4, 10000.00, '2025-11-01', '2025-12-01', FALSE),
(1, 18000.00, '2025-11-05', '2025-12-05', FALSE);

-- Table for query history (chat queries & agent results)
CREATE TABLE query_history (
    id SERIAL PRIMARY KEY,
    session_id VARCHAR(128) DEFAULT 'default',
    question TEXT NOT NULL,
    model VARCHAR(128),
    sql_query TEXT,
    answer TEXT,
    created_at TIMESTAMP DEFAULT NOW()
);

-- Seed some example history rows
INSERT INTO query_history (session_id, question, model, sql_query, answer) VALUES
('dev-session', 'What products do we have and their prices?', 'gpt-5', 'SELECT id, name, price FROM products ORDER BY name;', '1|Notebook Pro|2499.00; 2|Smartphone X|1199.00; 3|Gaming Chair|399.00; 4|4K Monitor|799.00'),
('analytics-session', 'What is the best-selling product this month?', 'gpt-4o', 'SELECT p.name, SUM(pc.quantity) AS sold FROM purchases p JOIN purchase_clothings pc ON p.id = pc.purchase_id JOIN products pr ON pc.product_id = pr.id WHERE date_trunc(''month'', p.created_at) = date_trunc(''month'', current_date) GROUP BY p.name ORDER BY sold DESC LIMIT 1;', 'Smartphone X'),
('finance-session', 'Total revenue in November?', 'gpt-5-mini', 'SELECT SUM(total_amount) FROM purchases WHERE EXTRACT(MONTH FROM created_at) = 11 AND EXTRACT(YEAR FROM created_at) = 2025;', '128450.75'),
('reporting-session', 'Top 3 most expensive products?', 'gpt-4o-mini', 'SELECT id, name, price FROM products ORDER BY price DESC LIMIT 3;', '1|Notebook Pro|2499.00; 5|Workstation Ultra|2199.00; 12|Pro Camera|1999.00'),
('sales-session', 'How many units of Notebook Pro were sold?', 'gpt-5', 'SELECT SUM(quantity) FROM purchase_items WHERE product_name = ''Notebook Pro'' OR product_id = (SELECT id FROM products WHERE name = ''Notebook Pro'');', '34'),
('crm-session', 'How many customers registered?', 'gpt-4o', 'SELECT COUNT(*) FROM customers;', '1,234'),
('crm-session', 'Which customers are from New York?', 'claude-3-5-sonnet-20240620', 'SELECT id, name, city FROM customers WHERE city = ''New York'';', '23 rows (example: 101|John Doe|New York; 203|Veronica Smith|New York)'),
('crm-session', 'Who are the customers who spent the most?', 'gpt-5-mini', 'SELECT c.id, c.name, SUM(p.total_amount) AS total_spent FROM customers c JOIN purchases p ON c.id = p.customer_id GROUP BY c.id, c.name ORDER BY total_spent DESC LIMIT 10;', '201|Acme Corp|45200.00; 145|Bright Co|38950.00; 87|Maria Lopez|21780.50'),
('crm-session', 'List customers registered in last 6 months', 'gpt-4o', 'SELECT id, name, created_at FROM customers WHERE created_at >= (current_date - INTERVAL ''6 months'') ORDER BY created_at DESC;', '12 rows (most recent example: 312|Daniela Cruz|2025-10-04; 311|Lucas Perez|2025-09-21)'),
('hr-session', 'How many employees in Sales?', 'claude-3-5-sonnet-20240620', 'SELECT COUNT(*) FROM employees WHERE department = ''Sales'';', '4'),
('hr-session', 'What is the average salary of employees?', 'gpt-5', 'SELECT ROUND(AVG(salary),2) FROM employees;', '5234.67'),
('hr-session', 'Who is the most senior employee?', 'gpt-4o', 'SELECT id, name, hire_date FROM employees ORDER BY hire_date ASC LIMIT 1;', '12|Fernando Silva|2010-03-15'),
('hr-session', 'List managers and their salaries', 'gpt-5-mini', 'SELECT id, name, title, salary FROM employees WHERE title ILIKE ''%manager%'' ORDER BY name;', '45|Fernanda Lee|Sales Manager|7200.00; 51|Carlos Mendes|Finance Manager|8100.00'),
('budget-session', 'Total company budget for 2025?', 'gpt-4o-mini', 'SELECT SUM(amount) FROM budgets WHERE fiscal_year = 2025;', '2,500,000.00')