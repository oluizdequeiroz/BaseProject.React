/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('tbrefeicao', {
    refnumsequencial: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    refdiarefeicao: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    reftiporefeicao: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    refvalorrefeicao: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    refhorarioentrega: {
      type: DataTypes.TIME,
      allowNull: true
    },
    refcliente: {
      type: DataTypes.BIGINT,
      allowNull: true,
      references: {
        model: 'tbcliente',
        key: 'clinumsequencial'
      }
    }
  }, {
    timestamps: false,
    tableName: 'tbrefeicao'
  });
};
