import re

with open('public/Solution Design & MVP Building.md', 'r', encoding='utf-8') as f:
    lines = f.readlines()

chapters = []
current_ch = None
current_sec = None

for line in lines:
    line = line.strip()
    if line.startswith('## Chapter '):
        current_ch = {'title': line, 'sections': []}
        chapters.append(current_ch)
    elif line.startswith('### ') and current_ch:
        current_sec = {'title': line, 'subsections': []}
        current_ch['sections'].append(current_sec)
    elif line.startswith('#### ') and current_sec:
        current_sec['subsections'].append(line)

total_sec = sum(len(c['sections']) for c in chapters)
total_sub = sum(sum(len(s['subsections']) for s in c['sections']) for c in chapters)

print(f'Total Chapters: {len(chapters)}')
print(f'Total Sections: {total_sec}')
print(f'Total Subsections: {total_sub}')

for i, c in enumerate(chapters):
    sec_count = len(c['sections'])
    print(f"{i}: {c['title']} - {sec_count} sections")
    for s in c['sections']:
        print(f"   {s['title']} ({len(s['subsections'])} sub)")
