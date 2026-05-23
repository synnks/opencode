export * as Project from "./project"

import { Schema } from "effect"
import { define, inventory } from "./event"
import { NonNegativeInt, optional } from "./schema"
import { ProjectID } from "./project-id"

export const ID = ProjectID
export type ID = typeof ID.Type

export const Vcs = Schema.Literal("git").annotate({ identifier: "Project.Vcs" })
export const Icon = Schema.Struct({
  url: optional(Schema.String),
  override: optional(Schema.String),
  color: optional(Schema.String),
}).annotate({ identifier: "Project.Icon" })
export interface Icon extends Schema.Schema.Type<typeof Icon> {}
export const Commands = Schema.Struct({
  start: optional(
    Schema.String.annotate({ description: "Startup script to run when creating a new workspace (worktree)" }),
  ),
}).annotate({ identifier: "Project.Commands" })
export interface Commands extends Schema.Schema.Type<typeof Commands> {}
export const WorktreeSettings = Schema.Struct({
  baseBranch: optional(Schema.String.annotate({ description: "Default branch to create new worktrees from" })),
  symlinks: optional(
    Schema.Array(Schema.String).annotate({ description: "Files or directories to symlink from the project root" }),
  ),
  copies: optional(
    Schema.Array(Schema.String).annotate({ description: "Files or directories to copy from the project root" }),
  ),
  rootDir: optional(
    Schema.String.annotate({ description: 'Where to create worktrees: "default", "sibling", or an absolute path' }),
  ),
}).annotate({ identifier: "Project.WorktreeSettings" })
export interface WorktreeSettings extends Schema.Schema.Type<typeof WorktreeSettings> {}
export const Time = Schema.Struct({
  created: NonNegativeInt,
  updated: NonNegativeInt,
  initialized: optional(NonNegativeInt),
}).annotate({ identifier: "Project.Time" })
export interface Time extends Schema.Schema.Type<typeof Time> {}

export const Info = Schema.Struct({
  id: ID,
  worktree: Schema.String,
  vcs: optional(Vcs),
  name: optional(Schema.String),
  icon: optional(Icon),
  commands: optional(Commands),
  worktreeSettings: optional(WorktreeSettings),
  time: Time,
  sandboxes: Schema.Array(Schema.String),
}).annotate({ identifier: "Project" })
export interface Info extends Schema.Schema.Type<typeof Info> {}

const Updated = define({ type: "project.updated", schema: Info.fields })
export const Event = { Updated, Definitions: inventory(Updated) }
