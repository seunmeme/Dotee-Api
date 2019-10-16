import bcrypt from 'bcryptjs';

module.exports = (sequelize, DataTypes) => {

  const Agent = sequelize.define('Agent', {
    phone: {
      type: DataTypes.BIGINT,
      unique: true,
      allowNull: false,
      validate: {
        isNumeric: true
      }
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [2,200]
      }
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [3,200]
      }
    },
    lcda: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [2,50]
      }
    },
    password: {
      type: DataTypes.STRING(1234),
      allowNull: false,
      validate: {
        len: [6,100]
      }
    }
  },
  );

    // Agent.associate = function(models) {
  //   // associations can be defined here
  // };
  Agent.beforeCreate((agent, options) => {
    const salt = bcrypt.genSaltSync(10);
    const hashed = bcrypt.hashSync(agent.password, salt);
  
    agent.password = hashed;
    });
  
 
  return Agent;
};
