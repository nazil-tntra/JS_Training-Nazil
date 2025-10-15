const students = [
{ name: "Alice", score: 85 },
{ name: "Bob", score: 92 },
{ name: "Charlie", score: 58 },
{ name: "David", score: 74 }
];

const analyzeGrades = (students) => {

    const scores = students?.map((v,i,arr)=>{
        return v.score;
    })

    // console.log(scores)

    const average = calculateAverage(scores)
    console.log(`Average Score: ${average}`)
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
