Starting over - 'fullstackopen' section 3 with mongodb
I got to section 5 and realized I did not understand WHY and broke my app beyond repair trying to figure it out.

😁YAY! It works now!

https://arcane-lake-01706.herokuapp.com/api/notes

Steps to deploy (Express) :

1. heroku login, heroku create

2. add `Procfile` to backend root, add `app.use(express.static("build"))` to `index.js`

3. create repo/commit to git _without `build` directory_ - `git push -u origin master`

4. verify sample data

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
