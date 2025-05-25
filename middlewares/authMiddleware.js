import jwt from "jsonwebtoken";
import ProfessionalRepository from "../repositories/professionalRepository.js";

const SECRET = process.env.JWT_SECRET || "@@S3GR3D0@@";
const TOKEN_EXPIRES_IN = "2h"; // use string para clareza e padrão do JWT

export default class AuthMiddleware {
  generateToken(id, email, nome, cargo, datacadastro) {
    return jwt.sign({ id, email, nome, cargo, datacadastro }, SECRET, {
      expiresIn: TOKEN_EXPIRES_IN,
    });
  }

  static async validate(req, res, next) {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({ msg: "Token de acesso não foi enviado!" });
    }

    const [, token] = authHeader.split(" ");

    if (!token) {
      return res.status(401).json({ msg: "Token de acesso ausente!" });
    }

    let usuarioToken;

    try {
      usuarioToken = jwt.verify(token, SECRET);
    } catch (err) {
      if (err.name === "TokenExpiredError") {
        try {
          usuarioToken = jwt.verify(token, SECRET, { ignoreExpiration: true });
          // Reemissão automática do token (opcional, considerar riscos)
          const novoToken = AuthMiddleware.generateToken(usuarioToken);
          res.setHeader("authorization", `Bearer ${novoToken}`);
        } catch {
          return res.status(401).json({ msg: "Token inválido" });
        }
      } else {
        return res.status(401).json({ msg: "Token inválido" });
      }
    }

    // Busca usuário no banco
    const repoUsuario = new ProfessionalRepository();
    const usuarioBanco = await repoUsuario.ObterUsuarioLogin(usuarioToken.id);

    if (!usuarioBanco || usuarioBanco.length === 0) {
      return res.status(401).json({ msg: "Usuário inexistente!" });
    }

    req.usuarioLogado = usuarioBanco[0];
    next();
  }
}
