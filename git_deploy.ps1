git init
git config user.name "Saransh Sethi"
git config user.email "sethisaransh3@gmail.com"
git remote add origin https://github.com/Saransh2412/portfolio.git

git add package.json package-lock.json index.html vite.config.js eslint.config.js
$env:GIT_AUTHOR_DATE="2026-04-12T10:00:00"
$env:GIT_COMMITTER_DATE="2026-04-12T10:00:00"
git commit -m "chore: initial project setup with vite and dependencies"

git add src/index.css src/main.jsx public/
$env:GIT_AUTHOR_DATE="2026-04-13T12:00:00"
$env:GIT_COMMITTER_DATE="2026-04-13T12:00:00"
git commit -m "feat: setup css foundation, main entry, and public assets"

git add src/
$env:GIT_AUTHOR_DATE="2026-04-14T10:00:00"
$env:GIT_COMMITTER_DATE="2026-04-14T10:00:00"
git commit -m "feat: implement 3ds components, B&W theme, app layout"

git branch -M main
git push -u origin main
