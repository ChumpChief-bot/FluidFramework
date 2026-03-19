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
			"@rushstack/no-new-null": "off",
			"@typescript-eslint/ban-ts-comment": "off",
			"@typescript-eslint/consistent-type-exports": "off",
			"@typescript-eslint/explicit-function-return-type": "warn",
			"@typescript-eslint/explicit-module-boundary-types": "off",
			"@typescript-eslint/no-dynamic-delete": "off",
			"@typescript-eslint/no-explicit-any": "off",
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
			"@typescript-eslint/restrict-plus-operands": "off",
			"@typescript-eslint/strict-boolean-expressions": "off",
			"@typescript-eslint/unbound-method": "off",
			"depend/ban-dependencies": [
				"error",
				{
					"allowed": ["lodash", "traverse"],
				},
			],
			"eqeqeq": "off",
			"import-x/no-internal-modules": "off",
			"jsdoc/require-description": "off",
			"no-constant-binary-expression": "off",
			"no-param-reassign": "off",
			"no-prototype-builtins": "off",
			"no-restricted-syntax": "off",
			"prefer-const": "off",
			"tsdoc/syntax": "off",
			"unicorn/filename-case": "off",
			"unicorn/no-array-for-each": "off",
			"unicorn/no-array-reduce": "off",
			"unicorn/no-negation-in-equality-check": "off",
			"unicorn/no-null": "off",
			"unicorn/no-object-as-default-parameter": "off",
			"unicorn/no-thenable": "off",
			"unicorn/no-this-assignment": "off",
			"unicorn/prefer-default-parameters": "off",
			"unicorn/prefer-export-from": "off",
			"unicorn/prefer-logical-operator-over-ternary": "off",
			"unicorn/prefer-spread": "off",
			"unicorn/prefer-string-slice": "off",
		},
	},
];

export default config;
