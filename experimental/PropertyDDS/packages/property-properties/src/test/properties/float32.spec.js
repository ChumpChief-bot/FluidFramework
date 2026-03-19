/*!
 * Copyright (c) Microsoft Corporation and contributors. All rights reserved.
 * Licensed under the MIT License.
 */

/**
 * @fileoverview In this file, we will test Float32 object described in /src/properties/float32.js
 */

describe("Float32", () => {
	let Float32Property;

	/**
	 * Get all the objects we need in this test here.
	 */
	before(() => {
		Float32Property = require("../../properties/floatProperties").Float32Property;
	});

	describe("Checking the value stored in ValueProperty", () => {
		it("should return the same value", (done) => {
			let fp;
			let error;
			const value = 100;
			try {
				fp = new Float32Property({ id: "temperature" });
				fp.setValue(value);
			} catch (error_) {
				error = error_;
			} finally {
				expect(fp).to.not.equal(null);
				expect(fp.getValue()).to.equal(value);
				expect(error).to.equal(undefined);
				done();
			}
		});
	});
});
