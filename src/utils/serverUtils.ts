export default async function faltamVariaveisDeAmbiente (): Promise<boolean> {
  const variaveisObrigatorias = ['DB_TYPE', 'SECRET_JWT', 'SECRET_KEY_CRYPTO', 'DB_PASSWORD', 'DB_DATABASE']
  const variaveisFaltantes = variaveisObrigatorias.filter((variavel) => process.env[variavel] == null)

  if (variaveisFaltantes.length > 0) {
    throw new Error(`As seguintes variáveis de ambiente são obrigatórias: ${variaveisFaltantes.join(', ')}`)
  }

  return false
}
