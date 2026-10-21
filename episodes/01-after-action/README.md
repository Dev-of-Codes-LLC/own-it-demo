# Episode 1: the page that jumped

The storyboard for Own It episode 1, filmed with [DOC Docs](https://github.com/Dev-of-Codes-LLC/doc-docs). It films this repo's `before` and `after` tags on a throttled connection, a real `after-action` run, the diff between the tags, and the measured numbers.

| File | What it is |
| --- | --- |
| `storyboard.json` | The scenes, the narration and the actions |
| `measurements.json` | Lighthouse numbers for `before` and `after`, written by `docdocs measure`. The metric card reads them. |
| `takes/after-action-run.jsonl` | The real `after-action` run that the terminal scene replays. Not recorded yet. |

## 1. Record the take, once

The terminal scene replays a real run. Nothing is typed by hand. Record it on the `before` tag, with the `own-it` plugin installed (`/plugin install own-it@agent-toolkit`):

```bash
git checkout before
claude -p "UAT came back bad on the product list. The notes are in uat/feedback.md and what the team said is in uat/excuses.md. Do an after-action review." --output-format stream-json --verbose > episodes/01-after-action/takes/after-action-run.jsonl
git checkout -
```

Keep the prompt the same as `prompt` in scene 4 of the storyboard, since the scene shows it on screen. The video shows the working folder as `~/own-it-demo`, not its real path.

## 2. Rewrite scene 4's narration

Two beats in scene 4 start with `REWRITE FROM THE REAL RUN`. Replace them with what the run actually did and said: what it read, and its blunt reality in its own words.

## 3. Build

```bash
docdocs measure episodes/01-after-action/storyboard.json   # only if the tags moved
docdocs build episodes/01-after-action/storyboard.json
```

The videos and captions land in `episodes/01-after-action/build/`, in 16:9 and 9:16. To redo one scene after an edit, add `--scenes 4`.

Port 4173 must be free: DOC Docs serves each tag there itself and refuses to film if something else answers.
