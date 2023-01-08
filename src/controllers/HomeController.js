import Aluno from '../models/Aluno';

class HomeController {
  async index(req, res) {
    const novoAluno = await Aluno.create({
      nome: 'Maria',
      sobrenome: 'Miranda',
      email: 'maria@gmail.com',
      idade: 54,
      peso: 50,
      altura: 1.8,
    });
    res.json(novoAluno);
  }
}

export default new HomeController();
