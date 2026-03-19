/*!
 * Copyright (c) Microsoft Corporation and contributors. All rights reserved.
 * Licensed under the MIT License.
 */

/**
 * @fileoverview
 * Test data for property set template schema testing
 */

/**
 * @namespace property-propertiesTest.Test
 * @alias bad_nested_properties.js
 * Namespace containing all schema-related data for property set validation
 */
const templateSchema100 = {
	properties: [
		{
			id: "r",
			typeid: "Float32",
			annotation: { description: "Red" },
		},
		{
			id: "g",
			typeid: "Float32",
			annotation: { description: "Green" },
		},
		{
			id: "b",
			typeid: "Float32",
			annotation: { description: "Blue" },
		},
	],
	typeid: "TeamLeoValidation2:ColorID-1.0.0",
};

const templateSchema100Modified = {
	properties: [
		{
			id: "r",
			typeid: "Float32",
			annotation: { description: "Red" },
		},
		{
			id: "g",
			typeid: "Float32",
			annotation: { description: "Green" },
		},
	],
	typeid: "TeamLeoValidation2:ColorID-1.0.0",
};

const templateSchema101 = {
	properties: [
		{
			id: "r",
			typeid: "Float32",
			annotation: { description: "Red" },
		},
		{
			id: "g",
			typeid: "Float32",
			annotation: { description: "Green" },
		},
		{
			id: "b",
			typeid: "Float32",
			annotation: { description: "Blue" },
		},
	],
	typeid: "TeamLeoValidation2:ColorID-1.0.1",
	annotation: { description: "Color template" },
};

const templateSchema101BadSemver = {
	properties: [
		{
			id: "r",
			typeid: "Float32",
			annotation: { description: "Red" },
		},
		{
			id: "g",
			typeid: "Float32",
			annotation: { description: "Green" },
		},
		{
			id: "b",
			typeid: "Float32",
			annotation: { description: "Blue" },
		},
		{
			id: "a",
			typeid: "Float32",
			annotation: { description: "Alpha" },
		},
	],
	typeid: "TeamLeoValidation2:ColorID-1.0.1",
};

const templateSchema110 = {
	properties: [
		{
			id: "r",
			typeid: "Float32",
			annotation: { description: "Red" },
		},
		{
			id: "g",
			typeid: "Float32",
			annotation: { description: "Green" },
		},
		{
			id: "b",
			typeid: "Float32",
			annotation: { description: "Blue" },
		},
		{
			id: "a",
			typeid: "Float32",
			annotation: { description: "Alpha" },
		},
	],
	typeid: "TeamLeoValidation2:ColorID-1.1.0",
};

const templateSchema110BadSemver = {
	properties: [
		{
			id: "r",
			typeid: "Float32",
			annotation: { description: "Red" },
		},
		{
			id: "g",
			typeid: "Float32",
			annotation: { description: "Green" },
		},
	],
	typeid: "TeamLeoValidation2:ColorID-1.1.0",
};

const templateSchema110BadSemver2 = {
	properties: [
		{
			id: "r",
			typeid: "Float32",
			annotation: { description: "Red" },
		},
		{
			id: "g",
			typeid: "Float32",
			annotation: { description: "Green" },
		},
	],
	typeid: "TeamLeoValidation2:ColorID-1.0.1",
};

const templateSchema200 = {
	properties: [
		{
			id: "r",
			typeid: "Float32",
			annotation: { description: "Red" },
		},
		{
			id: "g",
			typeid: "Float32",
			annotation: { description: "Green" },
		},
	],
	typeid: "TeamLeoValidation2:ColorID-2.0.0",
};

const objToExport = {
	"1-0-0": {
		original: templateSchema100,
		modified: templateSchema100Modified,
	},
	"1-0-1": {
		goodSemver: templateSchema101,
		badSemver1: templateSchema101BadSemver,
	},
	"1-1-0": {
		goodSemver: templateSchema110,
		badSemver1: templateSchema110BadSemver,
		badSemver2: templateSchema110BadSemver2,
	},
	"2-0-0": templateSchema200,
};

module.exports = objToExport;
