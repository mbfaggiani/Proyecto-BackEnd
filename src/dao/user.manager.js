import mongoose from "mongoose";
import { userModel } from "./models/users.schema.js";

export default class userManagerDB{

  async addUser(user) {
    const usersave = await this.userModel.create(user);
    return usersave;
  }

  async findUsers() {
    const users = await this.userModel.find().lean();
    return users;
  }
  async findUserByCondition(condition) {
    const users = await this.userModel.find(condition).lean();
    return users;
  }

  async updateUser(id, usrUpd) {
    const finder = await this.userModel.findById(id).lean();
    if (!finder) {
      throw new Error("Not Found");
    }
    await this.userModel.findByIdAndUpdate(id, usrUpd);
  }
}

