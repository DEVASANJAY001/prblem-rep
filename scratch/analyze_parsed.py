import json

with open('scratch/parsed_course4_raw.json', 'r', encoding='utf-8') as f:
    data = json.load(f)

for ch in data:
    has_bodies = sum(1 for s in ch['sections'] for sub in s['subs'] if sub['body'])
    total_subs = sum(len(s['subs']) for s in ch['sections'])
    print(f"Ch {ch['num']}: {ch['title']} -> {len(ch['sections'])} sections, {total_subs} subs, {has_bodies} with body")
