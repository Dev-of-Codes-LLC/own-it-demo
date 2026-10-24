# Episode 1: the page that jumped

The storyboard for Own It episode 1, filmed with [DOC Docs](https://github.com/Dev-of-Codes-LLC/doc-docs). It films this repo's `before` and `after` tags on a throttled connection, a real `after-action` run, the diff between the tags, and the measured numbers.

| File | What it is |
| --- | --- |
| `storyboard.json` | The scenes, the narration and the actions |
| `measurements.json` | Lighthouse numbers for `before` and `after`, written by `docdocs measure`. The metric card reads them. |
| `takes/after-action-run.jsonl` | The real `after-action` run that the terminal scene replays, saved as is. Recorded 2026-10-24. |

## 1. Record the take, once

The terminal scene replays a real run. Nothing is typed by hand. The take is already recorded; redo it only if the skill or the `before` tag changes.

Record it in a clean clone that holds only the `before` tag, so the run sees what the team had after UAT and cannot read the fixes on `after`. Give it the `before` Lighthouse reports and nothing else. The `own-it` plugin must be installed (`claude plugin install own-it@agent-toolkit`), and `claude` must be signed in.

In PowerShell, from this repo:

```powershell
git clone --single-branch --no-tags --branch before https://github.com/Dev-of-Codes-LLC/own-it-demo.git "$env:TEMP\take\own-it-demo"
New-Item -ItemType Directory "$env:TEMP\take\own-it-demo\lighthouse"
Copy-Item lighthouse\before-*.json "$env:TEMP\take\own-it-demo\lighthouse\"
Push-Location "$env:TEMP\take\own-it-demo"
[Console]::OutputEncoding = [Text.Encoding]::UTF8
$run = claude -p "UAT came back bad on the product list. The notes are in uat/feedback.md and what the team said is in uat/excuses.md. Do an after-action review." --output-format stream-json --verbose --allowedTools "Read,Grep,Glob,Bash(git log:*),Bash(git show:*),Bash(git diff:*),Bash(git status:*),Bash(git tag:*),PowerShell(git log:*),PowerShell(git show:*),PowerShell(git diff:*),PowerShell(git status:*),PowerShell(git tag:*)" --disallowedTools "Write,Edit,NotebookEdit"
Pop-Location
[IO.File]::WriteAllLines("$PWD\episodes\01-after-action\takes\after-action-run.jsonl", [string[]]$run)
```

Two details matter. Writing with `WriteAllLines` keeps the take in UTF-8; PowerShell's `>` would save it as UTF-16. And `-p` mode refuses any command that is not allowed, so the run may report a few refused commands. Leave them in: the debrief lists what it could not check.

Keep the prompt the same as `prompt` in the storyboard's terminal scene, since the scene shows it on screen. The video shows the working folder as `~/own-it-demo`, not its real path.

## 2. Check the terminal narration

The second and third beats of the terminal scene say what this take did: it read the UAT notes, every file behind the page and the last commit, then gave a debrief with every excuse owned, three fixes in order and a list of what it could not check. If you record a new take, check them again.

## 3. Build

```bash
docdocs measure episodes/01-after-action/storyboard.json   # only if the tags moved
docdocs build episodes/01-after-action/storyboard.json
```

The videos and captions land in `episodes/01-after-action/build/`, in 16:9 and 9:16. To redo one scene after an edit, add `--scenes 4`.

Port 4173 must be free: DOC Docs serves each tag there itself and refuses to film if something else answers.
