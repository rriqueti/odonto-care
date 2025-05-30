import Database from "../db/database.js";

export default class CargoRepository {
    #database;

    constructor() {
        this.#database = new Database();
    }

    async index() {
        const sql = `
            SELECT 
                idCargo, 
                descricao, 
                valorSalario 
            FROM cargos
        `;
        const [rows] = await this.#database.ExecutaComando(sql);
        return rows;
    }

    async criar(descricao, valorSalario) {
        const sql = `
            INSERT INTO cargos (descricao, valorSalario)
            VALUES (?, ?)
        `;
        
        const [result] = await this.#database.ExecutaComando(sql, [descricao, valorSalario]);

        return { insertId: result.insertId };
    }
}
