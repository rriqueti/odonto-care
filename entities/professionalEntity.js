export default class ProfessionalEntity extends BaseEntity {
    #id;
    #name;
    #cpf;
    #email;
    #dateOfBirth;
    #hashedPassword;
    #position;

    constructor(id = 0, name, cpf, email, dateOfBirth, hashedPassword, position) {
        this.#id = id;
        this.#name = name;
        this.#cpf = cpf;
        this.#email = email;
        this.#dateOfBirth = dateOfBirth;
        this.#hashedPassword = hashedPassword;
        this.#position = position;
    }

    // Getters
    get id() {
        return this.#id;
    }

    get name() {
        return this.#name;
    }

    get cpf() {
        return this.#cpf;
    }

    get email() {
        return this.#email;
    }

    get dateOfBirth() {
        return this.#dateOfBirth;
    }

    get hashedPassword() {
        return this.#hashedPassword;
    }

    get position() {
        return this.#position;
    }

    // Setters
    set id(value) {
        this.#id = value;
    }

    set name(value) {
        this.#name = value;
    }

    set cpf(value) {
        this.#cpf = value;
    }

    set email(value) {
        this.#email = value;
    }

    set dateOfBirth(value) {
        this.#dateOfBirth = value;
    }

    set hashedPassword(value) {
        this.#hashedPassword = value;
    }

    set position(value) {
        this.#position = value;
    }
}
