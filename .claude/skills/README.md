# Claude skills for Amanah

Project-level skills for Claude live in this folder, one folder per skill, each containing a `SKILL.md`:

```
.claude/skills/
  <skill-name>/
    SKILL.md        (frontmatter: name, description; body: instructions)
    ...supporting files
```

Claude loads a skill when its description matches the task. Keep descriptions specific so the right skill triggers.

## Installed

_None yet._ The project owner will specify which skills to install.

## Recommended (not installed, owner to confirm)

| Skill                   | Source                                                                  | Use on Amanah                                                                                     |
| ----------------------- | ----------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------- |
| `frontend-design`       | [anthropics/skills](https://github.com/anthropics/skills)               | Distinctive, non-generic UI for F1 to F3 (design system, campaign and accountability pages)       |
| `webapp-testing`        | anthropics/skills                                                       | Driving Playwright to check UI flows. Complements our e2e suite                                   |
| `react-best-practices`  | [vercel-labs/agent-skills](https://github.com/vercel-labs/agent-skills) | React and Next.js performance rules (bundle size and rendering), which matter for low-end Android |
| `web-design-guidelines` | vercel-labs/agent-skills                                                | Accessibility and UX review of pages before marking features done                                 |
| `skill-creator`         | anthropics/skills                                                       | Writing project-specific skills (below)                                                           |

### Project-specific skills worth writing

- **`amanah-roadmap-item`**: the end-to-end workflow for picking up, building, testing and closing a roadmap item (claim in the index, read the entry, write tests, verify, update the changelog and index).
- **`amanah-adr`**: create a new ADR from the template with the next number and update the index and changelog.
- **`amanah-api-contract`**: add or change an endpoint: Zod schema, MSW handler, fixtures and tests, kept in sync with the backend OpenAPI contract.

Check every third-party skill's contents before installing it. Skills are instructions that Claude will follow.
