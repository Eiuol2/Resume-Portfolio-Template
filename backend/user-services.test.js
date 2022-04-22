// const mongoose = require("mongoose");
// // const TextSchema = require("./text");
// // const userServices = require("./user-services");
// const { MongoMemoryServer } = require("mongodb-memory-server");

// let mongoServer;
// let conn;
// let textModel;

// beforeAll(async () => {
//   mongoServer = await MongoMemoryServer.create();
//   const uri = mongoServer.getUri();

//   const mongooseOpts = {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   };

//   conn = await mongoose.createConnection(uri, mongooseOpts);

//   textModel = conn.model("Texts", TextSchema);

//   userServices.setConnection(conn);
// });

// afterAll(async () => {
//   await conn.dropDatabase();
//   await conn.close();
//   await mongoServer.stop();
// });

// beforeEach(async () => {
//   let dummyText = {
//     text: "College: Cal Poly SLO",
//     user: "Chuck",
//   };
//   let result = new textModel(dummyText);
//   await result.save();

//   dummyText = {
//     text: "GPA: 4.0",
//     user: "Steve",
//   };
//   result = new textModel(dummyText);
//   await result.save();

//   dummyText = {
//     text: "Project Experience: Built a website using Node and React",
//     user: "Tony",
//   };
//   result = new textModel(dummyText);
//   await result.save();

//   dummyText = {
//     text: "Degree: Bachelor's of Science in Software Engineering",
//     user: "Stacy",
//   };
//   result = new textModel(dummyText);
//   await result.save();
// });

// afterEach(async () => {
//   await textModel.deleteMany();
// });

// test("Fetching text - Valid", async () => {
//   const userText = "GPA: 4.0";
//   const texts = await userServices.findText(userText);
//   expect(texts).toBeDefined();
//   expect(texts.length).toBeGreaterThan(0);
//   texts.forEach((text) => expect(text.text).toBe(userText));
// });

// test("Adding Text - successful path", async () => {
//   const dummyText = {
//     text: "School - Hogwarts",
//     user: "Harry Potter",
//   };
//   const result = await userServices.addText(dummyText);
//   expect(result).toBeTruthy();
//   expect(result.text).toBe(dummyText.text);
//   expect(result.user).toBe(dummyText.user);
// });


// // ----------- DON'T MIND THESE ------------------------


// // test("Adding user -- failure path with invalid id", async () => {
// //   const dummyUser = {
// //     _id: "123",
// //     name: "Harry Potter",
// //     job: "Young wizard",
// //   };
// //   const result = await userServices.addUser(dummyUser);
// //   expect(result).toBeFalsy();
// // });

// // test("Fetching by invalid id format", async () => {
// //   const anyId = "123";
// //   const user = await userServices.findUserById(anyId);
// //   expect(user).toBeUndefined();
// // });

// // test("Fetching by valid id and not finding", async () => {
// //   const anyId = "6132b9d47cefd0cc1916b6a9";
// //   const user = await userServices.findUserById(anyId);
// //   expect(user).toBeNull();
// // });

// // test("Fetching by valid id and finding", async () => {
// //   const dummyUser = {
// //     name: "Harry Potter",
// //     job: "Young wizard",
// //   };
// //   const result = new userModel(dummyUser);
// //   const addedUser = await result.save();
// //   const foundUser = await userServices.findUserById(addedUser.id);
// //   expect(foundUser).toBeDefined();
// //   expect(foundUser.id).toBe(addedUser.id);
// //   expect(foundUser.name).toBe(addedUser.name);
// //   expect(foundUser.job).toBe(addedUser.job);
// // });

// // test("Deleting a user by Id -- successful path", async () => {
// //   const dummyUser = {
// //     name: "Harry Potter",
// //     job: "Young wizard",
// //   };
// //   const result = new userModel(dummyUser);
// //   const addedUser = await result.save();
// //   const deleteResult = await userModel.findOneAndDelete({ _id: addedUser.id });
// //   expect(deleteResult).toBeTruthy();
// // });

// // test("Deleting a user by Id -- inexisting id", async () => {
// //   const anyId = "6132b9d47cefd0cc1916b6a9";
// //   const deleteResult = await userModel.findOneAndDelete({ _id: anyId });
// //   expect(deleteResult).toBeNull();
// // });

// // test("Adding user -- failure path with already taken id", async () => {
// //   const dummyUser = {
// //     name: "Harry Potter",
// //     job: "Young wizard",
// //   };
// //   const addedUser = await userServices.addUser(dummyUser);

// //   const anotherDummyUser = {
// //     _id: addedUser.id,
// //     name: "Ron",
// //     job: "Young wizard",
// //   };
// //   const result = await userServices.addUser(anotherDummyUser);
// //   expect(result).toBeFalsy();
// // });

// // test("Adding user -- failure path with invalid job length", async () => {
// //   const dummyUser = {
// //     name: "Harry Potter",
// //     job: "Y",
// //   };
// //   const result = await userServices.addUser(dummyUser);
// //   expect(result).toBeFalsy();
// // });

// // test("Adding user -- failure path with no job", async () => {
// //   const dummyUser = {
// //     name: "Harry Potter",
// //   };
// //   const result = await userServices.addUser(dummyUser);
// //   expect(result).toBeFalsy();
// // });

// // test("Adding user -- failure path with no name", async () => {
// //   const dummyUser = {
// //     job: "Young wizard",
// //   };
// //   const result = await userServices.addUser(dummyUser);
// //   expect(result).toBeFalsy();
// // });
