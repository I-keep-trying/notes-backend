Starting over - 'fullstackopen' section 3 with mongodb
I got to section 5 and realized I did not understand WHY and broke my app beyond repair trying to figure it out.

😁YAY! It works now!
... Uhhh, sorta. Only on localhost I guess. 🤕

https://floating-bayou-03011.herokuapp.com/

The Heroku deploy looks ok at first glance, but the login is not working idk why.

Steps to deploy (Express) :

1. heroku login, heroku create

2. add `Procfile` to backend root, add `app.use(express.static("build"))` to `index.js`

3. create repo/commit to git _without `build` directory_ - `git push -u origin master`

4. configure Heroku with mongodb url/password `heroku config:set MONGODB_URI=mongodb+srv://fullstack2020:YOUR-ACTUAL-PASSWORD@cluster0-lw40o.mongodb.net/example-app?retryWrites=true`

5. commit to heroku - `git push heroku master`

6. copy `build` directory from frontend to root of backend

7. commit again - `git push -u origin master`

8. push to heroku again - `git push heroku master`

Note: no need to commit front end for this to work

In order to replace `build` directory in git repo:

```
git checkout master
git rm -r build
git commit -m "message"
git push origin master

```

#HEROKU TROUBLESHOOTING:
Lesson learned the hard way. Heroku does not update your .git/config for you if you delete and re-create your heroku app. If you run into problems, check this file for an entry that looks like this:

```
[remote "heroku"]
	url = https://git.heroku.com/floating-bayou-03011.git
	fetch = +refs/heads/*:refs/remotes/heroku/*

```

Make sure the right url is entered.
