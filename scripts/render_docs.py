#!/usr/bin/env python3
from pathlib import Path
import markdown

ROOT = Path(__file__).resolve().parent.parent
CSS_ROOT = "assets/styles/workbook.css"
DOC_CSS = "../assets/styles/workbook.css"

TITLE_MAP = {
    'README.md': 'Docker Swarm Stack E-Commerce Workbook Kit',
    'workbook-a.md': 'Workbook A',
    'workbook-b.md': 'Workbook B',
    'architecture-overview.md': 'Architecture Overview',
    'operations-cheatsheet.md': 'Operations Cheatsheet',
    'troubleshooting-guide.md': 'Troubleshooting Guide',
}

FILES = [
    ROOT / 'README.md',
    ROOT / 'docs' / 'workbook-a.md',
    ROOT / 'docs' / 'workbook-b.md',
    ROOT / 'docs' / 'architecture-overview.md',
    ROOT / 'docs' / 'operations-cheatsheet.md',
    ROOT / 'docs' / 'troubleshooting-guide.md',
]

for md_file in FILES:
    text = md_file.read_text(encoding='utf-8')
    html_body = markdown.markdown(
        text,
        extensions=['extra', 'tables', 'fenced_code', 'toc', 'sane_lists']
    )
    css_href = CSS_ROOT if md_file.name == 'README.md' else DOC_CSS
    title = TITLE_MAP.get(md_file.name, md_file.stem)
    html = f'''<!doctype html>
<html lang="ko">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>{title}</title>
  <link rel="stylesheet" href="{css_href}" />
</head>
<body>
  {html_body}
</body>
</html>
'''
    md_file.with_suffix('.html').write_text(html, encoding='utf-8')

print('Rendered HTML files')
