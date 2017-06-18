MAP_ROOT := https://storage.googleapis.com/learning-stackdriver/src

build:
	npm start
	sed -i '' -e "s,sourceMappingURL=.*,sourceMappingURL=$(MAP_ROOT)/bundle.js.map," dist/bundle.js
