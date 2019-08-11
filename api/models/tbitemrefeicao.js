/* jshint indent: 2 */

module.exports = function (sequelize, DataTypes) {
  const itemrefeicao = sequelize.define('itemrefeicao',
    {
      numsequencial: {
        field: 'irfnumsequencial',
        type: DataTypes.BIGINT,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      qtdreceita: {
        field: 'irfqtdreceita',
        type: DataTypes.DECIMAL,
        allowNull: true
      },
      receitaId: {
        field: 'irfreceita',
        type: DataTypes.BIGINT,
        allowNull: true,
        references: {
          model: 'tbreceita',
          key: 'recnumsequencial'
        }
      },
      refeicao: {
        field: 'irfrefeicao',
        type: DataTypes.BIGINT,
        allowNull: true,
        references: {
          model: 'tbrefeicao',
          key: 'refnumsequencial'
        }
      }
    },
    {
      timestamps: false,
      tableName: 'tbitemrefeicao'
    }
  );

  itemrefeicao.associate = models => {
    itemrefeicao.belongsTo(models.receita, {
      foreignKey: 'receitaId',
      as: 'receita'
    });
  }

  return itemrefeicao;
};
