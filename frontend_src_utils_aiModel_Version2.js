import * as tf from "@tensorflow/tfjs";

/*
 Small TF.js model to score tasks for recommendation.
 Inputs: subject (one-hot), difficulty (one-hot), completionTime, streak.
 Supports incremental training.
*/

let model = null;
let subjectIndex = {};
let subjCount = 0;

export function initModel() {
  if (model) return model;
  model = tf.sequential();
  model.add(tf.layers.dense({ inputShape: [10], units: 16, activation: "relu" }));
  model.add(tf.layers.dense({ units: 8, activation: "relu" }));
  model.add(tf.layers.dense({ units: 1, activation: "sigmoid" }));
  model.compile({ optimizer: tf.train.adam(0.01), loss: "binaryCrossentropy" });
  return model;
}

function encodeTask(task) {
  const subjIdx = getSubjectIndex(task.subject || "General");
  const subjOneHot = new Array(6).fill(0);
  subjOneHot[subjIdx % 6] = 1;
  const diffMap = { Easy: [1,0,0], Medium: [0,1,0], Hard: [0,0,1] };
  const diffOne = diffMap[task.difficulty] || [1,0,0];
  const completionTime = task.completionTime ? Math.min(1, task.completionTime / 120) : 0;
  const streak = Math.min(1, (task.streak || 0) / 30);
  const arr = [...subjOneHot, ...diffOne, completionTime, streak];
  while (arr.length < 10) arr.push(0);
  return arr.slice(0, 10);
}

function getSubjectIndex(subject) {
  if (!subjectIndex[subject]) {
    subjectIndex[subject] = subjCount++;
  }
  return subjectIndex[subject];
}

export async function scoreTasks(tasks) {
  if (!model) initModel();
  if (!tasks || tasks.length === 0) return [];
  const xs = tasks.map((t) => encodeTask(t));
  const input = tf.tensor2d(xs);
  const pred = model.predict(input);
  const scores = await pred.array();
  input.dispose(); pred.dispose();
  return tasks.map((t, i) => ({ task: t, score: scores[i][0] }));
}

export async function incrementalTrainFromEvent(evt) {
  if (!model) initModel();
  try {
    const x = [encodeTask(evt.task)];
    const y = [evt.event === "complete" ? 1 : 0];
    const xs = tf.tensor2d(x);
    const ys = tf.tensor2d(y, [y.length, 1]);
    await model.fit(xs, ys, { epochs: 4, batchSize: 1 });
    xs.dispose(); ys.dispose();
  } catch (err) {
    console.warn("AI incremental training failed:", err);
  }
}