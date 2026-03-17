from pathlib import Path

updates = [
    ("docs/TECH_SPEC.md", "\n## Behavior / 挙動\n- Global navigation is initially placed between header and hero; when scrolling past the header it becomes fixed to the top with a semi-transparent background\n"),
    ("docs/PROJECT_OVERVIEW.md", "\n## Navigation behavior\n- Global navigation starts between header and hero, then sticks to the top with a translucent backdrop when scrolling down\n"),
]

for path, text in updates:
    p = Path(path)
    if not p.exists():
        raise FileNotFoundError(path)
    p.write_text(p.read_text(encoding="utf-8") + text, encoding="utf-8")
print("Docs updated")
