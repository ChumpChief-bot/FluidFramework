/*!
 * Copyright (c) Microsoft Corporation and contributors. All rights reserved.
 * Licensed under the MIT License.
 */

import type { Linter } from "eslint";
import { recommended } from "../../../../common/build/eslint-config-fluid/flat.mts";

const config: Linter.Config[] = [
	...recommended,
	{
		rules: {
			"@fluid-internal/fluid/no-unchecked-record-access": "warn",
			"@typescript-eslint/explicit-function-return-type": "warn",
			"@typescript-eslint/explicit-module-boundary-types": "off",
			"@typescript-eslint/no-dynamic-delete": "off",
			"@typescript-eslint/no-explicit-any": "off",
			"@typescript-eslint/no-require-imports": "off",
			"@typescript-eslint/no-shadow": "off",
			"@typescript-eslint/no-this-alias": "off",
			"@typescript-eslint/no-unsafe-argument": "off",
			"@typescript-eslint/no-unsafe-assignment": "off",
			"@typescript-eslint/no-unsafe-call": "off",
			"@typescript-eslint/no-unsafe-member-access": "off",
			"@typescript-eslint/no-unsafe-return": "off",
			"@typescript-eslint/no-unused-expressions": "off",
			"@typescript-eslint/prefer-for-of": "off",
			"@typescript-eslint/prefer-nullish-coalescing": "off",
			"@typescript-eslint/prefer-optional-chain": "off",
			"@typescript-eslint/strict-boolean-expressions": "off",
			"depend/ban-dependencies": [
				"error",
				{
					"allowed": ["lodash", "underscore"],
				},
			],
			"guard-for-in": "off",
			"import-x/no-internal-modules": "off",
			"jsdoc/require-description": "off",
			"no-bitwise": "off",
			"no-new-func": "off",
			"no-param-reassign": "off",
			"no-prototype-builtins": "off",
			"no-undef": "off",
			"no-var": "off",
			"prefer-const": "off",
			"tsdoc/syntax": "off",
			"unicorn/explicit-length-check": "off",
			"unicorn/no-new-array": "off",
			"unicorn/no-null": "off",
			"unicorn/no-this-assignment": "off",
			"unicorn/prefer-default-parameters": "off",
			"unicorn/prefer-export-from": "off",
			"unicorn/prefer-module": "off",
			"unicorn/prefer-number-properties": "off",
			"unicorn/prefer-spread": "off",
		},
	},
	// Migrated from .eslintignore
	{
		ignores: ["src/index.d.ts"],
	},
];

export default config;
