const jwt = require('./lib/jwt');

let data = {
    user_id: 1,
    name: 'Vincent',
    usia: 25
}

let encoded_data = jwt.Encode(data);
console.log(encoded_data);

let decoded_data = jwt.Decode(encoded_data);
console.log(decoded_data);