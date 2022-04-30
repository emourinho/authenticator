import { container } from "tsyringe";
import { IUserRepository } from "../domain";
import { UserRepository } from "../infrastructure"

container.register<IUserRepository>("UserRepository", UserRepository)
