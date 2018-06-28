import { Constants } from '../index';
import DataAccessorWithSorterAndFilter from './DataAccessorWithSorterAndFilter';

/**
 * Internal function.
 */
function removeMappingItem(mapping, index) {
	const updatedMapping = mapping.slice();
	updatedMapping.splice(index, 1);
	return updatedMapping;
}

/**
 * This class is responsible for managing input/output data and mapping.
 * It provides some convenient methods to manipulate data and mapping.
 * It uses a cache to store the schema elements.
 * It stores the results of filtering and sorting.
 */
export default class DataAccessorWrapper {
	constructor() {
		this.cache = {};
		this.schema2side = {};
		this.internalDataAccessors = {};
		this.mappingVersion = 0;
	}

	/**
	 * @private
	 */
	internalGetMappingItemIndex(mapping, source, target) {
		return mapping.findIndex(item => item.source.id === source.id && item.target.id === target.id);
	}

	/**
	 * @private
	 */
	side(schema) {
		return this.schema2side[this.getSchemaId(schema)];
	}

	isRegistered(schema) {
		return side(schema);
	}

	registerSchema(schema, side) {
		const schemaId = this.getSchemaId(schema);
		this.schema2side[schemaId] = side;
		this.internalDataAccessors[side] = new DataAccessorWithSorterAndFilter(schema.elements);
		this.populateCache(schema, side);
	}

	/**
	 * @private
	 */
	populateCache(schema, side) {
		this.cache[side] = {};
		const elements = schema.elements;
		for (let i = 0; i < elements.length; i += 1) {
			this.cache[side][this.getElementId(elements[i])] = elements[i];
		}
	}

	/**
	 * @private
	 */
	access(schema) {
		return this.internalDataAccessors[this.side(schema)];
	}

	isCacheInitialized() {
		return this.cache;
	}

	getSchemaElementFromCache(schema, id) {
		return this.cache[this.side(schema)][id];
	}

	getElementFromCache(side, id) {
		return this.cache[side][id];
	}

	setFilteredElements(schema, filteredElements) {
		this.access(schema).setFilteredElements(filteredElements);
	}

	getFilteredElements(schema) {
		return this.access(schema).getFilteredElements();
	}

	setSortedElements(schema, sortedElements) {
		this.access(schema).setSortedElements(sortedElements);
	}

	getSortedElements(schema) {
		return this.access(schema).getSortedElements();
	}

	getFiltersVersion(schema) {
		return this.access(schema).getFiltersVersion();
	}

	getFiltersVersionForSide(side) {
		return this.internalDataAccessors[side].getFiltersVersion();
	}

	isFiltered(schema, element) {
		return this.access(schema).isFiltered(element);
	}

	/**
	 * Returns true if the two elements are equals.
	 * Default implementation is based on element id.
	 */
	areElementsEqual(element1, element2) {
		return this.getElementId(element1) === this.getElementId(element2);
	}

	getSchemaId(schema) {
		return schema.id;
	}

	/**
	 * Returns the name of the schema.
	 */
	getSchemaName(schema) {
		return schema.name;
	}

	/**
	 * Returns the number of elements in the schema.
	 * @param {object} schema - The schema
	 * @param {boolean} withFiltersAndSorter - if true then the result takes into account the filters.
	 */
	getSchemaSize(schema, withFiltersAndSorter) {
		return this.access(schema).getSize(withFiltersAndSorter);
	}

	/**
	 * Returns all the elements of the schema in an array.
	 */
	getSchemaElements(schema, withFiltersAndSorter) {
		return this.access(schema).getElements(withFiltersAndSorter);
	}

	/**
	 * Returns the nth element of the schema.
	 */
	getSchemaElement(schema, index, withFiltersAndSorter) {
		return this.access(schema).getElement(index, withFiltersAndSorter);
	}

	/**
	 * Returns the index of the given element,
	 * returns -1 if it is not in the schema.
	 */
	getSchemaElementIndex(schema, element, withFiltersAndSorter) {
		return this.access(schema).getElementIndex(element, withFiltersAndSorter);
	}

	/**
	 * Returns the element corresponding to the given schema and identifier.
	 * @param {object} schema - The schema
	 * @param {string} id - the element identifier
	 */
	getSchemaElementFromId(schema, id) {
		if (this.isCacheInitialized()) {
			return this.getSchemaElementFromCache(schema, id);
		}
		return this.access(schema).getElementFromId(id);
	}

