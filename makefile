.PHONY: deploy build

build_dir = public
data_dir = sample-data
data_files = $(patsubst %.json, %, $(wildcard $(data_dir)/*.json))

build: $(data_files)

$(data_dir)/%:
	@echo generating $@
	@ruby ./lib/generator.rb $@.json

deploy:
	git subtree push --prefix $(build_dir) origin gh-pages
