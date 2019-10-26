const Sequelize = require('sequelize');

const sequelize = new Sequelize('node_practice', 'root', '1234', {
    host: 'localhost',
    dialect: 'mysql'
});

const user = sequelize.define("user", {
    id: {
        field: 'id',
        type: Sequelize.DataTypes.STRING(20),
        primaryKey: true
    },
    pw: {
        field: 'pw',
        type: Sequelize.DataTypes.STRING(100),
        allowNull: false,
    },
    name: {
        field: 'name',
        type: Sequelize.DataTypes.STRING(10),
        allowNull: false,
    },
}, {
    timestamps: false,
});

user.sync();

// const result = user.findAll({  });

module.exports = {
    getUser: () => {
        return user.findAll();
    },
    user
}