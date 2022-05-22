import { User, UserProps } from "./User"

describe("User", () => {
  it("should create success", () => {
    const userMOCK: UserProps = {
      email: "everton@emoutech.com",
      name: "Everton",
      password: "123456"
    }

    const sut = new User(userMOCK)
    sut.create("local")

    expect(sut.createdAt).toBeDefined()
    expect(sut.email).toBe(userMOCK.email)
    expect(sut.password).not.toBe(userMOCK.password)
  })
})
