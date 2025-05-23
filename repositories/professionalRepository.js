import Database from "../db/database.js";
import ProfessionalEntity from "../entities/professionalEntity.js";

export default class ProfessionalRepository {
  #database;

  constructor() {
    this.#database = new Database();
  }

  async create(profissional) {
    let sql = `
      INSERT INTO tbProfissional (
        nomeCompleto, 
        CPF, 
        email, 
        dataNascimento, 
        status, 
        password, 
        tbCargo_idCargo
      ) VALUES (
        ?, ?, ?, ?, ?, ?, ?
      );`;

    let values = [
      profissional.nomeCompleto,
      profissional.CPF,
      profissional.email,
      profissional.dataNascimento,
      profissional.status,
      profissional.password,
      profissional.tbCargo_idCargo,
    ];

    let result = await this.#database.ExecutaComandoNonQuery(sql, values);

    return result;
  }


  async listar() {
    let sql = `SELECT * FROM tbProfissional WHERE status = 1;`;

    let result = await this.#database.ExecutaComando(sql);

    let arr = [];

    for (const profissional of result) {
      arr.push({
        id: profissional.idProfissional,
        nome: profissional.nomeCompleto,
        cpf: profissional.CPF,
        email: profissional.email,
        dataNascimento: profissional.dataNascimento,
        status: profissional.status,
        password: profissional.password,
        tbCargo_idCargo: profissional.tbCargo_idCargo
      });
    }

    return arr;
  }


  async alterar(usuario) {
    let sql = `UPDATE tb_usuario SET usu_email = ?, usu_nome = ?, usu_senha = ? WHERE usu_id = ?;`;

    let values = [usuario.email, usuario.nome, usuario.senha, usuario.id];

    let result = await this.#database.ExecutaComandoNonQuery(sql, values);

    return result;
  }

  async deletar(id) {
    let sql = `UPDATE tb_usuario SET usu_status = 0 WHERE usu_id = ?;`;

    let values = [id];

    let result = await this.#database.ExecutaComandoNonQuery(sql, values);

    return result;
  }

  async ObterUsuarioLogin(id) {
    let sql = `SELECT * FROM tb_usuario WHERE usu_id = ?`;
    let valores = [id];
    let rows = await this.#database.ExecutaComando(sql, valores);
    let lista = [];
    if (rows.length > 0) {
      let row = rows[0];
      lista.push(
        new ProfessionalEntity(
          row["usu_id"],
          row["usu_email"],
          row["usu_nome"],
          row["usu_senha"],
          row["usu_datacadastro"]
        )
      );
      return lista;
    }
    return null;
  }

  async holdPassword(email) {
    const sql = `SELECT usu_senha FROM tb_usuario WHERE usu_email = ?`;
    const valores = [email];
    const result = await this.#database.ExecutaComando(sql, valores);

    if (result.length > 0) {
      const senha = result[0]["usu_senha"];
      return senha;
    }

    return null;
  }

  async authValidate(email, password) {
    let sql = `SELECT * FROM tb_usuario WHERE usu_email = ? AND usu_senha = ?`;
    let valores = [email, senha];
    let rows = await this.#database.ExecutaComando(sql, valores);
    let lista = [];
    if (rows.length > 0) {
      let row = rows[0];
      lista.push({
        id: row["usu_id"],
        email: row["usu_email"],
        nome: row["usu_nome"],
        datacadastro: row["usu_datacadastro"],
      });
      return lista;
    }
    return null;
  }

  async perfil(id) {
    let sql = 'SELECT usu_id, usu_email, usu_nome, usu_datacadastro FROM tb_usuario WHERE usu_id = ?';
    let valores = [id];
    let resultado = await this.#database.ExecutaComando(sql, valores);
    let lista = [];
    if (resultado.length > 0) {
      return {
        id: resultado[0]['usu_id'],
        email: resultado[0]['usu_email'],
        nome: resultado[0]['usu_nome'],
        dataCadastro: resultado[0]['usu_datacadastro']
      }
    }
    return null;
  }
}
