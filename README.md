Starting over - 'fullstackopen' section 3 with mongodb
I got to section 5 and realized I did not understand WHY and broke my app beyond repair trying to figure it out.

😁YAY! It works now!

https://floating-bayou-03011.herokuapp.com/

Steps to deploy (Express) :

1. heroku login, heroku create

2. add `Procfile` to backend root, and add `app.use(express.static("build"))` to `index.js`

3. create repo/commit to git _without `build` directory_ - `git push -u origin master`

4. configure Heroku with mongodb url/password `heroku config:set MONGODB_URI=mongodb+srv://fullstack2020:YOUR-ACTUAL-PASSWORD@cluster0-lw40o.mongodb.net/example-app?retryWrites=true`

---

NOTE: Don't forget to add `SECRET=secret` to heroku config after adding jwt auth! That's what my problem was!

#HEROKU TROUBLESHOOTING:
Lesson learned the hard way. Heroku does not update your .git/config for you if you delete and re-create your heroku app. If you run into problems, check the config file for an entry that looks like this:

```
[remote "heroku"]
	url = https://git.heroku.com/floating-bayou-03011.git
	fetch = +refs/heads/*:refs/remotes/heroku/*

```

Make sure the url is correct.
