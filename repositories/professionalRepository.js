import Database from "../db/database.js";
import ProfessionalEntity from "../entities/professionalEntity.js";

export default class ProfessionalRepository {
  #database;

  constructor() {
    this.#database = new Database();
  }

  async create(professional) {
    let sql = `
      INSERT INTO tbProfissional (
        nomeCompleto, 
        CPF, 
        email, 
        dataNascimento, 
        status, 
        password, 
        tbCargo_idCargo
      ) VALUES (?, ?, ?, ?, ?, ?, ?);
    `;

    let values = [
      professional.name,
      professional.cpf,
      professional.email,
      professional.dateOfBirth,
      1,
      professional.hashedPassword,
      professional.position,
    ];

    let result = await this.#database.ExecutaComandoNonQuery(sql, values);

    return result;
  }

  async listActive() {
    let sql = `SELECT * FROM tbProfissional WHERE status = 1;`;

    let result = await this.#database.ExecutaComando(sql);

    let arr = [];

    for (const row of result) {
      arr.push(
        new ProfessionalEntity(
          row["idProfissional"],
          row["nomeCompleto"],
          row["CPF"],
          row["email"],
          row["dataNascimento"],
          row["password"],
          row["tbCargo_idCargo"]
        )
      );
    }

    return arr;
  }

  async update(professional) {
    let sql = `
      UPDATE tbProfissional
      SET email = ?, nomeCompleto = ?, password = ?, tbCargo_idCargo = ?
      WHERE idProfissional = ?;
    `;

    let values = [
      professional.email,
      professional.name,
      professional.hashedPassword,
      professional.position,
      professional.id,
    ];

    let result = await this.#database.ExecutaComandoNonQuery(sql, values);
    return result;
  }

  async softDelete(id) {
    let sql = `UPDATE tbProfissional SET status = 0 WHERE idProfissional = ?;`;

    let values = [id];

    let result = await this.#database.ExecutaComandoNonQuery(sql, values);
    return result;
  }

  async getById(id) {
    let sql = `SELECT * FROM tbProfissional WHERE idProfissional = ?`;
    let values = [id];
    let rows = await this.#database.ExecutaComando(sql, values);

    if (rows.length > 0) {
      let row = rows[0];
      return new ProfessionalEntity(
        row["idProfissional"],
        row["nomeCompleto"],
        row["CPF"],
        row["email"],
        row["dataNascimento"],
        row["password"],
        row["tbCargo_idCargo"]
      );
    }
    return null;
  }

  async getPasswordByEmail(email) {

    const sql = `SELECT * FROM tbProfissional WHERE email = ? ORDER BY idProfissional DESC LIMIT 1`;
    const values = [email];
    const result = await this.#database.ExecutaComando(sql, values);

    if(result) return result[0]

    throw new Error("Profissional não encontrado");
  }

  async validateAuth(email, password) {
    let sql = `SELECT * FROM tbProfissional WHERE email = ? AND password = ? AND status = 1`;
    let values = [email, password];
    let rows = await this.#database.ExecutaComando(sql, values);

    if (rows.length > 0) {
      let row = rows[0];
      return new ProfessionalEntity(
        row["idProfissional"],
        row["nomeCompleto"],
        row["CPF"],
        row["email"],
        row["dataNascimento"],
        row["password"],
        row["tbCargo_idCargo"]
      );
    }
    return null;
  }

  async getProfile(id) {
    let sql = `
      SELECT idProfissional, email, nomeCompleto, timestamp_cadastro
      FROM tbProfissional
      WHERE idProfissional = ?`;
    let values = [id];
    let result = await this.#database.ExecutaComando(sql, values);

    if (result.length > 0) {
      let row = result[0];
      return {
        id: row["idProfissional"],
        email: row["email"],
        name: row["nomeCompleto"],
        registrationTimestamp: row["timestamp_cadastro"],
      };
    }
    return null;
  }
}
