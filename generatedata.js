const faker = require("faker");
//store
let data = { users: [] }
//generate
for(let i=0; i<10; i++) {
  data.products.push({
    id: i,
    username: faker.random.words(),
    password: Math.floor(Math.random()*1000),
    email: Math.floor(Math.random()*1000)
  })
}
//log for wrap output to db.json cli=> node this.js > db.json
console.log(JSON.stringify(data))
