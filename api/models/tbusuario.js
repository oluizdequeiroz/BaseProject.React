/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('tbusuario', {
    usunumsequencial: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    usunome: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    ususenha: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    usutoken: {
      type: DataTypes.STRING(500),
      allowNull: true
    }
  }, {
    timestamps: false,
    tableName: 'tbusuario'
  });
};
