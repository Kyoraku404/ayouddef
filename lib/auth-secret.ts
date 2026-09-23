export function getAuthSecret(kind: "zaky" | "ocn") {
  const secret = kind === "ocn" ? process.env.OCN_AUTH_SECRET : process.env.AUTH_SECRET;
  if (!secret || secret.length < 32) throw new Error("Configure a random authentication secret of at least 32 characters");
  return new TextEncoder().encode(secret);
}
