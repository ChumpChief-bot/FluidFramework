/*!
 * Copyright (c) Microsoft Corporation and contributors. All rights reserved.
 * Licensed under the MIT License.
 */

/**
 * @fileoverview In this file, we will test the functions of a EnumProperty object
 * described in /src/properties/enumProperty.js
 */

let PropertyFactory;
let TestEnumTemplate;
let TestInlineEnumTemplate;
let TestEnumArrayTemplate;
let BaseProperty;
let ChangeSet;
let TestBaseContainingEnumTemplate;
let MSG;
let deepCopy;
let _;

describe("Test EnumProperty", () => {
	/**
	 * Get all the objects we need in this test here.
	 */
	before(() => {
		PropertyFactory = require("../..").PropertyFactory;
		BaseProperty = require("../..").BaseProperty;
		ChangeSet = require("@fluid-experimental/property-changeset").ChangeSet;
		MSG = require("@fluid-experimental/property-common").constants.MSG;
		_ = require("lodash");
		deepCopy = _.cloneDeep;

		// the following templates are copies from the specification
		// disableling the single quote rule to keep exact copies
		TestEnumTemplate = {
			typeid: "autodesk.core:UnitsEnum-1.0.0",
			inherits: "Enum",
			annotation: { description: "The metric units" },
			properties: [
				{ id: "m", value: 1, annotation: { description: "meter" } },
				{ id: "cm", value: 2, annotation: { description: "centimeter" } },
				{ id: "mm", value: 3, annotation: { description: "millimeter" } },
			],
		};
		PropertyFactory._reregister(TestEnumTemplate);

		// Enums can also be defined in line in a template
		TestInlineEnumTemplate = {
			typeid: "Adsk.Core:UI.Border-1.0.0",
			properties: [
				{
					id: "lineType",
					typeid: "Enum",
					properties: [
						{ id: "solid", value: 100, annotation: { description: "solid line" } },
						{ id: "dashed", value: 200, annotation: { description: "dashed line" } },
						{ id: "dotted", value: 300, annotation: { description: "dotted line" } },
					],
				},
				{
					id: "style",
					properties: [
						{
							id: "thickness",
							typeid: "Uint32",
							annotation: {
								description: "border thickness in Pixels",
								unit: "Adsk.Core:Units.Imaging-1.0.0",
							},
						},
						{
							id: "secondLevelInlineEnum",
							typeid: "Enum",
							properties: [
								{ id: "A", value: 0, annotation: { description: "The Letter A." } },
								{
									id: "B",
									value: 76596785,
									annotation: { description: "The Letter B." },
								},
								{
									id: "C",
									value: -199999,
									annotation: { description: "The Letter C." },
								},
							],
						},
					],
				},
			],
		};

		PropertyFactory._reregister(TestInlineEnumTemplate);

		TestBaseContainingEnumTemplate = {
			typeid: "autodesk.core:CustomWithEnumID-1.0.0",
			properties: [
				{
					id: "MyEnum",
					typeid: "autodesk.core:UnitsEnum-1.0.0",
				},
			],
		};
		PropertyFactory._reregister(TestBaseContainingEnumTemplate);

		TestEnumArrayTemplate = {
			typeid: "autodesk.core:EnumArrayTestID-1.0.0",
			properties: [
				{
					id: "MyEnumArray",
					typeid: "autodesk.core:UnitsEnum-1.0.0",
					context: "array",
				},
			],
		};
		PropertyFactory._reregister(TestEnumArrayTemplate);
	});

	it("@bugFix should not modify the registered template", () => {
		const enumTemplate = {
			typeid: "autodesk.core:testEnum-1.0.0",
			annotation: { description: "The metric units" },
			properties: [
				{
					typeid: "Enum",
					id: "preset",
					properties: [
						{ id: "m", value: 1, annotation: { description: "meter" } },
						{ id: "cm", value: 2, annotation: { description: "centimeter" } },
						{ id: "mm", value: 3, annotation: { description: "millimeter" } },
					],
				},
			],
		};
		const copyOfTemplate = deepCopy(enumTemplate);
		PropertyFactory._reregister(enumTemplate);
		expect(copyOfTemplate).to.deep.equal(enumTemplate);
		expect(PropertyFactory.getTemplate(copyOfTemplate.typeid).serialize()).to.deep.equal(
			copyOfTemplate,
		);
	});

	it("should correctly set/get the Enum values", () => {
		const enumProp = PropertyFactory.create("autodesk.core:UnitsEnum-1.0.0");

		enumProp.setEnumByString("cm");
		expect(enumProp.getValue()).to.equal(2);
		expect(enumProp.getEnumString()).to.equal("cm");

		enumProp.setEnumByString("mm");
		expect(enumProp.getValue()).to.equal(3);
		expect(enumProp.getEnumString()).to.equal("mm");

		const enumInlineProp = PropertyFactory.create("Adsk.Core:UI.Border-1.0.0");
		const inlinedEnum = enumInlineProp._properties.lineType;
		inlinedEnum.setEnumByString("solid");
		expect(inlinedEnum.getValue()).to.equal(100);
		expect(inlinedEnum.getEnumString()).to.equal("solid");

		const secondLevelInlineProperty = enumInlineProp._properties.style.secondLevelInlineEnum;
		secondLevelInlineProperty.setEnumByString("B");
		expect(secondLevelInlineProperty.getValue()).to.equal(76596785);
		expect(secondLevelInlineProperty.getEnumString()).to.equal("B");

		enumInlineProp._properties.style.thickness.value = 5;

		const firstOne = enumInlineProp.serialize();
		const anotherEnumInlineProp = PropertyFactory.create("Adsk.Core:UI.Border-1.0.0");
		anotherEnumInlineProp.deserialize(firstOne);
		const anotherOne = anotherEnumInlineProp.serialize();
		expect(firstOne).to.deep.equal(anotherOne);
	});

	it("should throw on setting invalid Enum strings", () => {
		const enumProp = PropertyFactory.create("autodesk.core:UnitsEnum-1.0.0");
		expect(() => {
			enumProp.setEnumByString("BadGuy");
		}).to.throw();
	});

	it("should throw on setting invalid Enum values", () => {
		const enumProp = PropertyFactory.create("autodesk.core:UnitsEnum-1.0.0");
		expect(() => {
			enumProp.setValue(23);
		}).to.throw();
	});

	it("should correctly squash Enums", () => {
		const enum1 = PropertyFactory.create("autodesk.core:CustomWithEnumID-1.0.0");
		enum1._properties.MyEnum.value = 1;
		const squashedChangeset = new ChangeSet(enum1.serialize({ dirtyOnly: false }));

		enum1._properties.MyEnum.value = 2;
		const changes = enum1.serialize({ dirtyOnly: true });
		squashedChangeset.applyChangeSet(changes);

		const serializedChangeset = enum1.serialize({ dirtyOnly: false });
		expect(serializedChangeset).to.deep.equal(squashedChangeset.getSerializedChangeSet());
	});

	it("should have a default value that is the lowest valid value", () => {
		const enumProp = PropertyFactory.create("autodesk.core:CustomWithEnumID-1.0.0");
		expect(enumProp.get("MyEnum").value).to.equal(1);
	});

	it("should have a default value of 0 if 0 is a valid value", () => {
		const enumProp = PropertyFactory.create("Adsk.Core:UI.Border-1.0.0");
		expect(enumProp.get("style").get("secondLevelInlineEnum").value).to.equal(0);
	});

	it("should be possible to dynamically add an Enum to a NodeProperty", () => {
		const enumProp = PropertyFactory.create("autodesk.core:UnitsEnum-1.0.0");
		const myNode = PropertyFactory.create("NodeProperty");
		myNode.insert("myEnum", enumProp);
		myNode._properties.myEnum.value = 2;
		const myNodeCopy = PropertyFactory.create("NodeProperty");
		myNodeCopy.deserialize(myNode.serialize({ dirtyOnly: false }));
		// test if the dictionary of the copy is initialized correctly
		expect(myNodeCopy._properties.myEnum.getEnumString()).to.equal("cm");

		// test the consitency of the copy
		expect(myNode.serialize({ dirtyOnly: false })).to.deep.equal(
			myNodeCopy.serialize({ dirtyOnly: false }),
		);
	});

	it("should correctly rebase Properties containing Enum values and correctly show conflicts", () => {
		const baseProperty1 = PropertyFactory.create("autodesk.core:CustomWithEnumID-1.0.0");

		// Create two copies of this state
		const baseProperty2 = PropertyFactory.create("autodesk.core:CustomWithEnumID-1.0.0");
		baseProperty2.deserialize(baseProperty1.serialize({ dirtyOnly: false }));
		const baseProperty3 = PropertyFactory.create("autodesk.core:CustomWithEnumID-1.0.0");
		baseProperty3.deserialize(baseProperty1.serialize({ dirtyOnly: false }));

		// Make sure the states are clear
		baseProperty1.cleanDirty(
			BaseProperty.MODIFIED_STATE_FLAGS.DIRTY |
				BaseProperty.MODIFIED_STATE_FLAGS.PENDING_CHANGE,
		);
		baseProperty2.cleanDirty(
			BaseProperty.MODIFIED_STATE_FLAGS.DIRTY |
				BaseProperty.MODIFIED_STATE_FLAGS.PENDING_CHANGE,
		);

		// Apply the operations to the two properties in parallel
		baseProperty1._properties.MyEnum.value = 2;
		baseProperty2._properties.MyEnum.value = 3;

		// Get the ChangeSets
		const changeSet1 = new ChangeSet(baseProperty1.serialize({ dirtyOnly: true }));
		const changeSet2 = baseProperty2.serialize({ dirtyOnly: true });

		// Perform the actual rebase
		const conflicts = [];
		changeSet1._rebaseChangeSet(changeSet2, conflicts);

		// check result
		expect(changeSet1.getSerializedChangeSet()).to.deep.equal({
			"enum<autodesk.core:UnitsEnum-1.0.0>": {
				MyEnum: 2,
			},
		});
		expect(conflicts).to.have.length(1);
		expect(conflicts[0].type).to.be.equal(ChangeSet.ConflictType.COLLIDING_SET);
		expect(conflicts[0].path).to.be.equal("");
		expect(
			conflicts[0].conflictingChange["enum<autodesk.core:UnitsEnum-1.0.0>"].MyEnum,
		).to.be.equal(2);
	});

	it("specialized EnumArrayProperty should work correctly", () => {
		const enum1 = PropertyFactory.create("autodesk.core:EnumArrayTestID-1.0.0");
		const enumArray = enum1._properties.MyEnumArray;
		enumArray.insertRange(0, [1, "cm", "mm", 3]);
		enumArray.setRange(2, ["m"]);
		enumArray.remove(0, 1);
		expect(enumArray.getEnumString(2)).to.equal("mm");
		expect(enumArray.serialize()).to.deep.equal({
			insert: [[0, [2, 1, 3]]],
		});
	});

	it(".setRange should throw an error when in_offset is not an integer", () => {
		const enum1 = PropertyFactory.create("autodesk.core:EnumArrayTestID-1.0.0");
		const enumArray = enum1._properties.MyEnumArray;
		enumArray.insertRange(0, [1, "cm", "mm"]);
		expect(() => {
			enumArray.setRange("test", ["m"]);
		}).to.throw(MSG.NOT_NUMBER);
	});

	it(".setRange should throw an error when in_array is not an array", () => {
		const enum1 = PropertyFactory.create("autodesk.core:EnumArrayTestID-1.0.0");
		const enumArray = enum1._properties.MyEnumArray;
		enumArray.insertRange(0, [1, "cm", "mm"]);
		expect(() => {
			enumArray.setRange(2, "m");
		}).to.throw(`${MSG.IN_ARRAY_NOT_ARRAY}EnumArrayProperty.setRange`);
	});

	it(".set should throw an error when in_offset is not an integer", () => {
		const enum1 = PropertyFactory.create("autodesk.core:EnumArrayTestID-1.0.0");
		const enumArray = enum1._properties.MyEnumArray;
		enumArray.insertRange(0, [1, "cm", "mm"]);
		expect(() => {
			enumArray.set("test", "m");
		}).to.throw(MSG.NOT_NUMBER);
	});

	it(".set should throw an error when in_value is an array", () => {
		const enum1 = PropertyFactory.create("autodesk.core:EnumArrayTestID-1.0.0");
		const enumArray = enum1._properties.MyEnumArray;
		enumArray.insertRange(0, [1, "cm", "mm"]);
		expect(() => {
			enumArray.set(2, ["m"]);
		}).to.throw(MSG.VALUE_STRING_OR_NUMBER);
	});

	it("isPrimitiveType should evaluate to true", () => {
		const enum1 = PropertyFactory.create(TestEnumTemplate.typeid);
		expect(enum1.isPrimitiveType()).to.equal(true);
	});

	it(".getValidEnumList should return expected enum list", () => {
		const enumProp = PropertyFactory.create("autodesk.core:UnitsEnum-1.0.0");
		const enumList = enumProp.getValidEnumList();
		expect(enumList).to.have.nested.property("m.value", 1);
		expect(enumList).to.have.nested.property("cm.value", 2);
		expect(enumList).to.have.nested.property("mm.value", 3);
	});
});
