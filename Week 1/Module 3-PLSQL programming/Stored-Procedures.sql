CREATE TABLE SavingsAccounts (
    AccountID NUMBER PRIMARY KEY,
    CustomerName VARCHAR2(50),
    Balance NUMBER(12,2)
);

INSERT INTO SavingsAccounts VALUES (101,'John',10000);
INSERT INTO SavingsAccounts VALUES (102,'Mary',15000);
INSERT INTO SavingsAccounts VALUES (103,'David',20000);

COMMIT;

CREATE OR REPLACE PROCEDURE ProcessMonthlyInterest
AS
BEGIN
    UPDATE SavingsAccounts
    SET Balance = Balance + (Balance * 0.01);

    COMMIT;

    DBMS_OUTPUT.PUT_LINE('Monthly interest processed successfully.');
END;
/

EXEC ProcessMonthlyInterest;

SELECT * FROM SavingsAccounts;

CREATE TABLE Employees (
    EmployeeID NUMBER PRIMARY KEY,
    EmployeeName VARCHAR2(50),
    Department VARCHAR2(20),
    Salary NUMBER(10,2)
);
INSERT INTO Employees VALUES (1,'Arun','IT',50000);
INSERT INTO Employees VALUES (2,'Kumar','IT',60000);
INSERT INTO Employees VALUES (3,'Priya','HR',45000);

COMMIT;

CREATE OR REPLACE PROCEDURE UpdateEmployeeBonus(
    p_department IN VARCHAR2,
    p_bonus_percent IN NUMBER
)
AS
BEGIN
    UPDATE Employees
    SET Salary = Salary + (Salary * p_bonus_percent / 100)
    WHERE Department = p_department;

    COMMIT;

    DBMS_OUTPUT.PUT_LINE('Employee bonus updated successfully.');
END;
/

EXEC UpdateEmployeeBonus('IT',10);

SELECT * FROM Employees;

CREATE TABLE BankAccounts (
    AccountID NUMBER PRIMARY KEY,
    CustomerName VARCHAR2(50),
    Balance NUMBER(12,2)
);
INSERT INTO BankAccounts VALUES (1001,'John',25000);
INSERT INTO BankAccounts VALUES (1002,'Mary',15000);

COMMIT;

CREATE OR REPLACE PROCEDURE TransferFunds(
    p_from_account IN NUMBER,
    p_to_account IN NUMBER,
    p_amount IN NUMBER
)
AS
    v_balance NUMBER;
BEGIN

    SELECT Balance
    INTO v_balance
    FROM BankAccounts
    WHERE AccountID = p_from_account;

    IF v_balance >= p_amount THEN

        UPDATE BankAccounts
        SET Balance = Balance - p_amount
        WHERE AccountID = p_from_account;

        UPDATE BankAccounts
        SET Balance = Balance + p_amount
        WHERE AccountID = p_to_account;

        COMMIT;

        DBMS_OUTPUT.PUT_LINE('Fund transfer successful.');

    ELSE

        DBMS_OUTPUT.PUT_LINE('Insufficient balance.');

    END IF;

END;
/

EXEC TransferFunds(1001,1002,5000);

SELECT * FROM BankAccounts;