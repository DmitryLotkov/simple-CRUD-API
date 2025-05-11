import { User } from '../models/user';

let users: User[] = [];

export const getAllUsers = (): User[] => users;

export const addUser = (user: User): User => {
    users.push(user);
    return user;
};
