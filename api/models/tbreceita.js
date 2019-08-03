/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('receita', {
    codigo: {
      field: 'recnumsequencial',
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    nome: {
      field: 'recnome',
      type: DataTypes.STRING(100),
      allowNull: true
    },
    quantidaderendimento: {
      field: 'recquantidaderendimento',
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    unidademedida: {
      field: 'recunidademedida',
      type: DataTypes.STRING(100),
      allowNull: true
    },
    modopreparo: {
      field: 'recmodopreparo',
      type: DataTypes.STRING(21844),
      allowNull: true
    }
  }, {
    timestamps: false,
    tableName: 'tbreceita'
  });
};
