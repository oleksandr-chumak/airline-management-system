ALTER SESSION SET CONTAINER = XEPDB1;

CONNECT airline/strongpassword@XEPDB1;

BEGIN
    INSERT INTO flights (flight_number, origin, destination, departure_time, arrival_time, airplane_model, capacity)
    VALUES ('AA101', 'New York', 'Los Angeles', TO_TIMESTAMP('2025-12-01 08:00:00', 'YYYY-MM-DD HH24:MI:SS'),
            TO_TIMESTAMP('2025-12-01 11:30:00', 'YYYY-MM-DD HH24:MI:SS'), 'Boeing 737', 180);

    INSERT INTO flights (flight_number, origin, destination, departure_time, arrival_time, airplane_model, capacity)
    VALUES ('DL202', 'Atlanta', 'Chicago', TO_TIMESTAMP('2025-12-02 09:00:00', 'YYYY-MM-DD HH24:MI:SS'),
            TO_TIMESTAMP('2025-12-02 10:45:00', 'YYYY-MM-DD HH24:MI:SS'), 'Airbus A320', 150);

    INSERT INTO flights (flight_number, origin, destination, departure_time, arrival_time, airplane_model, capacity)
    VALUES ('UA303', 'San Francisco', 'Seattle', TO_TIMESTAMP('2025-12-03 14:00:00', 'YYYY-MM-DD HH24:MI:SS'),
            TO_TIMESTAMP('2025-12-03 15:30:00', 'YYYY-MM-DD HH24:MI:SS'), 'Boeing 737', 160);
END;
/

BEGIN
    INSERT INTO passengers (first_name, last_name, email, phone_number)
    VALUES ('John', 'Doe', 'john.doe@example.com', '123-456-7890');

    INSERT INTO passengers (first_name, last_name, email, phone_number)
    VALUES ('Jane', 'Smith', 'jane.smith@example.com', '987-654-3210');

    INSERT INTO passengers (first_name, last_name, email, phone_number)
    VALUES ('Alice', 'Johnson', 'alice.johnson@example.com', '555-123-4567');
END;
/

BEGIN
    INSERT INTO tickets (flight_id, passenger_id, seat_number, status, purchase_date, price)
    VALUES (1, 1, '12A', 'CONFIRMED', SYSTIMESTAMP, 350.00);

    INSERT INTO tickets (flight_id, passenger_id, seat_number, status, purchase_date, price)
    VALUES (2, 2, '14B', 'CONFIRMED', SYSTIMESTAMP, 200.00);

    INSERT INTO tickets (flight_id, passenger_id, seat_number, status, purchase_date, price)
    VALUES (3, 3, '10C', 'CONFIRMED', SYSTIMESTAMP, 150.00);

    INSERT INTO tickets (flight_id, passenger_id, seat_number, status, purchase_date, price)
    VALUES (1, 2, '12B', 'CONFIRMED', SYSTIMESTAMP, 350.00);
END;
/
