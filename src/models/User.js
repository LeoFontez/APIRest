import Sequelize, { Model } from 'sequelize';
import bcryptjs from 'bcryptjs';

export default class User extends Model {
  static init(sequelize) {
    super.init({
      nome: {
        type: Sequelize.STRING,
        defaultValue: '', // se nao enviar nada, o valor é vazio
        validate: {
          len: {
            args: [3, 255],
            msg: 'Campo nome deve ter entre 3 e 255 caracteres',
          },
        },
      },
      email: {
        type: Sequelize.STRING,
        defaultValue: '', // se nao enviar nada, o valor é vazio
        unique: {
          msg: 'Email já existe',
        },
        validate: {
          isEmail: {
            args: [3, 255],
            msg: 'E-mail Inválido.',
          },
        },
      },
      password_hash: {
        type: Sequelize.STRING,
        defaultValue: '', // se nao enviar nada, o valor é vazio
      },
      password: {
        type: Sequelize.VIRTUAL,
        defaultValue: '', // se nao enviar nada, o valor é vazio
        validate: {
          len: {
            args: [6, 50],
            msg: 'A senha deve ter entre 6 e 50 caracteres',
          },
        },
      },
    }, {
      sequelize,
    });

    // antes de salvar, vai criptografar a senha
    this.addHook('beforeSave', async (user) => {
      if (user.password) {
        user.password_hash = await bcryptjs.hash(user.password, 8);
      }
    });

    return this;
  }

  passwordIsValid(password) {
    return bcryptjs.compare(password, this.password_hash);
  }
}
