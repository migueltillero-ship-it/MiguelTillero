-- ============================================================
-- MÓDULO DE CONTROL DE ASISTENCIA Y SALDO DE HORAS
-- Esquema SQL (compatible MySQL 8+ / MariaDB 10.5+)
-- Profesor Miguel Tillero — Clases de Francés
-- ============================================================

-- ------------------------------------------------------------
-- 1. ESTUDIANTES
-- ------------------------------------------------------------
CREATE TABLE students (
    student_id      INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    full_name       VARCHAR(150) NOT NULL,
    email           VARCHAR(150) NOT NULL UNIQUE,
    phone           VARCHAR(30),
    preferred_lang  ENUM('es','en','fr') NOT NULL DEFAULT 'es',
    created_at      TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- ------------------------------------------------------------
-- 2. CONTRATOS / PAQUETES DE HORAS (Student_Contracts)
-- ------------------------------------------------------------
CREATE TABLE student_contracts (
    contract_id             INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    student_id              INT UNSIGNED NOT NULL,
    total_contracted_hours  DECIMAL(6,2) NOT NULL,          -- ej. 10, 20, 40
    consumed_hours          DECIMAL(6,2) NOT NULL DEFAULT 0,
    weekly_frequency        TINYINT UNSIGNED NOT NULL DEFAULT 2,  -- sesiones/semana
    session_duration_hours  DECIMAL(4,2) NOT NULL DEFAULT 1.0,    -- duración estándar
    start_date              DATE NOT NULL,
    projected_end_date      DATE NOT NULL,                  -- recalculable (Flujo B)
    original_end_date       DATE NOT NULL,                  -- fecha pactada inicial (auditoría)
    status                  ENUM('active','completed','suspended','cancelled')
                            NOT NULL DEFAULT 'active',
    created_at              TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at              TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
                            ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT fk_contract_student
        FOREIGN KEY (student_id) REFERENCES students(student_id),
    CONSTRAINT chk_consumed CHECK (consumed_hours <= total_contracted_hours)
);

-- Saldo de horas siempre disponible como columna calculada
ALTER TABLE student_contracts
    ADD COLUMN remaining_hours DECIMAL(6,2)
    GENERATED ALWAYS AS (total_contracted_hours - consumed_hours) STORED;

-- ------------------------------------------------------------
-- 3. SESIONES DE CLASE (Class_Sessions)
-- ------------------------------------------------------------
CREATE TABLE class_sessions (
    session_id          INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    contract_id         INT UNSIGNED NOT NULL,
    session_date        DATETIME NOT NULL,
    duration_hours      DECIMAL(4,2) NOT NULL DEFAULT 1.0,
    attendance_status   ENUM('scheduled',            -- programada, aún sin registrar
                             'present',              -- asistió → descuenta horas
                             'unjustified_absence',  -- falta sin aviso → descuenta horas
                             'justified_absence',    -- falta justificada → NO descuenta
                             'makeup')               -- clase de reposición (Flujo A)
                        NOT NULL DEFAULT 'scheduled',
    -- Vinculación de reposiciones: una sesión 'makeup' apunta a la
    -- sesión 'justified_absence' que repone.
    makeup_of_session_id INT UNSIGNED NULL,
    notes               VARCHAR(500),
    recorded_at         TIMESTAMP NULL,             -- cuándo se registró la asistencia
    created_at          TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_session_contract
        FOREIGN KEY (contract_id) REFERENCES student_contracts(contract_id),
    CONSTRAINT fk_makeup_session
        FOREIGN KEY (makeup_of_session_id) REFERENCES class_sessions(session_id),
    INDEX idx_sessions_contract_date (contract_id, session_date)
);

-- ------------------------------------------------------------
-- 4. RESOLUCIÓN DE AUSENCIAS JUSTIFICADAS (selector Flujo A / B)
--    Cada justified_absence DEBE tener exactamente una resolución.
-- ------------------------------------------------------------
CREATE TABLE absence_resolutions (
    resolution_id       INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    session_id          INT UNSIGNED NOT NULL UNIQUE,   -- la sesión justificada
    flow_type           ENUM('A_weekly_makeup','B_calendar_shift') NOT NULL,
    -- Flujo A: sesión de reposición creada
    makeup_session_id   INT UNSIGNED NULL,
    -- Flujo B: fechas antes/después del recálculo (auditoría)
    previous_end_date   DATE NULL,
    new_end_date        DATE NULL,
    resolved_by         VARCHAR(100) NOT NULL,          -- usuario/admin que decidió
    resolved_at         TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_resolution_session
        FOREIGN KEY (session_id) REFERENCES class_sessions(session_id),
    CONSTRAINT fk_resolution_makeup
        FOREIGN KEY (makeup_session_id) REFERENCES class_sessions(session_id)
);

-- ------------------------------------------------------------
-- 5. BITÁCORA DE NOTIFICACIONES
-- ------------------------------------------------------------
CREATE TABLE notification_log (
    notification_id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    contract_id     INT UNSIGNED NOT NULL,
    session_id      INT UNSIGNED NULL,
    recipient_type  ENUM('student','teacher') NOT NULL,
    channel         ENUM('email','sms','whatsapp') NOT NULL,
    template_code   VARCHAR(50) NOT NULL,   -- ej. 'FLUJO_A_STUDENT', 'FLUJO_B_TEACHER'
    sent_at         TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    payload_json    JSON,                   -- campos interpolados en la plantilla
    CONSTRAINT fk_notif_contract
        FOREIGN KEY (contract_id) REFERENCES student_contracts(contract_id),
    CONSTRAINT fk_notif_session
        FOREIGN KEY (session_id) REFERENCES class_sessions(session_id)
);

-- ============================================================
-- TRIGGER: descuento automático de horas al registrar asistencia
--
-- Regla de negocio:
--   present / unjustified_absence → suma duration_hours a consumed_hours
--   justified_absence             → NO descuenta; queda pendiente de
--                                   resolución (Flujo A o B) en
--                                   absence_resolutions
--   makeup                        → descuenta al marcarse 'present'
--                                   (la reposición se registra como una
--                                   nueva sesión que luego pasa a present)
-- ============================================================
DELIMITER $$

CREATE TRIGGER trg_session_attendance_update
AFTER UPDATE ON class_sessions
FOR EACH ROW
BEGIN
    -- Solo actuar cuando el estatus cambia desde 'scheduled'/'makeup'
    IF OLD.attendance_status IN ('scheduled','makeup')
       AND NEW.attendance_status IN ('present','unjustified_absence') THEN

        UPDATE student_contracts
           SET consumed_hours = consumed_hours + NEW.duration_hours
         WHERE contract_id = NEW.contract_id;

        -- Cierre automático del contrato al agotar horas
        UPDATE student_contracts
           SET status = 'completed'
         WHERE contract_id = NEW.contract_id
           AND consumed_hours >= total_contracted_hours
           AND status = 'active';
    END IF;

    -- Reversa: si un registro se corrige de present → justified_absence
    IF OLD.attendance_status IN ('present','unjustified_absence')
       AND NEW.attendance_status = 'justified_absence' THEN

        UPDATE student_contracts
           SET consumed_hours = consumed_hours - OLD.duration_hours,
               status = 'active'
         WHERE contract_id = NEW.contract_id;
    END IF;
END$$

DELIMITER ;
