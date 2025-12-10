'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class player extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.player.belongsToMany(models.user, {
        through: 'user_players',
        onDelete: 'CASCADE'
      })
      models.player.hasMany(models.comment)
    }
  }
  player.init({
    firstname: DataTypes.STRING,
    lastname: DataTypes.STRING,
    height: DataTypes.STRING,
    weight: DataTypes.STRING,
    position: DataTypes.STRING,
    team: DataTypes.STRING,
    jersey_number: DataTypes.STRING,
    college: DataTypes.STRING,
    country: DataTypes.STRING,
    draft_year: DataTypes.INTEGER,
    draft_round: DataTypes.INTEGER,
    draft_number: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'player',
  });
  return player;
};