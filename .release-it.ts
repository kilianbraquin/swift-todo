import { Config } from "release-it";

export default {
  git: {
    commitMessage: "chore: release v${version}",
    requireBranch: "main",
    requireCommits: true,
    tagName: "v${version}",
  },
  plugins: {
    "@release-it/conventional-changelog": {
      preset: {
        name: "angular",
      },
    },
  },
} satisfies Config;
