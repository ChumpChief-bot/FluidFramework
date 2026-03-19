/*!
 * Copyright (c) Microsoft Corporation and contributors. All rights reserved.
 * Licensed under the MIT License.
 */

/* globals */

/**
 * @fileoverview
 * In this file, we will test the functions of a PropertyTemplateWrapper object described in /src/property_template_wrapper.js
 */

const { PropertyFactory } = require("..");

describe("Property Template Wrapper", () => {
	describe("Compiled Template Creation", () => {
		it("should work for template that has no inheritence", () => {
			const noParents = {
				typeid: "SimpleTest:NoParents-1.0.0",
				properties: [{ id: "area", typeid: "Float32" }],
			};

			PropertyFactory.register(noParents);
			const wrapper = PropertyFactory._getWrapper("SimpleTest:NoParents-1.0.0");

			const compiledTemplate = wrapper.getCompiledTemplate(PropertyFactory);

			expect(compiledTemplate).to.deep.equal(wrapper.getPropertyTemplate());
		});

		it("should contain properties from parent templates", () => {
			const withParents = {
				typeid: "SimpleTest:WithParents-1.0.0",
				inherits: ["SimpleTest:Parent1-1.0.0", "SimpleTest:Parent2-1.0.0"],
				properties: [{ id: "area", typeid: "Float32" }],
			};

			const parent1 = {
				typeid: "SimpleTest:Parent1-1.0.0",
				properties: [{ id: "parent1Prop", typeid: "Float32" }],
			};

			const parent2 = {
				typeid: "SimpleTest:Parent2-1.0.0",
				properties: [{ id: "parent2Prop", typeid: "Float32" }],
			};

			PropertyFactory._reregister(parent1);
			PropertyFactory._reregister(parent2);
			PropertyFactory._reregister(withParents);
			const wrapper = PropertyFactory._getWrapper("SimpleTest:WithParents-1.0.0");

			const compiledTemplate = wrapper.getCompiledTemplate(PropertyFactory);

			expect(compiledTemplate.properties).to.deep.equal([
				{ id: "area", typeid: "Float32" },
				{ id: "parent1Prop", typeid: "Float32" },
				{ id: "parent2Prop", typeid: "Float32" },
			]);
		});

		it("should contain constants from parent templates", () => {
			const withParents = {
				typeid: "SimpleTest:WithParents-1.0.0",
				inherits: ["SimpleTest:Parent1-1.0.0", "SimpleTest:Parent2-1.0.0"],
				constants: [{ id: "area", typeid: "Float32" }],
			};

			const parent1 = {
				typeid: "SimpleTest:Parent1-1.0.0",
				constants: [{ id: "parent1Prop", typeid: "Float32" }],
			};

			const parent2 = {
				typeid: "SimpleTest:Parent2-1.0.0",
				constants: [{ id: "parent2Prop", typeid: "Float32" }],
			};

			PropertyFactory._reregister(parent1);
			PropertyFactory._reregister(parent2);
			PropertyFactory._reregister(withParents);
			const wrapper = PropertyFactory._getWrapper("SimpleTest:WithParents-1.0.0");

			const compiledTemplate = wrapper.getCompiledTemplate(PropertyFactory);

			expect(compiledTemplate.constants).to.deep.equal([
				{ id: "area", typeid: "Float32" },
				{ id: "parent1Prop", typeid: "Float32" },
				{ id: "parent2Prop", typeid: "Float32" },
			]);
		});

		it("should merge property if found in both child and parent", () => {
			const withParents = {
				typeid: "SimpleTest:WithParents-1.0.0",
				inherits: ["SimpleTest:Parent1-1.0.0"],
				properties: [{ id: "area", value: "1.1" }],
			};

			const parent1 = {
				typeid: "SimpleTest:Parent1-1.0.0",
				properties: [{ id: "area", context: "array", typeid: "Float32" }],
			};

			PropertyFactory._reregister(parent1);
			PropertyFactory._reregister(withParents);
			const wrapper = PropertyFactory._getWrapper("SimpleTest:WithParents-1.0.0");

			const compiledTemplate = wrapper.getCompiledTemplate(PropertyFactory);

			expect(compiledTemplate.properties).to.deep.equal([
				{ id: "area", context: "array", typeid: "Float32", value: "1.1" },
			]);
		});

		it("should merge constant if found in both child and parent", () => {
			const withParents = {
				typeid: "SimpleTest:WithParents-1.0.0",
				inherits: ["SimpleTest:Parent1-1.0.0"],
				constants: [{ id: "area", value: "1.1" }],
			};

			const parent1 = {
				typeid: "SimpleTest:Parent1-1.0.0",
				constants: [{ id: "area", context: "array", typeid: "Float32" }],
			};

			PropertyFactory._reregister(parent1);
			PropertyFactory._reregister(withParents);
			const wrapper = PropertyFactory._getWrapper("SimpleTest:WithParents-1.0.0");

			const compiledTemplate = wrapper.getCompiledTemplate(PropertyFactory);

			expect(compiledTemplate.constants).to.deep.equal([
				{ id: "area", context: "array", typeid: "Float32", value: "1.1" },
			]);
		});

		it("should throw error if schema inherits from more than one creation type", () => {
			const badTemplate = {
				typeid: "SimpleTest:BadTemplate-1.0.0",
				inherits: ["NodeProperty", "Binary"],
				properties: [
					{
						id: "props",
						properties: [
							{
								id: "area",
								properties: [{ id: "length", typeid: "Float32" }],
							},
						],
					},
				],
			};

			expect(() => {
				PropertyFactory.register(badTemplate);
			}).to.throw();
		});

		it("should throw error if schema indirectly inherits from more than one creation type", () => {
			const badParent1 = {
				typeid: "SimpleTest:BadParent1-1.0.0",
				inherits: ["NodeProperty"],
			};

			const badParent2 = {
				typeid: "SimpleTest:BadParent2-1.0.0",
				inherits: ["Binary"],
			};

			const badTemplate = {
				typeid: "SimpleTest:IndirectBadTemplate-1.0.0",
				inherits: ["SimpleTest:BadParent1-1.0.0", "SimpleTest:BadParent2-1.0.0"],
				properties: [
					{
						id: "props",
						properties: [
							{
								id: "area",
								properties: [{ id: "length", typeid: "Float32" }],
							},
						],
					},
				],
			};

			expect(() => {
				PropertyFactory.register(badTemplate);
				PropertyFactory.register(badParent1);
				PropertyFactory.register(badParent2);
			}).to.throw();
		});
	});
});
