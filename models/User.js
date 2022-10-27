//my note:import class types objects from Sequelize
const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");
//import bcrypt
const bcrypt = require("bcrypt");

//create our User model
class User extends Model {
  //set up method to run on instance data (per user) to check password
  checkPassword(loginPw) {
    return bcrypt.compareSync(loginPw, this.password);
  }
}
//my note: extends keyword allows User to inherit all of the functionality of the functionality the `model` class has

//define table columns and configuration
User.init(
  //my note:init method initializes the model's data+config, and passing 2 object arguements in it
  {
    //table column definitions go here (my note:this is the first object arguement)
    //define an id column
    id: {
      //use the special Sequelize DataTypes object provide what type of data it is
      type: DataTypes.INTEGER,
      //this is the equivalent of SQL's `NOT NULL` option
      allowNull: false,
      //instruct that this is the Primary Key
      primaryKey: true,
      //turn on auto increment
      autoIncrement: true,
    },
    //define a username column
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    //define an email colume
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      //there cannot be any duplicate email values in this table
      unique: true,
      //if allowNull is set to false, we can run our data through validators before creating the table data
      validate: {
        isEmail: true,
      },
    },
    //define a password colum
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        //this means the password must be at least four characters long
        len: [4],
      },
    },
  },
  {
    //here we pass hooks before sequelize
    hooks: {
      //set up beforeCreate lifecycle "hook" functionality
      async beforeCreate(newUserData) {
        newUserData.password = await bcrypt.hash(newUserData.password, 10);
        return newUserData;
      },

      //set up beforeUpdate lifecycle "hook" functionality
      async beforeUpdate(updatedUserData) {
        updatedUserData.password = await bcrypt.hash(
          updatedUserData.password,
          10
        );
        return updatedUserData;
      },
    },

    //table config options go here (https://sequelize.org/v5/manual/models-definition.html#configuration)
    //pass in our imported sequelize connection (the direct connection to our database)
    sequelize,
    //don't automatically create createAt/updatedAt timestamp fields
    timestamps: false,
    //don't pluralize name of database table
    freezeTableName: true,
    //use underscores instead of camel-casing (i.e. `comment_text` and not `commentText`)
    underscored: true,
    //make it so our model name stays lowercase in the database
    modelName: "user",
  }
);

module.exports = User;
