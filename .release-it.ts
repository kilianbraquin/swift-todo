import { Config } from "release-it";

export default {
  git: {
    commitMessage: "chore: release v${version}",
    requireBranch: "main",
    requireCommits: true,
    tagName: "v${version}",
  },
  github: {
    release: true,
    // @ts-expect-error - releaseNotes doesn't expect arguments
    releaseNotes(context) {
      // Remove the first, redundant line with version and date.
      return context.changelog.split("\n").slice(1).join("\n");
    },
  },
  plugins: {
    "@release-it/conventional-changelog": {
      preset: {
        name: "angular",
      },
    },
  },
} satisfies Config;
