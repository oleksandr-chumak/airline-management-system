ALTER SESSION SET CONTAINER = XEPDB1;

CONNECT airline/strongpassword@XEPDB1;

CREATE OR REPLACE FUNCTION mix_strings(str1 IN VARCHAR2, str2 IN VARCHAR2)
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
END;
/

CREATE OR REPLACE FUNCTION get_cheapest_flight_by_model(model_name IN VARCHAR2)
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
END;
/

CREATE OR REPLACE FUNCTION get_tickets_by_price (
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
END;
/
