'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class user_players extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  user_players.init({
    userId: DataTypes.INTEGER,
    playerId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'user_players',
  });
  return user_players;
};