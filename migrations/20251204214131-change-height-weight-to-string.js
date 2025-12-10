'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    // Change height and weight from DECIMAL to STRING
    await queryInterface.changeColumn('players', 'height', {
      type: Sequelize.STRING,
      allowNull: true
    });
    
    await queryInterface.changeColumn('players', 'weight', {
      type: Sequelize.STRING,
      allowNull: true
    });
    
    // Add new player statistics fields
    await queryInterface.addColumn('players', 'position', {
      type: Sequelize.STRING,
      allowNull: true
    });
    
    await queryInterface.addColumn('players', 'team', {
      type: Sequelize.STRING,
      allowNull: true
    });
    
    await queryInterface.addColumn('players', 'jersey_number', {
      type: Sequelize.STRING,
      allowNull: true
    });
    
    await queryInterface.addColumn('players', 'college', {
      type: Sequelize.STRING,
      allowNull: true
    });
    
    await queryInterface.addColumn('players', 'country', {
      type: Sequelize.STRING,
      allowNull: true
    });
    
    await queryInterface.addColumn('players', 'draft_year', {
      type: Sequelize.INTEGER,
      allowNull: true
    });
    
    await queryInterface.addColumn('players', 'draft_round', {
      type: Sequelize.INTEGER,
      allowNull: true
    });
    
    await queryInterface.addColumn('players', 'draft_number', {
      type: Sequelize.INTEGER,
      allowNull: true
    });
  },

  async down (queryInterface, Sequelize) {
    // Revert changes - remove added columns
    await queryInterface.removeColumn('players', 'position');
    await queryInterface.removeColumn('players', 'team');
    await queryInterface.removeColumn('players', 'jersey_number');
    await queryInterface.removeColumn('players', 'college');
    await queryInterface.removeColumn('players', 'country');
    await queryInterface.removeColumn('players', 'draft_year');
    await queryInterface.removeColumn('players', 'draft_round');
    await queryInterface.removeColumn('players', 'draft_number');
    
    // Change height and weight back to DECIMAL
    await queryInterface.changeColumn('players', 'height', {
      type: Sequelize.DECIMAL,
      allowNull: true
    });
    
    await queryInterface.changeColumn('players', 'weight', {
      type: Sequelize.DECIMAL,
      allowNull: true
    });
  }
};
