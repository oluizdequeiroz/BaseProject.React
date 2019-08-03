/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('tbpessoa', {
    pesnumsequencial: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    pesnome: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    pescpf: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    pestelefone: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    pesendereco: {
      type: DataTypes.BIGINT,
      allowNull: true,
      references: {
        model: 'tbendereco',
        key: 'endnumsequencial'
      }
    }
  }, {
    timestamps: false,
    tableName: 'tbpessoa'
  });
};
