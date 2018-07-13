echo "Build"
npm install
npm run build:prod

git config --global user.email $GIT_EMAIL
git config --global user.name $GIT_NAME

git clone $GIT_URL out

cp -a dist/. out/.
cd out

git add .
git commit -m "Automated Deployment"

git push origin master