all: data/uk-sic-2007.csv data/bicswave111.xlsx data/ai-adoption-data.csv

data/uk-sic-2007.csv:
	curl https://raw.githubusercontent.com/datasets/uk-sic-2007-condensed/master/data/uk-sic-2007-condensed.csv > data/uk-sic-2007.csv

data/ai-adoption-data.csv: data/bicswave111.xlsx
	npx -p https://cdn.sheetjs.com/xlsx-cli/xlsx-cli-1.1.4.tgz xlsx-cli --sheet 'Artificial Intel TS (WTD) (1)'  data/bicswave111.xlsx > data/ai-adoption-data.csv

data/uk-sic-2007.json: data/uk-sic-2007.csv
	npx csvtojson data/uk-sic-2007.csv > data/uk-sic-2007.json

data/bicswave111.xlsx:
	curl https://www.ons.gov.uk/file?uri=/economy/economicoutputandproductivity/output/datasets/businessinsightsandimpactontheukeconomy/bicswave111/bicswave1112final.xlsx > data/bicswave111.xlsx

data/bicswave105.xlsx:
	curl https://www.ons.gov.uk/file?uri=/economy/economicoutputandproductivity/output/datasets/businessinsightsandimpactontheukeconomy/bicswave105/bicswave1052final.xlsx > data/bicswave105.xlsx

data/bicswave98.xlsx:
	curl https://www.ons.gov.uk/file?uri=/economy/economicoutputandproductivity/output/datasets/businessinsightsandimpactontheukeconomy/bicswave98/bicswave98maindataset.xlsx > data/bicswave98.xlsx

data/bicswave92.xlsx:
	curl https://www.ons.gov.uk/file?uri=/economy/economicoutputandproductivity/output/datasets/businessinsightsandimpactontheukeconomy/bicswave92/bicswave92mainfinal.xlsx > data/bicswave92.xlsx
