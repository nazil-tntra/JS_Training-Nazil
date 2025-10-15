const students = [
{ name: "Alice", score: 85 },
{ name: "Bob", score: 92 },
{ name: "Charlie", score: 58 },
{ name: "David", score: 74 }
];

const analyzeGrades = (students) => {

    /* Calculate Average */
    const scores = students?.map((v,i,arr)=>{
        return v.score;
    })

    // console.log(scores)

    const average = calculateAverage(scores)
    console.log(`Average Score: ${average}`)


    /* Calculate Max and Min Score */
    let maxScore = -1;
    let minScore = 999999;

    let studentWithMaxScore = "";
    let studentWithMinScore = "";

    students.forEach((v)=>{
        if(v.score > maxScore) {
            maxScore = v.score;
            studentWithMaxScore = v.name;
        }

        if(v.score < minScore) {
            minScore = v.score;
            studentWithMinScore = v.name;
        }
    })

    console.log(`Highest Score: ${studentWithMaxScore} (${maxScore})`)
    console.log(`Highest Score: ${studentWithMinScore} (${minScore})`)
}


function calculateAverage(values) {
    let avg;

    if(values?.length) {
        const totalSum = values.reduce((acc,num)=>{
            return acc + num;
        }, 0);

        avg = totalSum / values.length;
    }

    return avg;
}


analyzeGrades(students)
