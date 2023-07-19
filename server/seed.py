#!/usr/bin/env python3

from app import app, bcrypt
from models import db, Location, Event, User, Date

with app.app_context():
    
    Location.query.delete()
    Event.query.delete()
    User.query.delete()
    Date.query.delete()

    
    locations = []
    
    locations.append(Location(
        name='Sid Luckman Field',
        address='1463-1469 McDonald Ave, Brooklyn, NY 11230',
        lat="40.617482",
        long="-73.973687",
        img="https://ir.4sqi.net/img/general/original/29363372_dMEVVoPJn6g4uVpk2nGiwvfoJiFGIF9yM92zoSTPw8w.jpg",
        location_type="Football"
    ))
    locations.append(Location(
        name='Brooklyn Bridge Park Pier 5',
        address='334 Furmant St, Brooklyn, NY 11201',
        lat="40.694438",
        long="-74.001049",
        img="https://brooklynbridgeparents.com/wp-content/uploads/2021/01/unnamed.jpg",
        location_type="Football"
    ))
    locations.append(Location(
        name='Globall Sports Center',
        address='1561 Bedford Ave, Brooklyn, NY 11225',
        lat="40.668893",
        long="-73.955491",
        img="https://globallconcepts.com/wp-content/uploads/2022/01/nasssindoor-768x576.jpg",
        location_type="Football"
    ))
    locations.append(Location(
        name='Verrazano Sports Complex',
        address='1990 Shore Pkwy, Brooklyn, NY 11214',
        lat="40.587382",
        long="-73.992417",
        img="https://cdn.businessyab.com/assets/uploads/4a168e15fd679ec892b0250bbee48de2_-united-states-new-york-kings-county-brooklyn-gravesend-shore-parkway-1990-verrazano-sports-complex.jpg",
        location_type="Soccer"
    ))
    locations.append(Location(
        name='Buddy Keaton Fields',
        address='Bergen St. &, Schenectady Ave, Brooklyn, NY 11213',
        lat="40.674682",
        long="-73.934162",
        img="https://images.squarespace-cdn.com/content/v1/5af1f41c96e76f0fffa9a9be/56e8ba59-5f67-45e2-9e95-de20afc3d208/SJP4.jpeg",
        location_type="Soccer"
    ))
    locations.append(Location(
        name='Prospect Park',
        address='Prospect Heights, Brooklyn, New York, NY 11215',
        lat="40.661041",
        long="-73.968445",
        img="https://blankslatepages.s3.amazonaws.com/559181aa758e5-4604015369_72bb574129_b.jpg",
        location_type="Bicycle"
    ))



    events = []

    events.append(Event(
        title="6 Vs 6 Flag Football",
        description="Football this Saturday!",
        event_type="Flag Football",
        people_needed= 16,
        space_available= 10,
        location_id=4,
        date_id=1
    ))

    events.append(Event(
        title="Group Bike Ride",
        description="Join us bright and early for a group bike at prospect park.",
        event_type="Bicycle",
        people_needed= 10,
        space_available= 3,
        location_id=6,
        date_id=3
    ))

    events.append(Event(
        title="Beginners Softball",
        description="Family friendly softball game at Buddy Keaton. All are welcome!",
        event_type="Softball",
        people_needed= 20,
        space_available= 11,
        location_id=5,
        date_id=2
    ))
    events.append(Event(
        title="Competitive Soccer",
        description="Got what it takes? bring your A game",
        event_type="Soccer",
        people_needed= 12,
        space_available= 3,
        location_id=3,
        date_id=2
    ))

    users = []

    password = 'dogs123'
    hashed_password = bcrypt.generate_password_hash(password).decode('utf-8')

    users.append(User(
        username="John112",
        password_hash=hashed_password,
        first_name="John",
        last_name="Barnes",
        address="1573 Bedford Ave, Brooklyn, NY 11225",
        age= 37
    ))

    password = 'cats123'
    hashed_password = bcrypt.generate_password_hash(password).decode('utf-8')

    users.append(User(
        username="ez4prez",
        password_hash=hashed_password,
        first_name="Ezra",
        last_name="Mays-Richards",
        address="1444 Flatbush Ave, Brooklyn, NY 11210",
        age= 29
    ))

    password = 'cats123'
    hashed_password = bcrypt.generate_password_hash(password).decode('utf-8')

    users.append(User(
        username="TownGirl510",
        password_hash=hashed_password,
        first_name="Alicia",
        last_name="Morales",
        address="930 Prospect Pl, Brooklyn, NY 11213",
        age= 34
    ))

    password = 'cats123'
    hashed_password = bcrypt.generate_password_hash(password).decode('utf-8')

    users.append(User(
        username="JimVsJomo",
        password_hash=hashed_password,
        first_name="Jomo",
        last_name="Leslie",
        address="930 Prospect Pl, Brooklyn, NY 11213",
        age= 34
    ))


    dates = []

    dates.append(Date(
        time="3:30 PM",
        day="2023,6,23"
    ))
    dates.append(Date(
        time="7:00 AM",
        day="2023,6,25"
    ))
    dates.append(Date(
        time="1:00 PM",
        day="2023,6,28"
    ))







    

    

    db.session.add_all(locations)
    db.session.add_all(events)
    db.session.add_all(users)
    db.session.add_all(dates)

    db.session.commit()
    print("🌱 Successfully seeded! 🌱")

    # id = db.Column(db.Integer, primary_key=True)
    # name = db.Column(db.String)
    # address = db.Column(db.String)
    # longitude = db.Columng(db.String)
    # latitude = db.Column(db.String)
