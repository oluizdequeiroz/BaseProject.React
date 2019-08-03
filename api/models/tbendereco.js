/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('tbendereco', {
    endnumsequencial: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    endlogradouro: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    endnumero: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    endcomplemento: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    endbairro: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    endcep: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    endcidade: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    endestado: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    endpais: {
      type: DataTypes.STRING(100),
      allowNull: true
    }
  }, {
    timestamps: false,
    tableName: 'tbendereco'
  });
};
