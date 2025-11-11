ALTER SESSION SET CONTAINER = XEPDB1;

CONNECT airline/strongpassword@XEPDB1;

CREATE SEQUENCE audit_seq start with 1 INCREMENT BY 1;
CREATE SEQUENCE flight_seq START WITH 1 INCREMENT BY 1;
CREATE SEQUENCE passenger_seq START WITH 1 INCREMENT BY 1;
CREATE SEQUENCE ticket_seq START WITH 1 INCREMENT BY 1;

CREATE TABLE audits
(
    command_id  NUMBER PRIMARY KEY,
    table_name  VARCHAR2(50) NOT NULL,
    action_date VARCHAR2(50) NOT NULL,
    command     VARCHAR2(10) NOT NULL
);

CREATE TABLE flights
(
    flight_id      NUMBER PRIMARY KEY,
    flight_number  VARCHAR2(10) NOT NULL,
    origin         VARCHAR2(50) NOT NULL,
    destination    VARCHAR2(50) NOT NULL,
    departure_time TIMESTAMP    NOT NULL,
    arrival_time   TIMESTAMP    NOT NULL,
    airplane_model VARCHAR2(50),
    capacity       NUMBER
);

CREATE TABLE passengers
(
    passenger_id NUMBER PRIMARY KEY,
    first_name   VARCHAR2(50) NOT NULL,
    last_name    VARCHAR2(50) NOT NULL,
    email        VARCHAR2(100),
    phone_number VARCHAR2(20)
);

CREATE TABLE tickets
(
    ticket_id     NUMBER PRIMARY KEY,
    flight_id     NUMBER        NOT NULL,
    passenger_id  NUMBER        NOT NULL,
    seat_number   VARCHAR2(5)   NOT NULL,
    status        VARCHAR2(20),
    purchase_date TIMESTAMP,
    price         NUMBER(10, 2) NOT NULL,
    CONSTRAINT fk_flight FOREIGN KEY (flight_id) REFERENCES flights (flight_id) ON DELETE CASCADE,
    CONSTRAINT fk_passenger FOREIGN KEY (passenger_id) REFERENCES passengers (passenger_id) ON DELETE CASCADE,
    CONSTRAINT uk_seat UNIQUE (flight_id, seat_number)
);

CREATE TABLE ticket_descriptions
(
    airplane_model VARCHAR2(50),
    ticket_list    VARCHAR2(4000)
);

CREATE OR REPLACE TRIGGER flight_trigger
    BEFORE INSERT
    ON flights
    FOR EACH ROW
BEGIN
    IF :NEW.flight_id IS NULL THEN
        SELECT flight_seq.NEXTVAL INTO :NEW.flight_id FROM DUAL;
    END IF;
END;
/

CREATE OR REPLACE TRIGGER passenger_trigger
    BEFORE INSERT
    ON passengers
    FOR EACH ROW
BEGIN
    IF :NEW.passenger_id IS NULL THEN
        SELECT passenger_seq.NEXTVAL INTO :NEW.passenger_id FROM DUAL;
    END IF;
END;
/

CREATE OR REPLACE TRIGGER ticket_trigger
    BEFORE INSERT
    ON tickets
    FOR EACH ROW
BEGIN
    IF :NEW.ticket_id IS NULL THEN
        SELECT ticket_seq.NEXTVAL INTO :NEW.ticket_id FROM DUAL;
    END IF;
END;
/

CREATE OR REPLACE TRIGGER audit_tickets_trigger
    AFTER INSERT OR UPDATE OR DELETE ON tickets
    FOR EACH ROW
DECLARE
    v_command VARCHAR2(10);
BEGIN
    IF INSERTING THEN
        v_command := 'Insert';
    ELSIF UPDATING THEN
        v_command := 'Update';
    ELSIF DELETING THEN
        v_command := 'Delete';
    END IF;

    INSERT INTO audits (command_id,table_name, action_date, command)
    VALUES (audit_seq.NEXTVAL, 'TICKETS', TO_CHAR(SYSDATE), v_command);
END;
/

CREATE OR REPLACE TRIGGER check_ticket_price_trigger
    BEFORE INSERT OR UPDATE OF price ON tickets
    FOR EACH ROW
BEGIN
    IF :NEW.price < 10 THEN
        RAISE_APPLICATION_ERROR(-20001, 'Error: Ticket price cannot be less than 10. Entered price: ' || :NEW.price);
    END IF;
END;
/