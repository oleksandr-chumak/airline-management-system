ALTER SESSION SET CONTAINER = XEPDB1;

CONNECT airline/strongpassword@XEPDB1;

CREATE OR REPLACE PROCEDURE update_purchase_date(
    p_ticket_id IN tickets.ticket_id%TYPE
)
    IS
BEGIN
    UPDATE tickets
    SET purchase_date = SYSTIMESTAMP
    WHERE ticket_id = p_ticket_id;

    IF SQL%ROWCOUNT = 0 THEN
        RAISE_APPLICATION_ERROR(-20001, 'Ticket not found');
    END IF;

    COMMIT;
END;
/

CREATE OR REPLACE PROCEDURE fill_ticket_description
    IS
    -- Cursor to select all distinct airplane models
    CURSOR c_models IS
        SELECT DISTINCT f.airplane_model
        FROM flights f
        WHERE f.airplane_model IS NOT NULL;

    -- Variables to store the current airplane model and list of ticket IDs
    v_model flights.airplane_model%TYPE;
    v_tickets VARCHAR2(4000);
BEGIN
    -- First, clear the description table before filling
    DELETE FROM ticket_descriptions;

    -- Loop through all airplane models
    FOR rec IN c_models LOOP
            v_model := rec.airplane_model;
            v_tickets := '';

            -- Select all tickets belonging to flights of this airplane model
            FOR t IN (
                SELECT t.ticket_id
                FROM tickets t
                         JOIN flights f ON t.flight_id = f.flight_id
                WHERE f.airplane_model = v_model
                ORDER BY t.ticket_id
                )
                LOOP
                    -- Append ticket_id to the list separated by commas
                    v_tickets := v_tickets || t.ticket_id || ',';
                END LOOP;

            -- Remove the trailing comma if the list is not empty
            IF v_tickets IS NOT NULL THEN
                v_tickets := RTRIM(v_tickets, ',');
            END IF;

            -- Insert the record into the description table
            INSERT INTO ticket_descriptions (airplane_model, ticket_list)
            VALUES (v_model, v_tickets);
        END LOOP;
    COMMIT;
END;
/

CREATE OR REPLACE PROCEDURE update_ticket_price (
    p_ticket_id IN tickets.ticket_id%TYPE,
    p_new_price IN tickets.price%TYPE
)
    IS
    v_ticket_count NUMBER;
BEGIN
    SELECT COUNT(*)
    INTO v_ticket_count
    FROM tickets;

    IF v_ticket_count < 10 THEN
        RAISE_APPLICATION_ERROR(-20002, 'Discount not required: less than 10 tickets.');
    END IF;

    UPDATE tickets
    SET price = p_new_price
    WHERE ticket_id = p_ticket_id;

    IF SQL%ROWCOUNT = 0 THEN
        RAISE_APPLICATION_ERROR(-20001, 'Ticket ID not found.');
    END IF;

    COMMIT;
EXCEPTION
    WHEN OTHERS THEN
        ROLLBACK;
        RAISE;
END;
/
