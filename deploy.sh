git checkout gh-pages && 
git rebase master &&
ng build --prod --output-path docs --base-href //socket-io-ng-client/  &&
sed -i -e  's,//socket-io-ng-client/,/socket-io-ng-client/,g' docs/index.html &&
cp -a docs/index.html docs/404.html  &&
# find . ! -name 'docs' -type d -exec rm -rf {} +
git add ./docs  &&
git commit -m "Released on $(date '+%Y-%m-%d  %H:%M:%S')"  &&
git push -f &&
git checkout master
