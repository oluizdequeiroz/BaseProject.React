/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('tbproduto', {
    pronumsequencial: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    pronome: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    prounidademedida: {
      type: DataTypes.STRING(100),
      allowNull: true
    }
  }, {
    timestamps: false,
    tableName: 'tbproduto'
  });
};
