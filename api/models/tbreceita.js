/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('tbreceita', {
    recnumsequencial: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    recnome: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    recquantidaderendimento: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    recunidademedida: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    recmodopreparo: {
      type: DataTypes.STRING(21844),
      allowNull: true
    }
  }, {
    timestamps: false,
    tableName: 'tbreceita'
  });
};
