const request = require("request");
const fs = require("fs");
const args = process.argv.slice(2);
const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

request(args[0], (error, response, body) => {

  if(error){
    console.log("error:", error);
    console.log("statusCode:", response && response.statusCode);
    return;
  }

  fs.writeFile(args[1], body, (error) => {

    if(args[1]){
      rl.question("File already exits. Do you want to overwrite it? (yes/no)", (answer) => {
        if(answer.toLowerCase() === "no") {
          console.log("File not overwritten!");
        }
        rl.close();
      })
    } 

    if (error) {
      console.error(error);
      return;
    }
    
  })
})

