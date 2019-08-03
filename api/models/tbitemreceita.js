/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('tbitemreceita', {
    itrnumsequencial: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    itrquantidadeliquida: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    itrpercentualperda: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    itrproduto: {
      type: DataTypes.BIGINT,
      allowNull: true,
      references: {
        model: 'tbproduto',
        key: 'pronumsequencial'
      }
    },
    itrreceita: {
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
