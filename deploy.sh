git checkout gh-pages && 
git merge master &&
ng build --prod --output-path docs --base-href //socket-io-ng-client/  &&
cp -a docs/index.html docs/404.html  &&
# find . ! -name 'docs' -type d -exec rm -rf {} +
git add ./  &&
git commit -m "Released $(date '+%Y-%m-%d  %H:%M:%S')"  &&
git push &&
git checkout master
