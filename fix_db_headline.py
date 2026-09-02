import json

with open('data/portfolio_db.json', 'r') as f:
    db = json.load(f)

db['profile']['headline'] = "Mechanical Engineering, Renewable Energy Systems & Field Analysis"

with open('data/portfolio_db.json', 'w') as f:
    json.dump(db, f, indent=2)

