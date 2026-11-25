# -*- coding: utf-8 -*-
import json
import re

with open('scratch/parsed_course4_raw.json', 'r', encoding='utf-8') as f:
    raw_chapters = json.load(f)

# Slug generator
def slugify(title):
    clean = re.sub(r'[^a-zA-Z0-9\s-]', '', title).lower()
    return re.sub(r'[\s]+', '-', clean).strip('-')

# Part mapping
def get_part_info(ch_num):
    if ch_num <= 3:
        return "Understand & Frame", "#ea580c"
    elif ch_num <= 6:
        return "Ideate & Prioritise", "#d97706"
    elif ch_num <= 10:
        return "Prototype, MVP & Test", "#c2410c"
    else:
        return "Launch, Scale & Capstone", "#b45309"

print("Writing generation script...")
