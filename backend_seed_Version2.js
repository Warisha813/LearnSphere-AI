require("dotenv").config();
const connectDB = require("./db/mongo");
const Task = require("./models/Task");

const sample = [
  { title: "Algebra Practice: Linear Equations", subject: "Math", difficulty: "Easy", tags: ["algebra","equations"], points: 10 },
  { title: "Read Chapter on Cellular Respiration", subject: "Biology", difficulty: "Medium", tags: ["cells","respiration"], points: 20 },
  { title: "Essay: Causes of World War I", subject: "History", difficulty: "Hard", tags: ["essay","ww1"], points: 40, completed: true, completedAt: new Date(Date.now() - 2*86400000) },
  { title: "Spanish Vocabulary: 30 verbs", subject: "Languages", difficulty: "Medium", tags: ["vocab","spanish"], points: 20 },
  { title: "Chemistry: Stoichiometry problems", subject: "Chemistry", difficulty: "Hard", tags: ["stoichiometry"], points: 40 },
  { title: "Geometry: Area & Perimeter review", subject: "Math", difficulty: "Easy", tags: ["geometry"], points: 10, completed: true, completedAt: new Date(Date.now() - 86400000) }
];

async function seed(){
  try {
    await connectDB();
    await Task.deleteMany({});
    await Task.insertMany(sample);
    console.log("Seeded tasks");
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

seed();