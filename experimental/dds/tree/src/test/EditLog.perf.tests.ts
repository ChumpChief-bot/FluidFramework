/*!
 * Copyright (c) Microsoft Corporation and contributors. All rights reserved.
 * Licensed under the MIT License.
 */

import { BenchmarkType, benchmark } from '@fluid-tools/benchmark';

import { Change, StablePlace } from '../ChangeTypes.js';
import { EditLog } from '../EditLog.js';
import { newEdit } from '../EditUtilities.js';
import { Edit } from '../persisted-types/index.js';

import { setUpTestTree } from './utilities/TestUtilities.js';

describe('EditLog Perf', () => {
	const insertNumbers = [10, 50, 100, 500, 1000];

	for (const numberOfInserts of insertNumbers) {
		const edits: Edit<Change>[] = [];

		const testTree = setUpTestTree();
		for (let i = 0; i < numberOfInserts; i++) {
			edits.push(newEdit(Change.insertTree(testTree.buildLeaf(), StablePlace.atEndOf(testTree.traitLocation))));
		}

		benchmark({
			type: BenchmarkType.Measurement,
			title: `process ${numberOfInserts} sequenced inserts`,
			benchmarkFn: () => {
				const log = new EditLog();

				for (const edit of edits) {
					log.addSequencedEdit(edit, { sequenceNumber: 1, referenceSequenceNumber: 0 });
				}
			},
		});

		const targetEditLogSize = Math.floor(numberOfInserts / 4);
		benchmark({
			type: BenchmarkType.Measurement,
			title: `process ${numberOfInserts} sequenced inserts with a target edit log size of ${targetEditLogSize}`,
			benchmarkFn: () => {
				const log = new EditLog(undefined, undefined, undefined, targetEditLogSize);

				for (const edit of edits) {
					log.addSequencedEdit(edit, { sequenceNumber: 1, referenceSequenceNumber: 0 });
				}
			},
		});
	}
});
