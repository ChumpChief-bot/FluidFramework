/*!
 * Copyright (c) Microsoft Corporation and contributors. All rights reserved.
 * Licensed under the MIT License.
 */

/**
 * @internal
 */
export const PropertyUtils = {
	/**
	 * Gather all properties that pass an arbitrary predicate function
	 * @param {property-properties.NodeProperty} in_rootProperty - The root property to traverse from
	 * @param {function} in_predicate - The predicate function
	 * @return {Array.<property-properties.BaseProperty>} The list of properties that passed the predicate
	 * function
	 */
	gatherProperties(in_rootProperty, in_predicate) {
		const gatheredProperties = {};
		in_rootProperty.traverseDown((property, path) => {
			if (in_predicate(property)) {
				gatheredProperties[path] = property;
			}
		});

		return gatheredProperties;
	},
};
