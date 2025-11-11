ALTER SESSION SET CONTAINER = XEPDB1;

CONNECT airline/strongpassword@XEPDB1;

CREATE OR REPLACE PACKAGE flight_management_pkg IS

    FUNCTION mix_strings(str1 IN VARCHAR2, str2 IN VARCHAR2)
        RETURN VARCHAR2;

    FUNCTION get_cheapest_flight_by_model(model_name IN VARCHAR2)
        RETURN VARCHAR2;

    FUNCTION get_tickets_by_price (p_max_price IN tickets.price%TYPE)
        RETURN VARCHAR2;

    PROCEDURE update_purchase_date(p_ticket_id IN tickets.ticket_id%TYPE);

    PROCEDURE fill_ticket_description;

    PROCEDURE update_ticket_price (p_ticket_id IN tickets.ticket_id%TYPE, p_new_price IN tickets.price%TYPE);

END flight_management_pkg;
/

CREATE OR REPLACE PACKAGE BODY flight_management_pkg IS

    FUNCTION mix_strings(str1 IN VARCHAR2, str2 IN VARCHAR2)
        RETURN VARCHAR2
        IS
        result  VARCHAR2(4000) := '';
        len1    PLS_INTEGER    := LENGTH(str1);
        len2    PLS_INTEGER    := LENGTH(str2);
        max_len PLS_INTEGER    := GREATEST(len1, len2);
    BEGIN
        FOR i IN 1..max_len
            LOOP
                IF i <= len1 THEN
                    result := result || SUBSTR(str1, i, 1);
                END IF;
                IF i <= len2 THEN
                    result := result || SUBSTR(str2, i, 1);
                END IF;
            END LOOP;
        RETURN result;
    END mix_strings;

    FUNCTION get_cheapest_flight_by_model(model_name IN VARCHAR2)
        RETURN VARCHAR2
        IS
        v_flight_number VARCHAR2(10);
    BEGIN
        SELECT flight_number
        INTO v_flight_number
        FROM (SELECT f.flight_number, MIN(t.price) AS min_price
              FROM flights f
                       JOIN tickets t ON f.flight_id = t.flight_id
              WHERE f.airplane_model = model_name
              GROUP BY f.flight_number
              ORDER BY min_price)
        WHERE ROWNUM = 1;

        RETURN v_flight_number;
    EXCEPTION
        WHEN NO_DATA_FOUND THEN
            RETURN NULL;
    END get_cheapest_flight_by_model;

    FUNCTION get_tickets_by_price (
        p_max_price IN tickets.price%TYPE
    )
        RETURN VARCHAR2
        IS
        v_result VARCHAR2(4000);
    BEGIN
        v_result := '';

        FOR rec IN (
            SELECT ticket_id
            FROM tickets
            WHERE price < p_max_price
            ORDER BY ticket_id
            )
            LOOP
                v_result := v_result || rec.ticket_id || ',';
            END LOOP;

        IF v_result IS NOT NULL THEN
            v_result := RTRIM(v_result, ',');
        END IF;

        RETURN v_result;
    END get_tickets_by_price;

    PROCEDURE update_purchase_date(
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
    END update_purchase_date;

    PROCEDURE fill_ticket_description
        IS
        CURSOR c_models IS
            SELECT DISTINCT f.airplane_model
            FROM flights f
            WHERE f.airplane_model IS NOT NULL;

        v_model flights.airplane_model%TYPE;
        v_tickets VARCHAR2(4000);
    BEGIN
        DELETE FROM ticket_descriptions;

        FOR rec IN c_models LOOP
                v_model := rec.airplane_model;
                v_tickets := '';

                FOR t IN (
                    SELECT t.ticket_id
                    FROM tickets t
                             JOIN flights f ON t.flight_id = f.flight_id
                    WHERE f.airplane_model = v_model
                    ORDER BY t.ticket_id
                    )
                    LOOP
                        v_tickets := v_tickets || t.ticket_id || ',';
                    END LOOP;

                IF v_tickets IS NOT NULL THEN
                    v_tickets := RTRIM(v_tickets, ',');
                END IF;

                INSERT INTO ticket_descriptions (airplane_model, ticket_list)
                VALUES (v_model, v_tickets);
            END LOOP;
        COMMIT;
    END fill_ticket_description;

    PROCEDURE update_ticket_price (
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
    END update_ticket_price;

END flight_management_pkg;
/
