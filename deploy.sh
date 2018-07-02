echo "Build"
npm install
npm run build:prod

git config --global user.email $GH_EMAIL
git config --global user.name $GH_NAME

git clone https://${GH_TOKEN}@github.com/danliris/danliris.github.io.git out

cp -a dist/. out/.
cd out

git add .
git commit -m "Automated Deployment"

git push origin master