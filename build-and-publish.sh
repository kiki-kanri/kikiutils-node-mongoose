#!/bin/bash

npm run build &&
	cp ./package.json ./README.md ./dist/ &&
	cd ./dist &&
	npm publish
