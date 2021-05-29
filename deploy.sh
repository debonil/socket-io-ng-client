git checkout gh-pages && 
git rebase master &&
ng build --prod --output-path docs --base-href //socket-io-ng-client/  &&
cp -a docs/index.html docs/404.html  &&
git add ./  &&
git commit -m "Released $(date '+%Y-%m-%d  %H:%M:%S')"  &&
git push  -f &&
git checkout master
