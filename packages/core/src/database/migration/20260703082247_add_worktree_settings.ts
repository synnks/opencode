import { Effect } from "effect"
import type { DatabaseMigration } from "../migration"

export default {
  id: "20260703082247_add_worktree_settings",
  up(tx) {
    return Effect.gen(function* () {
      yield* tx.run(`ALTER TABLE \`project\` ADD \`worktree_settings\` text;`)
    })
  },
} satisfies DatabaseMigration.Migration
