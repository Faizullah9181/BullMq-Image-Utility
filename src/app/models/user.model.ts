import {
    Table,
    Model,
    Column,
    DataType

} from 'sequelize-typescript';

@Table
export default class User extends Model<User> {

    @Column({
        type: DataType.STRING,
        unique: true,
        allowNull: false
    })
    name: string;

    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    email: string;
}