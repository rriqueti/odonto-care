import { z } from "zod";
import BaseEntity from "./BaseEntity.js";

export default class ProfessionalEntity extends BaseEntity {
    #id;
    #name;
    #cpf;
    #email;
    #dateOfBirth;
    #hashedPassword;
    #position;

    constructor(id = 0, name, cpf, email, dateOfBirth, hashedPassword, position) {
        super();
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

    async dataValidate({ params }) {
        const Profesionals = z.object({
            name: z.string().min(3, "O nome deve ter pelo menos 3 caracteres"),
            cpf: z.string().length(11, "O CPF deve ter 11 caracteres"),
            email: z.string().email("Campo de e-mail inválido"),
            dateOfBirth: z.string().regex(/^\d{2}-\d{2}-\d{4}$/, "Data de nascimento inválida"),
            password: z.string().min(3, "A senha deve ter pelo menos 6 caracteres"),
            position: z.number().int().positive("Cargo inválido"),
        })

        let result = Profesionals.safeParse(params)

        if (!result.success) {
            console.log(result.error.format());
            return result.error.format()
        }
        
        return params;
    }
}
