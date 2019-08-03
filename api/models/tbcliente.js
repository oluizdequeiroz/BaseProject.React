/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('tbcliente', {
    clinumsequencial: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    clinome: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    clicpf: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    clicnpj: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    clitelefone: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    cliendereco: {
      type: DataTypes.BIGINT,
      allowNull: true,
      references: {
        model: 'tbendereco',
        key: 'endnumsequencial'
      }
    },
    clienderecoentrega: {
      type: DataTypes.BIGINT,
      allowNull: true,
      references: {
        model: 'tbendereco',
        key: 'endnumsequencial'
      }
    },
    clipesrepresentante: {
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
