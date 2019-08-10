/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('cliente', {
    numsequencial: {
      field: 'clinumsequencial',
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    nome: {
      field: 'clinome',
      type: DataTypes.STRING(100),
      allowNull: true
    },
    cpf: {
      field: 'clicpf',
      type: DataTypes.STRING(100),
      allowNull: true
    },
    cnpj: {
      field: 'clicnpj',
      type: DataTypes.STRING(100),
      allowNull: true
    },
    telefone: {
      field: 'clitelefone',
      type: DataTypes.STRING(100),
      allowNull: true
    },
    endereco: {
      field: 'cliendereco',
      type: DataTypes.BIGINT,
      allowNull: true,
      references: {
        model: 'tbendereco',
        key: 'endnumsequencial'
      }
    },
    enderecoentrega: {
      field: 'clienderecoentrega',
      type: DataTypes.BIGINT,
      allowNull: true,
      references: {
        model: 'tbendereco',
        key: 'endnumsequencial'
      }
    },
    pesrepresentante: {
      field: 'clipesrepresentante',
      type: DataTypes.BIGINT,
      allowNull: true,
      references: {
        model: 'tbpessoa',
        key: 'pesnumsequencial'
      }
    }
  }, {
    timestamps: false,
    tableName: 'tbcliente'
  });
};
