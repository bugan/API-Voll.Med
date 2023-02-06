import { Paciente } from '../../entity/pacienteEntity.js'

// teste 01

describe('Testando o modelo Paciente', () => {
  const objetoPaciente = {
    id: '1',
    nome: 'teste',
    email: 'teste@teste.com',
    senha: '123',
    endereco: 'Rua Teste 0101',
    telefone: 86995959595,
    possuiPlanoSaude: 0
  }
  it('Deve instanciar um novo paciente', () => {
    const paciente = new Paciente(objetoPaciente)
    expect(paciente).toEqual(
      expect.objectContaining(objetoPaciente)
    )
  })
})
