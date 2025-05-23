import bcrypt from "bcrypt";

export async function hashGenerate(senha) {
  const hash = await bcrypt.hash(senha, 15);
  return hash;
}

export async function passwordCheck(senha, hash) {
  const senhaValida = await bcrypt.compare(senha, hash);
  return senhaValida;
}
