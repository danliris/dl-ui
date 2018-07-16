echo "Build"
npm install
npm run build:prod

git config --global user.email $GIT_EMAIL
git config --global user.name $GIT_NAME

if [ "$BRANCH" == "dev" ]; then
    git clone $GIT_URL_DEV out;
else if [ "$BRANCH" == "uat" ]; then
    git clone $GIT_URL_UAT out;
else if [ "$BRANCH" == "master" ]; then
    git clone $GIT_URL_MASTER out;
fi

cp -a dist/. out/.
cd out

git add .
git commit -m "Automated Deployment"

git push origin master