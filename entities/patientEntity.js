export default class PatientEntity {
    #idPaciente;
    #nomeCompleto;
    #cpf;
    #email;
    #dataNascimento;
    #status;
    #telefone;
    #password;

    constructor(
        idPaciente,
        nomeCompleto,
        cpf,
        email,
        dataNascimento,
        status,
        telefone,
        password
    ) {
        this.#idPaciente = idPaciente;
        this.#nomeCompleto = nomeCompleto;
        this.#cpf = cpf;
        this.#email = email;
        this.#dataNascimento = dataNascimento;
        this.#status = status;
        this.#telefone = telefone;
        this.#password = password;
    }

    // Getters
    get idPaciente() { return this.#idPaciente; }
    get nomeCompleto() { return this.#nomeCompleto; }
    get cpf() { return this.#cpf; }
    get email() { return this.#email; }
    get dataNascimento() { return this.#dataNascimento; }
    get status() { return this.#status; }
    get telefone() { return this.#telefone; }
    get password() { return this.#password; }

    // Setters
    set idPaciente(value) { this.#idPaciente = value; }
    set nomeCompleto(value) { this.#nomeCompleto = value; }
    set cpf(value) { this.#cpf = value; }
    set email(value) { this.#email = value; }
    set dataNascimento(value) { this.#dataNascimento = value; }
    set status(value) { this.#status = value; }
    set telefone(value) { this.#telefone = value; }
    set password(value) { this.#password = value; }
}
