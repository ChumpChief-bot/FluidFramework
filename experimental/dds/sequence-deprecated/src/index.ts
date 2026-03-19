/*!
 * Copyright (c) Microsoft Corporation and contributors. All rights reserved.
 * Licensed under the MIT License.
 */

export { SharedNumberSequenceClass } from "./sharedNumberSequence.js";
export { SharedObjectSequenceClass } from "./sharedObjectSequence.js";
export {
	type MatrixSegment,
	maxCellPosition,
	maxCol,
	maxCols,
	maxRow,
	maxRows,
	PaddingSegment,
	positionToRowCol,
	rowColToPosition,
	RunSegment,
	SparseMatrix,
	SparseMatrixFactory,
	type SparseMatrixItem,
	SparseMatrixClass,
} from "./sparsematrix.js";
export { type IJSONRunSegment, SubSequence, SharedSequence } from "./sharedSequence.js";
export {
	SharedNumberSequenceFactory,
	SharedObjectSequenceFactory,
	SharedNumberSequence,
	SharedObjectSequence,
} from "./sequenceFactory.js";
