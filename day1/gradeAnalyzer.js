const students = [
  { name: "Alice", score: 85 },
  { name: "Bob", score: 92 },
  { name: "Charlie", score: 58 },
  { name: "David", score: 74 },
];

const analyzeGrades = (students) => {

  /* Calculate Average */
  const scores = students?.map((v, i, arr) => {
    return v.score;
  });

  const average = calculateAverage(scores);
  console.log(`Average Score: ${average}`);


  /* Calculate Max and Min Score */
  const { maxScore, minScore, studentWithMaxScore, studentWithMinScore } =
    getMaxMinScore(students);
  console.log(`Highest Score: ${studentWithMaxScore} (${maxScore})`);
  console.log(`Lowest Score: ${studentWithMinScore} (${minScore})`);


  /* Grade Distribution Logic */
  const gradeCount = getGradeDistribution(scores);

  console.log("Grade Distribution:", gradeCount);
  

  /* Students needing retake logic */
  const failedStudents = getFailedStudents(students);

  console.log("Students needing retake:", failedStudents);
};

function getFailedStudents(students) {
  const failedStudents = students
    .filter((student) => student.score < 60)
    .map((student) => student.name);

  return failedStudents;
}

function getGradeDistribution(scores) {
  let gradeCount = { A: 0, B: 0, C: 0, D: 0, F: 0 };

  for (let score of scores) {
    switch (true) {
      case score >= 90:
        gradeCount.A++;
        break;

      case score >= 80:
        gradeCount.B++;
        break;

      case score >= 70:
        gradeCount.C++;
        break;

      case score >= 60:
        gradeCount.D++;
        break;

      case score < 60:
        gradeCount.F++;
        break;

      default:
        console.log(`Invalid Score ${score}`);
    }
  }

  return gradeCount;
}

function getMaxMinScore(students) {
  let maxScore = -1;
  let minScore = 999999;

  let studentWithMaxScore = "";
  let studentWithMinScore = "";

  students.forEach((v) => {
    if (v.score > maxScore) {
      maxScore = v.score;
      studentWithMaxScore = v.name;
    }

    if (v.score < minScore) {
      minScore = v.score;
      studentWithMinScore = v.name;
    }
  });

  return { maxScore, minScore, studentWithMaxScore, studentWithMinScore };
}

function calculateAverage(values) {
  let avg;

  if (values?.length) {
    const totalSum = values.reduce((acc, num) => {
      return acc + num;
    }, 0);

    avg = totalSum / values.length;
  }

  return avg;
}

analyzeGrades(students);