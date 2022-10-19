const { Sequelize, Model, DataTypes } = require('sequelize');

const sequelize = new Sequelize({
	dialect: 'sqlite',
	storage: './app/db/attendance.sqlite3',
});

const Student = sequelize.define('Student', {
	id: {
		type: DataTypes.STRING,
		primaryKey: true,
		is: [ 'VU4[a-zA-Z]+\d\d\d\d\d\d\d', 'i' ],
	},
	name: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	email: {
		type: DataTypes.STRING,
		allowNull: false,
		isEmail: true,
	},
	gender: {
		type: DataTypes.STRING,
		allowNull: false,
		isIn: [ [ 'Male', 'Female' ] ],
	},
	semester: {
		type: DataTypes.INTEGER,
		allowNull: false,
		isIn: [ [ 1, 2, 3, 4, 5, 6, 7, 8 ] ],
	},
	branch: {
		type: DataTypes.STRING,
		allowNull: false,
		isIn: [
			[
				'Information Technology',
				'Computer',
				'Electronics & Telecommunication',
				'Artificial Intelligence & Data Science',
			],
		],
	},
	dateOfBirth: {
		type: DataTypes.DATE,
		allowNull: false,
	},
	fingerprint: {
		type: DataTypes.STRING,
		allowNull: false,
		isUrl: true,
	},
});

const Faculty = sequelize.define('Faculty', {
	id: {
		type: DataTypes.INTEGER,
		primaryKey: true,
		autoIncrement: true,
	},
	name: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	email: {
		type: DataTypes.STRING,
		allowNull: false,
		isEmail: true,
	},
	password: {
		type: DataTypes.STRING,
		allowNull: false,
		len: [ 6, 32 ],
	},
	gender: {
		type: DataTypes.STRING,
		allowNull: false,
		isIn: [ [ 'Male', 'Female' ] ],
	},
	branch: {
		type: DataTypes.STRING,
		allowNull: false,
		isIn: [
			[
				'Information Technology',
				'Computer',
				'Electronics & Telecommunication',
				'Artificial Intelligence & Data Science',
			],
		],
	},
});

const Subject = sequelize.define('Subject', {
	id: {
		type: DataTypes.INTEGER,
		primaryKey: true,
		autoIncrement: true,
	},
	name: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	semester: {
		type: DataTypes.INTEGER,
		allowNull: false,
		isIn: [ [ 1, 2, 3, 4, 5, 6, 7, 8 ] ],
	},
	branch: {
		type: DataTypes.STRING,
		allowNull: false,
		isIn: [
			[
				'Information Technology',
				'Computer',
				'Electronics & Telecommunication',
				'Artificial Intelligence & Data Science',
			],
		],
	},
});

const Attendance = sequelize.define('Attendance', {
	id: {
		type: DataTypes.INTEGER,
		primaryKey: true,
		autoIncrement: true,
	},
	fingerprint: {
		type: DataTypes.STRING,
		allowNull: false,
		isUrl: true,
	},
});

/* relationships */

Attendance.belongsTo(Student, {
	foreignKey: 'student',
	targetKey: 'id',
});

Attendance.belongsTo(Subject, {
	foreignKey: 'subject',
	targetKey: 'id',
});

const main = async () => {
	await sequelize.sync();
};

main();

module.exports = { Student, Faculty, Subject, Attendance };
