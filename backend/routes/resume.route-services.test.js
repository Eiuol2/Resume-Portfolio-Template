const mongoose = require("mongoose");
const ResumeSchema = require("../Models/Resume");
const resumeServices = require("./resume.route-services");
const { MongoMemoryServer } = require("mongodb-memory-server");

let mongoServer;
let conn;
let resumeModel;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();

  const mongooseOpts = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  };

  conn = await mongoose.createConnection(uri, mongooseOpts);

  resumeModel = conn.model("Resume", ResumeSchema);

  resumeServices.setConnection(conn);
});

afterAll(async () => {
  await conn.dropDatabase();
  await conn.close();
  await mongoServer.stop();
});

beforeEach(async () => {
  let dummyResume = {
    // id: "1111",
    content: "Some content"
  };
  let result = new resumeModel(dummyResume);
  await result.save();

  dummyResume = {
    // id: "2222",
    content: "Nice"
  };
  result = new resumeModel(dummyResume);
  await result.save();

  dummyResume = {
    // id: "3333",
    content: "Link"
  };
  result = new resumeModel(dummyResume);
  await result.save();

  dummyResume = {
    // id: "4444",
    content: "Testing"
  };
  result = new resumeModel(dummyResume);
  console.log(result);
  await result.save();
});

afterEach(async () => {
  await resumeModel.deleteMany();
});

test("Fetching all resumes", async () => {
  const resumes = await resumeServices.getResumes();
  expect(resumes).toBeDefined();
  expect(resumes.length).toBeGreaterThan(0);
});

test("Adding Resume - successful path", async () => {
  const dummyResume = {
    // id: "1234",
    content: "Just Added"
  };
  const result = await resumeServices.addResume(dummyResume);
  expect(result).toBeTruthy();
  expect(result.content).toBe(dummyResume.content);
});

test("Fetching by id (not present)", async () => {
  const anyId = "123";
  const user = await resumeServices.findResumeById(anyId);
  expect(user).toBeUndefined();
});


test("Fetching by valid id and finding", async () => {
  dummyResume = {
    // id: "ABC123",
    content: "testtest"
  };
  const result = new resumeModel(dummyResume);
  const addedResume = await result.save();
  const foundResume = await resumeServices.findResumeById(addedResume.id);
  expect(foundResume).toBeDefined();
  expect(foundResume.id).toBe(addedResume.id);
  expect(foundResume.content).toBe(addedResume.content);
});


test("Deleting a user by ID", async () => {
  dummyResume = {
    // id: "456",
    content: "delete"
  };
  const result = new resumeModel(dummyResume);
  const addedResume = await result.save();
  const deleteResume = await resumeServices.findResumeByIdRemove(addedResume.id);
  expect(deleteResume).toBeTruthy();
});


test("Update a user by ID", async () => {
  dummyResume = {
    // id: "789",
    content: "before"
  };
  const result = new resumeModel(dummyResume);
  let addedResume = await result.save();

  let data = {
    content: "After"
  }

  const updResume = await resumeServices.findResumeByIdUpdate(addedResume.id, data);
  expect(updResume.id).toEqual(addedResume.id);
  expect(addedResume.content).not.toEqual(data.content);
});