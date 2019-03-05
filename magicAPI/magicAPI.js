const dataFull = require('./largeData/combinedData.js');
const blocksAll = require('./largeData/standard_blocks/standard_blocks.js');

const filterSets = (filter) => {
	let dataSet = dataFull.filter(elem => {
		if(filter==='All') return true;
		if(elem.set===filter) return true;
		return false
	})
	return dataSet;
}

const filterType = (elem, filter) => {
	if(filter==='All') return true;
	if(elem.type_line.includes(filter)) return true;
	return false;
}

const filterColor = (elem, filter) => {
	if(filter==='All') return true;
	if(elem.color_identity.includes(filter)) return true;
	return false;
}

const filterRarity = (elem, filter) => {
	if(filter==='All') return true;
	if(elem.rarity===filter) return true;
	return false;
}



const applyFilters = (filters) => {

	let data = filterSets(filters.set); //first decide how big of dataset you want to use. 'All will default to full set'

	let filtered = data.filter(elem => {
		const conditionType = filterType(elem, filters.type);
		const conditionColor = filterColor(elem, filters.color);
		const conditionRarity = filterRarity(elem, filters.rarity);

		return ( conditionType && conditionColor && conditionRarity);
	})
	return filtered;
}

const applyFiltersAll = (filters) => {
	let filtered = dataFull.filter(elem => {
		const conditionType = filterType(elem, filters.type);
		const conditionColor = filterColor(elem, filters.color);
		const conditionRarity = filterRarity(elem, filters.rarity);

		return ( conditionType && conditionColor && conditionRarity);
	})
	return filtered;

}

const applyFiltersByBlock = (name) => {
	let block = blocksAll.filter(elem => {
		return(elem.name===name);
	})
	console.log('block: ', block);
	let sets = block.sets;
	let filtered = dataFull.filter(elem => {
		if(sets.includes(elem.set)) return true;
		return false
	})
	return filtered
}

exports.filterCards = function(req, res, next) {

	// console.log('Req.query for filterCards: ', req.query);
	let returnData = applyFilters(req.query);

	res.send(returnData);
}

exports.filterCardsAll = function(req, res, next) {

	let returnData;
	// console.log('Req.query for filterCardsAll: ', req.query);

	let filtered = applyFiltersAll(req.query.sets);

	// if(filtered.length > 1000) {
	// 	returnData = filtered.slice(0,1000);
	// }
	// console.log('returnData.length: ', returnData);

	res.send(returnData);
}

exports.filterCardsByBlock = function(req, res, next) {
	console.log('Req.query for filterCardsByBlock: ', req.query); //should recieve an object with keys name(string) and sets(array)


	let filtered = applyFiltersByBlock(req.query.name);

	res.send(filtered);
}