	/**
	 * Returns the identifier of the element.
	 * Identifier must be unique.
	 */
	getElementId(element) {
		return element.id;
	}

	/**
	 * Returns a label for the given element.
	 */
	getElementLabel(element) {
		return element.name;
	}

	/**
	 * Returns true if the array of elements contains the specified element.
	 */
	includes(elements, element) {
		for (let i = 0; i < elements.length; i += 1) {
			if (this.areElementsEqual(elements[i], element)) {
				return true;
			}
		}
		return false;
	}

	haveSameData(element1, element2, key) {
		const data1 = element1[key];
		const data2 = element2[key];
		return data1 && data2 && data1 === data2;
	}

	/**
	 * MAPPING SECTION
	 */

	getMappingVersion() {
		return this.mappingVersion;
	}

	/**
	 * Returns an array of all the mapping items. A mapping item defines
	 * a mapping between a source and a target element.
	 * { source: element, target: element }
	 */
	getMappingItems(mapping) {
		return mapping;
	}

	/**
	 * Returns true if the given mapping is empty
	 */
	isMappingEmpty(mapping) {
		return !mapping.length;
	}

	/**
	 * Return the mapped element for the specified side.
	 */
	getMappedElement(mappingItem, side) {
		if (side === Constants.MappingSide.INPUT) {
			return mappingItem.source;
		}
		return mappingItem.target;
	}

	/**
	 * Add a new mapping from source element to target element.
	 * Returns the updated mapping.
	 */
	addMapping(mapping, source, target) {
		this.mappingVersion += 1;
		return mapping.concat({ source, target });
	}

	addMappingItems(mapping, mappingItems) {
		let updatedMapping = mapping.slice();
		for (let i = 0; i < mappingItems.length; i += 1) {
			const item = mappingItems[i];
			updatedMapping = updatedMapping.concat(item);			
		}
		this.mappingVersion += 1;
		return updatedMapping;
	}

	/**
	 * Remove the (source->target) mapping.
	 * Returns the updated mapping.
	 */
	removeMapping(mapping, source, target) {
		this.mappingVersion += 1;
		// FIXME Use ES6 feature instead
		const index = this.internalGetMappingItemIndex(mapping, source, target);
		if (index >= 0) {
			return removeMappingItem(mapping, index);
		}
		return mapping;
	}

	/**
	 * Remove all the mapping items.
	 * Returns the updated mapping.
	 */
	clearMapping(mapping) {
		this.mappingVersion += 1;
		return [];
	}

	// Some more convenient methods

	isElementInMappingItem(mappingItem, element, side) {
		const mappedElement = this.getMappedElement(mappingItem, side);
		return this.areElementsEqual(mappedElement, element);
	}

	/**
	 * isElementMapped returns true if the given (element, side) is mapped
	 * (i.e. if it appears in the mapping)
	 */
	isElementMapped(mapping, element, side) {
		if (mapping != null) {
			const mappingItems = this.getMappingItems(mapping);
			return mappingItems.find(item => this.isElementInMappingItem(item, element, side));
		}
		return false;
	}

	/**
	 * isFullMapped returns true if all the elements of the given schema are mapped
	 */
	isFullMapped(mapping, schema, side) {
		// TODO could be optimized
		for (let i = 0; i < this.getSchemaSize(schema, false); i += 1) {
			if (!this.isElementMapped(mapping, this.getSchemaElement(schema, i, false), side)) {
				return false;
			}
		}
		return true;
	}

	getMappingItemsWithElement(mapping, element, side) {
		const mappingItems = this.getMappingItems(mapping);
		return mappingItems.filter(item => this.isElementInMappingItem(item, element, side));
	}

	getConnectedElements(mapping, element, side) {
		const items = this.getMappingItemsWithElement(mapping, element, side);
		if (items != null) {
			const connectedSide = Constants.switchMappingSide(side);
			return items.map(item => this.getMappedElement(item, connectedSide));
		}
		return null;
	}

	haveSameContent(elements1, elements2) {
		if (elements1 && elements2) {
			if (elements1.length === elements2.length) {
				for (let i = 0; i < elements1.length; i += 1) {
					if (!this.includes(elements2, elements1[i])) {
						return false;
					}
				}
				return true;
			}
			return false;
		} else if (elements1 || elements2) {
			return false;
		}
		return true;
	}
}