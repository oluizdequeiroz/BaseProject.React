/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('usuario', {
    codigo: {
      field: 'usunumsequencial',
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    nome: {
      field: 'usunome',
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    senha: {
      field: 'ususenha',
      type: DataTypes.STRING(100),
      allowNull: true
    },
    token: {
      field: 'usutoken',
      type: DataTypes.STRING(500),
      allowNull: true
    }
  }, {
    timestamps: false,
    tableName: 'tbusuario'
  });
};
