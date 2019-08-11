/* jshint indent: 2 */

module.exports = function (sequelize, DataTypes) {
  const refeicao = sequelize.define('refeicao',
    {
      numsequencial: {
        field: 'refnumsequencial',
        type: DataTypes.BIGINT,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      diarefeicao: {
        field: 'refdiarefeicao',
        type: DataTypes.STRING(100),
        allowNull: true
      },
      tiporefeicao: {
        field: 'reftiporefeicao',
        type: DataTypes.STRING(100),
        allowNull: true
      },
      valorrefeicao: {
        field: 'refvalorrefeicao',
        type: DataTypes.DECIMAL,
        allowNull: true
      },
      horarioentrega: {
        field: 'refhorarioentrega',
        type: DataTypes.TIME,
        allowNull: true
      },
      cliente: {
        field: 'refcliente',
        type: DataTypes.BIGINT,
        allowNull: true,
        references: {
          model: 'tbcliente',
          key: 'clinumsequencial'
        }
      },
      datarefeicao: {
        field: 'refdatarefeicao',
        type: DataTypes.STRING(10),
        allowNull: true
      }
    },
    {
      timestamps: false,
      tableName: 'tbrefeicao'
    }
  );

  refeicao.associate = models => {
    refeicao.hasMany(models.itemrefeicao, {
      as: 'refeicoes',
      foreignKey: 'refeicao'
    });
  };

  return refeicao;
};
