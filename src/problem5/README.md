# Tale Project

# How to run server from local

1. Prepare .env file
2. Run `npm run start:dev`

# How to run server by docker

1. Prepare .env file
2. Run `npm run docker:app:build`
3. Run `npm run docker:app:run`


# How to deploy

1.  Push latest code to git
2.  Access to server via SSH command
3.  npm run build && pm2 restart 0 && pm2 logs 0
