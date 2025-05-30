import PatientEntity from "../entities/patientEntity.js";
import PatientRepository from "../repositories/patientRepository.js";

export default class PatientController {
    #patientRepository;
    #patientEntity;

    constructor() {
        this.#patientRepository = new PatientRepository();
        this.#patientEntity = new PatientEntity();
    }

    async index(req, res) {
        const result = await this.#patientRepository.listActive();
        const patients = result.map(p => ({
            idPaciente: p.idPaciente,
            nomeCompleto: p.nomeCompleto,
            cpf: p.cpf,
            email: p.email,
            dataNascimento: p.dataNascimento,
            status: p.status,
            telefone: p.telefone
        }));
        if (patients.length > 0) {
            return res.status(200).json({ msg: 'Pacientes encontrados', patients });
        }
        return res.status(404).json({ msg: 'Nenhum paciente encontrado' });
    }

    async create(req, res) {
        const { nomeCompleto, cpf, email, dataNascimento, status, telefone, password } = req.body;
        const patient = new PatientEntity(
            null, nomeCompleto, cpf, email, dataNascimento, status, telefone, password
        );
        const created = await this.#patientRepository.create(patient);
        if (created) {
            return res.status(201).json({ msg: 'Paciente criado com sucesso', patient: created });
        } else {
            return res.status(400).json({ msg: 'Erro ao criar paciente' });
        }
    }

    async update(req, res) {
        const { idPaciente, nomeCompleto, cpf, email, dataNascimento, status, telefone, password } = req.body;
        const patient = new PatientEntity(
            idPaciente, nomeCompleto, cpf, email, dataNascimento, status, telefone, password
        );
        const updated = await this.#patientRepository.update(patient);
        if (updated) {
            return res.status(200).json({ msg: 'Paciente atualizado com sucesso' });
        } else {
            return res.status(404).json({ msg: 'Paciente não encontrado' });
        }
    }

    async softDelete(req, res) {
        const { idPaciente } = req.body;
        const deleted = await this.#patientRepository.softDelete(idPaciente);
        if (deleted) {
            return res.status(200).json({ msg: 'Paciente inativado com sucesso' });
        } else {
            return res.status(404).json({ msg: 'Paciente não encontrado' });
        }
    }

    async getById(req, res) {
        const { id } = req.params;
        const patient = await this.#patientRepository.getById(id);
        if (patient) {
            return res.status(200).json(patient);
        } else {
            return res.status(404).json({ msg: 'Paciente não encontrado' });
        }
    }
}
