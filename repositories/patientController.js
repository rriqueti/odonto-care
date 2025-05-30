import Database from "../db/database.js";
import PatientEntity from "../entities/patientEntity.js";

export default class PatientRepository {
    #database;

    constructor() {
        this.#database = new Database();
    }

    // Create
    async create(patient) {
        const sql = `
            INSERT INTO tbPaciente (
                nomeCompleto, CPF, email, dataNascimento, status, telefone, password
            ) VALUES (?, ?, ?, ?, ?, ?, ?)
        `;
        const values = [
            patient.nomeCompleto,
            patient.cpf,
            patient.email,
            patient.dataNascimento,
            patient.status,
            patient.telefone,
            patient.password,
        ];
        const result = await this.#database.ExecutaComandoNonQuery(sql, values);
        if (result.insertId) {
            return await this.getById(result.insertId);
        }
        return null;
    }

    // Read - listar todos ativos
    async listActive() {
        const sql = `SELECT * FROM tbPaciente WHERE status = 1`;
        const rows = await this.#database.ExecutaComando(sql);
        return rows.map(row =>
            new PatientEntity(
                row["idPaciente"],
                row["nomeCompleto"],
                row["CPF"],
                row["email"],
                row["dataNascimento"],
                row["status"],
                row["telefone"],
                row["password"]
            )
        );
    }

    // Read - buscar por ID
    async getById(id) {
        const sql = `SELECT * FROM tbPaciente WHERE idPaciente = ?`;
        const values = [id];
        const rows = await this.#database.ExecutaComando(sql, values);
        if (rows.length > 0) {
            const row = rows[0];
            return new PatientEntity(
                row["idPaciente"],
                row["nomeCompleto"],
                row["CPF"],
                row["email"],
                row["dataNascimento"],
                row["status"],
                row["telefone"],
                row["password"]
            );
        }
        return null;
    }

    // Update
    async update(patient) {
        const sql = `
            UPDATE tbPaciente SET
                nomeCompleto = ?,
                CPF = ?,
                email = ?,
                dataNascimento = ?,
                status = ?,
                telefone = ?,
                password = ?
            WHERE idPaciente = ?
        `;
        const values = [
            patient.nomeCompleto,
            patient.cpf,
            patient.email,
            patient.dataNascimento,
            patient.status,
            patient.telefone,
            patient.password,
            patient.idPaciente
        ];
        const result = await this.#database.ExecutaComandoNonQuery(sql, values);
        return result.affectedRows > 0;
    }

    // Delete lógico (soft delete)
    async softDelete(id) {
        const sql = `UPDATE tbPaciente SET status = 0 WHERE idPaciente = ?`;
        const values = [id];
        const result = await this.#database.ExecutaComandoNonQuery(sql, values);
        return result.affectedRows > 0;
    }

    // Buscar por email (exemplo para login)
    async getByEmail(email) {
        const sql = `SELECT * FROM tbPaciente WHERE email = ? AND status = 1`;
        const values = [email];
        const rows = await this.#database.ExecutaComando(sql, values);
        if (rows.length > 0) {
            const row = rows[0];
            return new PatientEntity(
                row["idPaciente"],
                row["nomeCompleto"],
                row["CPF"],
                row["email"],
                row["dataNascimento"],
                row["status"],
                row["telefone"],
                row["password"]
            );
        }
        return null;
    }
}
