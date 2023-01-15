"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _sequelize = require('sequelize'); var _sequelize2 = _interopRequireDefault(_sequelize);
var _bcryptjs = require('bcryptjs'); var _bcryptjs2 = _interopRequireDefault(_bcryptjs);

 class User extends _sequelize.Model {
  static init(sequelize) {
    super.init({
      nome: {
        type: _sequelize2.default.STRING,
        defaultValue: '', // se nao enviar nada, o valor é vazio
        validate: {
          len: {
            args: [3, 255],
            msg: 'Campo nome deve ter entre 3 e 255 caracteres',
          },
        },
      },
      email: {
        type: _sequelize2.default.STRING,
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
        type: _sequelize2.default.STRING,
        defaultValue: '', // se nao enviar nada, o valor é vazio
      },
      password: {
        type: _sequelize2.default.VIRTUAL,
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
        user.password_hash = await _bcryptjs2.default.hash(user.password, 8);
      }
    });

    return this;
  }

  passwordIsValid(password) {
    return _bcryptjs2.default.compare(password, this.password_hash);
  }
} exports.default = User;
