const Sequelize = require('sequelize');

const sequelize = new Sequelize('node_practice', 'root', '1234', {
    host: 'localhost',
    dialect: 'mysql',
    dialectOptions: {
      useUTC: false, // for reading from database
    },
    timezone: '+09:00'
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

const noticeBoard = sequelize.define("noticeBoard", {
    idx: {
        field: 'idx',
        type: Sequelize.DataTypes.INTEGER(10),
        autoIncrement: true,
        primaryKey: true
    },
    title: {
        field: 'title',
        type: Sequelize.DataTypes.STRING(20),
        allowNull: false
    },
    content: {
        field: 'content',
        type: Sequelize.DataTypes.STRING(100),
        allowNull: false
    },
    writer: {
        field: 'writer',
        type: Sequelize.DataTypes.STRING(10),
        allowNull: false
    }
});

user.sync();
noticeBoard.sync();
// const result = user.findAll({  });

module.exports = {
    getUser: () => {
        return user.findAll();
    },user,

    getNoticeBoard: () => {
        return noticeBoard.findAll();
    },noticeBoard
}