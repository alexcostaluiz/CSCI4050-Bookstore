CLANG_FORMAT=node_modules/clang-format/bin/linux_x64/clang-format --style=Google
ESLINT=node_modules/eslint/bin/eslint.js
HTML_VALIDATE=node_modules/html-validate/bin/html-validate.js
PRETTIER=node_modules/prettier/bin-prettier.js

JAVA = $(shell find src/ -iname "*.java")
HTML = $(shell find frontend/src -name "*.html") $(shell find frontend/public -name "*.html") $(shell find src/ -name "*.html")
CSS = $(shell find frontend/src -name "*.css") $(shell find src/ -name "*.css")
JS = $(shell find frontend/src -name "*.js") $(shell find src/ -name "*.js")

node_modules:
	npm install clang-format prettier html-validate eslint eslint-config-google

pretty: node_modules
	$(PRETTIER) --write $(HTML) $(CSS) $(JS)
	$(CLANG_FORMAT) -i $(JAVA)

validate: node_modules
	$(HTML_VALIDATE) $(HTML)
	$(ESLINT) $(JS)

package:
	./mvnw package

run:
	./mvnw spring-boot:run
