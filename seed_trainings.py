import json

with open('data/portfolio_db.json', 'r') as f:
    db = json.load(f)

if 'trainings' in db:
    for tr in db['trainings']:
        if 'galleryUrls' not in tr or not tr['galleryUrls']:
            tr['galleryUrls'] = [
                "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&q=80&w=1200",
                "https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&q=80&w=1200"
            ]

with open('data/portfolio_db.json', 'w') as f:
    json.dump(db, f, indent=2)

