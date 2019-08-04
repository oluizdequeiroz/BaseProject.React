/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('produto', {
    codigo: {
      field: 'pronumsequencial',
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    nome: {
      field: 'pronome',
      type: DataTypes.STRING(100),
      allowNull: true
    },
    unidademedida: {
      field: 'prounidademedida',
      type: DataTypes.STRING(100),
      allowNull: true
    }
  }, {
    timestamps: false,
    tableName: 'tbproduto'
  });
};
