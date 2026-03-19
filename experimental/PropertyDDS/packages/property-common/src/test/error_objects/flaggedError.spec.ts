/*!
 * Copyright (c) Microsoft Corporation and contributors. All rights reserved.
 * Licensed under the MIT License.
 */

/**
 * @fileoverview Tests the functions exported by error_objects/http_error.js
 */

import { expect } from "chai";

import { FlaggedError } from "../..";

describe("property-common.FlaggedError", () => {
	describe("Flags", () => {
		it("can be extended", (done) => {
			for (const [index, key] of Object.keys(FlaggedError.FLAGS).entries()) {
				expect(FlaggedError.FLAGS[key]).to.equal(Math.pow(2, index));
			}
			done();
		});
	});
});
