require('./db');
const Issue = require('./issues')

const tempIssues = [
    {
      id: 1,
      status: "Assigned",
      author: "Random Person",
      effort: 5,
      created: new Date("2022-09-18"),
      due: new Date("2022-09-19"),
      title: "This is the First issue",
    },
    {
      id: 2,
      status: "Pending",
      author: "Designated Person",
      effort: 10,
      created: new Date("2022-09-17"),
      due: new Date("2022-09-20"),
      title: "This is the Second issue",
    },
  ];

Issue.insertMany(tempIssues)
    .then(function(data){
        console.log("Data", data)
})


// const query = Issue.find({});
// query.count(function(err, count){
//   console.log(count);
// })