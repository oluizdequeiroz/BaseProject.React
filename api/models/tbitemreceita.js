/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('itemreceita', {
    codigo: {
      field: 'itrnumsequencial',
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    quantidadeliquida: {
      field: 'itrquantidadeliquida',
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    percentualperda: {
      field: 'itrpercentualperda',
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    produto: {
      field: 'itrproduto',
      type: DataTypes.BIGINT,
      allowNull: true,
      references: {
        model: 'tbproduto',
        key: 'pronumsequencial'
      }
    },
    receita: {
      field: 'itrreceita',
      type: DataTypes.BIGINT,
      allowNull: true,
      references: {
        model: 'tbreceita',
        key: 'recnumsequencial'
      }
    }
  }, {
    timestamps: false,
    tableName: 'tbitemreceita'
  });
};
