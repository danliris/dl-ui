echo "Build"
npm install
npm run build:prod

git config --global user.email $GIT_EMAIL
git config --global user.name $GIT_NAME

if [ "$BRANCH" == "dev" ]; then
    git clone $GIT_URL_DEV out
elif [ "$BRANCH" == "uat" ]; then
    git clone $GIT_URL_UAT out
elif [ "$BRANCH" == "master" ]; then
    git clone $GIT_URL_MASTER out
else
    git clone $GIT_URL out
fi

cp -a dist/. out/.
cd out

git add .
git commit -m "Automated Deployment"

git push origin master
