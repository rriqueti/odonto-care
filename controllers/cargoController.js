import CargoRepository from '../repositories/cargoRepository.js';

export default class CargoController {
    #cargoRepository;

    constructor() {
        this.#cargoRepository = new CargoRepository();
    }


    async index(req, res) {

        const cargos = await this.#cargoRepository.index();

        if (cargos) {

            return res.status(200).json(cargos);
        }
    }

    catch(error) {
        return res.status(500).json({ error: 'Erro ao listar cargos', detail: error.message });
    }

}
