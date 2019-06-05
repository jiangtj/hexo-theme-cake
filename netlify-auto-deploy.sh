#!/bin/sh

npm install hexo-cli -g
git clone https://github.com/JiangTJ/blog.git blog
cd blog
mv ../languages themes/next/
mv ../layout themes/next/
mv ../scripts themes/next/
mv ../source themes/next/
mv ../_config.yml themes/next/
mv ../package.json themes/next/
npm install
hexo config theme next
hexo config url https://j-blog-theme-test.netlify.com
hexo g
mv public ../
