import { User } from './user.model';
import { IUser } from './user.interface';

const createUserServices = async (payload: IUser): Promise<IUser> => {
  const newUser = await User.create(payload);
  return newUser;
};

const getAllUsersServices = async (): Promise<IUser[]> => {
  const users = await User.find({ isDeleted: false });
  return users;
};

const getSingleUserServices = async (id: string): Promise<IUser | null> => {
  const user = await User.findOne({ id, isDeleted: false });
  return user;
};

const updateUserServices = async (
  id: string,
  payload: Partial<IUser>,
): Promise<IUser | null> => {
  const updatedUser = await User.findOneAndUpdate(
    { id, isDeleted: false },
    payload,
    { new: true },
  );
  return updatedUser;
};

const deleteUserServices = async (id: string): Promise<IUser | null> => {
  const deletedUser = await User.findOneAndUpdate(
    { id, isDeleted: false },
    { isDeleted: true },
    { new: true },
  );
  return deletedUser;
};

export const UserService = {
  createUserServices,
  getAllUsersServices,
  getSingleUserServices,
  updateUserServices,
  deleteUserServices,
};
