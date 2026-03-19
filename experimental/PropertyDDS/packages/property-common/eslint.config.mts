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
			"@typescript-eslint/explicit-function-return-type": "warn",
			"@typescript-eslint/explicit-module-boundary-types": "off",
			"@typescript-eslint/no-explicit-any": "off",
			"@typescript-eslint/no-unsafe-argument": "off",
			"@typescript-eslint/no-unsafe-assignment": "off",
			"@typescript-eslint/no-unsafe-call": "off",
			"@typescript-eslint/no-unsafe-member-access": "off",
			"depend/ban-dependencies": [
				"error",
				{
					"allowed": ["lodash"],
				},
			],
			"jsdoc/require-description": "off",
			"tsdoc/syntax": "off",
			"unicorn/error-message": "off",
			"unicorn/no-new-array": "off",
			"unicorn/no-null": "off",
			"unicorn/no-thenable": "off",
			"unicorn/prefer-number-properties": "off",
			"unicorn/prefer-spread": "off",
		},
	},
];

export default config;
