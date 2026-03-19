/*!
 * Copyright (c) Microsoft Corporation and contributors. All rights reserved.
 * Licensed under the MIT License.
 */

/**
 * @fileoverview Utility class to compute an hash for a given set of variables
 * using the murmur3 hash (see https://code.google.com/p/smhasher/)
 */

import murmurHash3 from "murmurhash3js";

/**
 * @internal
 */
export function calculateHash(key, seed = 0) {
	const str = murmurHash3.x86.hash128(key, seed);
	return `${str.slice(0, 8)}-${str.slice(8, 12)}-${str.slice(12, 16)}-${str.slice(
		16,
		20,
	)}-${str.slice(20, 32)}`;
}
