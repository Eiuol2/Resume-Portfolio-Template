const mongoose = require("mongoose");
const PostSchema = require("../Models/Post");
const postServices = require("./post.route-services");
const { MongoMemoryServer } = require("mongodb-memory-server");

let mongoServer;
let conn;
let postModel;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();

  const mongooseOpts = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  };

  conn = await mongoose.createConnection(uri, mongooseOpts);

  postModel = conn.model("Post", PostSchema);

  postServices.setConnection(conn);
});

afterAll(async () => {
  await conn.dropDatabase();
  await conn.close();
  await mongoServer.stop();
});

beforeEach(async () => {
  let dummyPost = {
    title: "Random",
    description: "This is a random post",
    content: "Some content"
  };
  let result = new postModel(dummyPost);
  await result.save();

  dummyPost = {
    title: "Hello",
    description: "This is a greeting",
    content: "Good morning"
  };
  result = new postModel(dummyPost);
  await result.save();

  dummyPost = {
    title: "How are you?",
    description: "This is a question",
    content: "How are you doing?"
  };
  result = new postModel(dummyPost);
  await result.save();

  dummyPost = {
    title: "Bye",
    description: "This is a bye post",
    content: "See you later"
  };
  result = new postModel(dummyPost);
  console.log(result);
  await result.save();
});

afterEach(async () => {
  await postModel.deleteMany();
});

test("Fetching all posts", async () => {
  const posts = await postServices.getPosts();
  expect(posts).toBeDefined();
  expect(posts.length).toBeGreaterThan(0);
});

test("Adding Post - successful path", async () => {
  const dummyPost = {
    title: "New Post",
    description: "This is a new post",
    content: "NEW"
  };
  const result = await postServices.addPost(dummyPost);
  expect(result).toBeTruthy();
  expect(result.title).toBe(dummyPost.title);
  expect(result.description).toBe(dummyPost.description);
  expect(result.content).toBe(dummyPost.content);
});

test("Fetching by id (not present)", async () => {
  const anyId = "123";
  const user = await postServices.findPostById(anyId);
  expect(user).toBeUndefined();
});


test("Fetching by valid id and finding", async () => {
  dummyPost = {
    title: "Testing",
    description: "This is a test post",
    content: "testtest"
  };
  const result = new postModel(dummyPost);
  const addedPost = await result.save();
  const foundPost = await postServices.findPostById(addedPost.id);
  expect(foundPost).toBeDefined();
  expect(foundPost.title).toBe(addedPost.title);
  expect(foundPost.description).toBe(addedPost.description);
  expect(foundPost.content).toBe(addedPost.content);
});


test("Deleting a user by ID", async () => {
  dummyPost = {
    title: "Delete",
    description: "This is going to get deleted",
    content: "deldel"
  };
  const result = new postModel(dummyPost);
  const addedPost = await result.save();
  const deletePost = await postServices.findPostByIdRemove(addedPost.id);
  expect(deletePost).toBeTruthy();
});


test("Update a user by ID", async () => {
  dummyPost = {
    title: "Before",
    description: "This is going to get changed",
    content: "before"
  };
  const result = new postModel(dummyPost);
  let addedPost = await result.save();

  let data = {
    title: "After",
    description: "This is changed",
    content: "WOW"
  }

  const updPost = await postServices.findPostByIdUpdate(addedPost.id, data);
  expect(updPost.id).toEqual(addedPost.id);
  expect(updPost.title).not.toEqual(data.title);
  expect(updPost.description).not.toEqual(data.description);
  expect(updPost.content).not.toEqual(data.content);
});

// test("Deleting a user by Id -- successful path", async () => {
//   const dummyUser = {
//     name: "Harry Potter",
//     job: "Young wizard",
//   };
//   const result = new userModel(dummyUser);
//   const addedUser = await result.save();
//   const deleteResult = await userModel.findOneAndDelete({ _id: addedUser.id });
//   expect(deleteResult).toBeTruthy();
// });

// test("Deleting a user by Id -- inexisting id", async () => {
//   const anyId = "6132b9d47cefd0cc1916b6a9";
//   const deleteResult = await userModel.findOneAndDelete({ _id: anyId });
//   expect(deleteResult).toBeNull();
// });


// test("Adding user -- failure path with already taken id", async () => {
//   const dummyUser = {
//     name: "Harry Potter",
//     job: "Young wizard",
//   };
//   const addedUser = await userServices.addUser(dummyUser);

//   const anotherDummyUser = {
//     _id: addedUser.id,
//     name: "Ron",
//     job: "Young wizard",
//   };
//   const result = await userServices.addUser(anotherDummyUser);
//   expect(result).toBeFalsy();
// });

// test("Adding user -- failure path with invalid job length", async () => {
//   const dummyUser = {
//     name: "Harry Potter",
//     job: "Y",
//   };
//   const result = await userServices.addUser(dummyUser);
//   expect(result).toBeFalsy();
// });

// test("Adding user -- failure path with no job", async () => {
//   const dummyUser = {
//     name: "Harry Potter",
//   };
//   const result = await userServices.addUser(dummyUser);
//   expect(result).toBeFalsy();
// });

// test("Adding user -- failure path with no name", async () => {
//   const dummyUser = {
//     job: "Young wizard",
//   };
//   const result = await userServices.addUser(dummyUser);
//   expect(result).toBeFalsy();
// });