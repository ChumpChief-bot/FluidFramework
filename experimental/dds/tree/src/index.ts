/*!
 * Copyright (c) Microsoft Corporation and contributors. All rights reserved.
 * Licensed under the MIT License.
 */

/**
 * Fluid DDS storing a tree.
 *
 * @packageDocumentation
 */

/**
 * This file represents the public API. Consumers of this library will not see exported modules unless they are enumerated here.
 * Removing / editing existing exports here will often indicate a breaking change, so please be cognizant of changes made here.
 */

// API Exports

export {
	type Build,
	type BuildNode,
	type BuildTreeNode,
	Change,
	ChangeType,
	type Constraint,
	type Detach,
	type HasVariadicTraits,
	type Insert,
	type SetValue,
	StablePlace,
	StableRange,
} from './ChangeTypes.js';
export { Checkout, CheckoutEvent, type ICheckoutEvents, EditValidationResult } from './Checkout.js';
export { isSharedTreeEvent, sharedTreeAssertionErrorType, Result } from './Common.js';
export { EagerCheckout } from './EagerCheckout.js';
export type { OrderedEditSet, EditHandle } from './EditLog.js';
export {
	setTrait,
	areRevisionViewsSemanticallyEqual,
	type BadPlaceValidationResult,
	type BadRangeValidationResult,
	PlaceValidationResult,
	type RangeValidationResult,
	RangeValidationResultKind,
} from './EditUtilities.js';
export { SharedTreeDiagnosticEvent, SharedTreeEvent } from './EventTypes.js';
export { type Delta, Forest, type ForestNode, type ParentData } from './Forest.js';
export type {
	CompressedId,
	Definition,
	DetachedSequenceId,
	EditId,
	InternedStringId,
	FinalCompressedId,
	LocalCompressedId,
	NodeId,
	NodeIdBrand,
	StableNodeId,
	SessionSpaceCompressedId,
	SessionUnique,
	TraitLabel,
	UuidString,
	AttributionId,
} from './Identifiers.js';
export { isDetachedSequenceId } from './Identifiers.js';
export { initialTree } from './InitialTree.js';
export { LazyCheckout } from './LazyCheckout.js';
export type { LogViewer } from './LogViewer.js';
export type { NodeIdContext, NodeIdGenerator, NodeIdConverter } from './NodeIdUtilities.js';
export {
	type MergeHealthStats,
	SharedTreeMergeHealthTelemetryHeartbeat,
	useFailedSequencedEditTelemetry,
} from './MergeHealth.js';
export { comparePayloads } from './PayloadUtilities.js';
export {
	Side,
	EditStatus,
	type TreeNode,
	type TreeNodeSequence,
	type Payload,
	ConstraintEffect,
	type Edit,
	ChangeInternal,
	type InternalizedChange,
	type ChangeNode,
	type ChangeNode_0_0_2,
	type EditLogSummary,
	type FluidEditHandle,
	type SharedTreeSummaryBase,
	type EditWithoutId,
	type PlaceholderTree,
	type EditBase,
	type HasTraits,
	type InsertInternal,
	type DetachInternal,
	type BuildInternal,
	type SetValueInternal,
	type ConstraintInternal,
	type BuildNodeInternal,
	type StablePlaceInternal_0_0_2,
	type StableRangeInternal_0_0_2,
	type NodeData,
	type TraitMap,
	ChangeTypeInternal,
	type TraitLocationInternal_0_0_2,
	WriteFormat,
	type ConstraintInternal_0_0_2,
	StablePlaceInternal,
	StableRangeInternal,
	type BuildNodeInternal_0_0_2,
	type BuildInternal_0_0_2,
	type InsertInternal_0_0_2,
	type DetachInternal_0_0_2,
	type SetValueInternal_0_0_2,
	type TraitLocationInternal,
} from './persisted-types/index.js';
export type {
	ReconciliationChange,
	ReconciliationEdit,
	ReconciliationPath,
} from './ReconciliationPath.js';
export type { Revision } from './RevisionValueCache.js';
export { RevisionView, TransactionView } from './RevisionView.js';
export { TreeNodeHandle } from './TreeNodeHandle.js';
export {
	getTraitLocationOfRange,
	placeFromStablePlace,
	rangeFromStableRange,
} from './TreeViewUtilities.js';
export {
	type SharedTreeArgs,
	type SharedTreeOptions,
	type SharedTreeBaseOptions,
	type SharedTreeOptions_0_0_2,
	type SharedTreeOptions_0_1_1,
	SharedTreeFactory,
	SharedTree,
	type EditCommittedHandler,
	type SequencedEditAppliedHandler,
	type EditCommittedEventArguments,
	type SequencedEditAppliedEventArguments,
	type EditApplicationOutcome,
	type ISharedTreeEvents,
	type StashedLocalOpMetadata,
} from './SharedTree.js';
export type { StringInterner } from './StringInterner.js';
export { SharedTreeAttributes, SharedTreeFactoryType } from './publicContracts.js';

/**
 * TODO:#61413: Publish test utilities from a separate test package
 */
export {
	getSerializedUploadedEditChunkContents as getUploadedEditChunkContents,
	getSerializedUploadedEditChunkContents,
} from './SummaryTestUtilities.js';

export { Transaction, TransactionEvent, type TransactionEvents } from './Transaction.js';
export {
	TransactionInternal,
	GenericTransaction,
	type GenericTransactionPolicy,
	type EditingResult,
	type EditingResultBase,
	type FailedEditingResult,
	type ValidEditingResult,
	type TransactionState,
	type TransactionFailure,
	type SucceedingTransactionState,
	type FailingTransactionState,
	type ChangeResult,
} from './TransactionInternal.js';
export {
	type NodeInTrait,
	type PlaceIndex,
	type TreeViewNode,
	TreeView,
	type TraitNodeIndex,
	type TreeViewPlace,
	type TreeViewRange,
	type TraitLocation,
} from './TreeView.js';

export {
	type IMigrationEvent,
	type IShim,
	MigrationShim,
	MigrationShimFactory,
	SharedTreeShim,
	SharedTreeShimFactory,
} from './migration-shim/index.js';

export { type IRevertible, type IUndoConsumer, SharedTreeUndoRedoHandler } from './UndoRedoHandler.js';
