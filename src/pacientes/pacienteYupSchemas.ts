import * as Yup from 'yup'
import cep from 'cep-promise'
import { cpf } from 'cpf-cnpj-validator'

const nomesInvalidos = ['admin', 'root', 'senha', 'teste']
const estadosValidos = ['AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA', 'MT', 'MS', 'MG', 'PA', 'PB', 'PR', 'PE', 'PI', 'RJ', 'RN', 'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO']
const acceptedFormats = ['.jpeg', '.jpg', '.png']
// const maxSize = 10 * 1024 * 1024 // 10MB

export const schemaCriarPaciente = Yup.object().shape({
  cpf: Yup.string()
    .required()
    .test('cpf-valido', 'CPF inválido', function (value) {
      const formatCPF = cpf.format(value)
      return formatCPF !== null
    }),

  nome: Yup.string()
    .required('Por favor, insira um nome')
    .matches(/^[a-zA-ZÀ-ú]+([ ][a-zA-ZÀ-ú]+)*([-][a-zA-ZÀ-ú]+)*$/, 'Por favor, insira um nome válido')
    .notOneOf(nomesInvalidos, 'Por favor, insira um nome válido'),

  email: Yup.string()
    .email()
    .required()
    .email()
    .matches(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/, 'Endereço de e-mail inválido'),

  senha: Yup.string()
    .required()
    .test(
      'senha-forte',
      'A senha deve conter pelo menos 8 caracteres, incluindo letras maiúsculas, minúsculas, números e caracteres especiais',
      (value) => {
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
        return passwordRegex.test(value)
      }
    ),

  telefone: Yup.string()
    .required()
    .matches(/^(\([1-9]{2}\)|[1-9]{2})\s*[9]?[6-9]\d{3}-?\d{4}$/, 'Telefone inválido')
    .test('is-valid', 'Telefone inválido', function (value) {
      if (!value) {
        return false
      }
      const phone = value.replace(/\D/g, '')
      return phone.length === 11
    }),

  // planosSaude: Yup.array()
  //   .of(Yup.string())
  //   .test('planos-validos', 'Selecione planos de saúde válidos', function (value) {
  //     const planosValidos = ['NENHUM', 'SULAMERICA', 'UNIMED', 'BRADESCO', 'AMIL', 'BIOSAUDE', 'BIOVIDA', 'OUTRO']
  //     if (!value) return true
  //     return value.every((plano) => planosValidos.includes(plano || ''))
  //   }),

  possuiPlanoSaude: Yup.boolean()
    .required('Campo "possuiPlanoSaude" é obrigatório'),

  endereco: Yup.object().shape({
    cep: Yup.string()
      .required()
      .test('cep', 'CEP inválido', async (cepValue) => {
        if (!cepValue) return true
        try {
          const cepInfo = await cep(cepValue)
          return cepInfo.cep === cepValue
        } catch (error) {
          return false
        }
      }),
    rua: Yup.string()
      .required()
      .max(100),
    estado: Yup.string()
      .required()
      .oneOf(estadosValidos, 'Estado inválido'),
    numero: Yup.number()
      .required()
      .integer()
      .positive(),
    complemento: Yup.string()
      .required()
      .max(50)
  }),

  imagem: Yup.string()
    .test('formato-imagem', 'Formato de imagem inválido', function (value) {
      if (!value) return true // valores vazios

      const fileExtension = value.substring(value.lastIndexOf('.')).toLowerCase()
      return acceptedFormats.includes(fileExtension)
    }) // Seria assim, mas como está recebendo uma string, não funciona
  // .test('tamanho-imagem', 'Tamanho máximo de imagem excedido', function (value) {
  //   if (!value) return true // valores vazios

  //   const fileSize = value.length;
  //   return fileSize <= maxSize;
  // })
})
