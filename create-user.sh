#/bin/bash
curl --location --request POST 'http://localhost:3000/api/register' \
--header 'Content-Type: application/json' \
--data-raw ' {
        "name": "user",
        "password": "password"
 }'