/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('tbitemrefeicao', {
    irfnumsequencial: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    irfqtdreceita: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    irfreceita: {
      type: DataTypes.BIGINT,
      allowNull: true,
      references: {
        model: 'tbreceita',
        key: 'recnumsequencial'
      }
    },
    irfrefeicao: {
      type: DataTypes.BIGINT,
      allowNull: true,
      references: {
        model: 'tbrefeicao',
        key: 'refnumsequencial'
      }
    }
  }, {
    timestamps: false,
    tableName: 'tbitemrefeicao'
  });
};
