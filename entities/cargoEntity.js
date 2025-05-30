export default class CargoEntity {
    #idCargo;
    #descricao;
    #valorSalario;

    constructor(idCargo, descricao, valorSalario) {
        this.#idCargo = idCargo;
        this.#descricao = descricao;
        this.#valorSalario = valorSalario;
    }

    get idCargo() {
        return this.#idCargo;
    }
    set idCargo(value) {
        this.#idCargo = value;
    }

    get descricao() {
        return this.#descricao;
    }
    set descricao(value) {
        this.#descricao = value;
    }

    get valorSalario() {
        return this.#valorSalario;
    }
    set valorSalario(value) {
        this.#valorSalario = value;
    }
}
