const placeholderTasks = [
  { id: "t1", title: "Algebra Practice: Linear Equations", subject: "Math", difficulty: "Easy", tags: ["algebra","equations"], completed: false, points: 10 },
  { id: "t2", title: "Read Chapter on Cellular Respiration", subject: "Biology", difficulty: "Medium", tags: ["cells","respiration"], completed: false, points: 20 },
  { id: "t3", title: "Essay: Causes of World War I", subject: "History", difficulty: "Hard", tags: ["essay","ww1"], completed: true, points: 40, completedAt: Date.now() - 86400000 },
  { id: "t4", title: "Spanish Vocabulary: 30 verbs", subject: "Languages", difficulty: "Medium", tags: ["vocab","spanish"], completed: false, points: 20 },
  { id: "t5", title: "Chemistry: Stoichiometry problems", subject: "Chemistry", difficulty: "Hard", tags: ["stoichiometry"], completed: false, points: 40 },
  { id: "t6", title: "Geometry: Area & Perimeter review", subject: "Math", difficulty: "Easy", tags: ["geometry"], completed: true, points: 10, completedAt: Date.now() - 2*86400000 }
];

export default placeholderTasks;