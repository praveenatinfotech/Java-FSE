CREATE TABLE Customers (
    CustomerID NUMBER PRIMARY KEY,
    Name VARCHAR2(50),
    Age NUMBER,
    Balance NUMBER(10,2),
    IsVIP VARCHAR2(5)
);

CREATE TABLE Loans (
    LoanID NUMBER PRIMARY KEY,
    CustomerID NUMBER,
    InterestRate NUMBER(5,2),
    DueDate DATE,
    CONSTRAINT fk_customer
        FOREIGN KEY (CustomerID)
        REFERENCES Customers(CustomerID)
);
SELECT TABLE_NAME
FROM USER_TABLES
WHERE TABLE_NAME IN ('CUSTOMERS','LOANS');

INSERT INTO Customers VALUES (1,'John',65,12000,'FALSE');
INSERT INTO Customers VALUES (2,'Mary',45,8000,'FALSE');
INSERT INTO Customers VALUES (3,'David',70,15000,'FALSE');
INSERT INTO Customers VALUES (4,'Sarah',55,5000,'FALSE');

INSERT INTO Loans VALUES (101,1,8.5,SYSDATE+10);
INSERT INTO Loans VALUES (102,2,9.0,SYSDATE+40);
INSERT INTO Loans VALUES (103,3,7.5,SYSDATE+20);
INSERT INTO Loans VALUES (104,4,8.0,SYSDATE+5);

COMMIT;


SELECT * FROM CUSTOMERS;
SELECT * FROM LOANS;

BEGIN
    FOR rec IN (
        SELECT l.LoanID
        FROM Customers c
        JOIN Loans l
        ON c.CustomerID = l.CustomerID
        WHERE c.Age > 60
    )
    LOOP
        UPDATE Loans
        SET InterestRate = InterestRate - 1
        WHERE LoanID = rec.LoanID;
    END LOOP;

    COMMIT;

    DBMS_OUTPUT.PUT_LINE('Discount applied successfully.');
END;
/

SELECT * FROM Loans;


BEGIN
    FOR rec IN (
        SELECT CustomerID
        FROM Customers
        WHERE Balance > 10000
    )
    LOOP
        UPDATE Customers
        SET IsVIP = 'TRUE'
        WHERE CustomerID = rec.CustomerID;
    END LOOP;

    COMMIT;

    DBMS_OUTPUT.PUT_LINE('VIP customers updated.');
END;
/
SELECT * FROM Customers;

BEGIN
    FOR rec IN (
        SELECT c.Name,
               l.LoanID,
               l.DueDate
        FROM Customers c
        JOIN Loans l
        ON c.CustomerID = l.CustomerID
        WHERE l.DueDate BETWEEN SYSDATE
                            AND SYSDATE + 30
    )
    LOOP
        DBMS_OUTPUT.PUT_LINE(
            'Reminder: Loan '
            || rec.LoanID
            || ' for '
            || rec.Name
            || ' is due on '
            || TO_CHAR(rec.DueDate,'DD-MON-YYYY')
        );
    END LOOP;
END;
/