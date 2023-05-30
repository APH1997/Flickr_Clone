from app.models import db, Photo, environment, SCHEMA
from sqlalchemy.sql import text
from faker import Faker
from datetime import date
from random import sample, choice
fake = Faker()


def seed_photos(all_users):
    sunset1 = Photo(
        author_id=2,
        aws_url='https://highrme-pics.s3.us-east-2.amazonaws.com/sunset_seed_1.webp',
        caption='Caught this beaut on the way to Zumba LOL',
        description='Sunsets cast a serene ambiance as the sun dips below the horizon, painting the sky in a vivid display of colors.',
        created_at=fake.date_between(start_date='-1y', end_date='today'),
        user_likes = sample[all_users, choice(range(0, 11))]
    )
    sunset2 = Photo(
        author_id=2,
        aws_url='https://highrme-pics.s3.us-east-2.amazonaws.com/sunset_seed_2.png',
        caption='Pastel Sunset',
        description='',
        created_at=fake.date_between(start_date='-1y', end_date='today'),
        user_likes = sample[all_users, choice(range(0, 11))]
    )
    sunset3 = Photo(
        author_id=2,
        aws_url='https://highrme-pics.s3.us-east-2.amazonaws.com/sunset_seed_3.jpg',
        caption='Crispy Clouds Before Sunset',
        description='',
        created_at=fake.date_between(start_date='-1y', end_date='today'),
        user_likes = sample[all_users, choice(range(0, 11))]
    )
    sunset4 = Photo(
        author_id=2,
        aws_url='https://highrme-pics.s3.us-east-2.amazonaws.com/sunset4.jpg',
        caption='I love sunsets :)',
        description="The breathtaking hues of a sunset emerge from the scattering of light particles in the Earth's atmosphere.",
        created_at=fake.date_between(start_date='-1y', end_date='today'),
        user_likes = sample[all_users, choice(range(0, 11))],
    )
    sunset5 = Photo(
        author_id=2,
        aws_url='https://highrme-pics.s3.us-east-2.amazonaws.com/sunset5.jpg',
        caption='Dusty Dusk',
        description='Coastal regions boast mesmerizing sunsets, with the interplay of water reflecting and intensifying the radiant colors.',
        created_at=fake.date_between(start_date='-1y', end_date='today'),
        user_likes = sample[all_users, choice(range(0, 11))],
    )
    sunset6 = Photo(
        author_id=2,
        aws_url='https://highrme-pics.s3.us-east-2.amazonaws.com/sunset6.jpg',
        caption='Woke up like this',
        description='The duration of a sunset varies depending on the time of year and geographical location, creating unique experiences.',
        created_at=fake.date_between(start_date='-1y', end_date='today'),
        user_likes = sample[all_users, choice(range(0, 11))],
    )
    sunset7 = Photo(
        author_id=2,
        aws_url='https://highrme-pics.s3.us-east-2.amazonaws.com/sunset7.jpg',
        caption='Deep Run Sun',
        description='Sunsets evoke a sense of tranquility, inviting us to pause, reflect, and appreciate the beauty of the natural world.',
        created_at=fake.date_between(start_date='-1y', end_date='today'),
        user_likes = sample[all_users, choice(range(0, 11))],
    )

    space1 = Photo(
        author_id=3,
        aws_url='https://highrme-pics.s3.us-east-2.amazonaws.com/hubble_tarantula_nebula.jpg',
        caption="Hubble's New View of the Tarantula Nebula",
        description="The Tarantula Nebula is a large star-forming region of ionized hydrogen gas that lies 161,000 light-years from Earth in the Large Magellanic Cloud, and its turbulent clouds of gas and dust appear to swirl between the region's bright, newly formed stars.",
        created_at=fake.date_between(start_date='-1y', end_date='today'),
        user_likes = sample[all_users, choice(range(0, 11))],
    )
    space2 = Photo(
        author_id=3,
        aws_url='https://highrme-pics.s3.us-east-2.amazonaws.com/andromeda.jpg',
        caption='Hubble Popped Off',
        description='The Andromeda Galaxy (also known as Messier 31, M31, NGC 224 and originally the Andromeda Nebula) is a barred spiral galaxy and is the closest major galaxy to the Milky Way',
        created_at=fake.date_between(start_date='-1y', end_date='today'),
        user_likes = sample[all_users, choice(range(0, 11))],
    )
    space3 = Photo(
        author_id=3,
        aws_url='https://highrme-pics.s3.us-east-2.amazonaws.com/sh2.jpg',
        caption='Sh2-265',
        description='Sh2-265 is a very dimmed reddish H-alpha diffused nebula spread around 2 degrees northwest of Bellatrix,  and has a span of about 50 arc minutes.',
        created_at=fake.date_between(start_date='-1y', end_date='today'),
        user_likes = sample[all_users, choice(range(0, 11))],
    )
    space4 = Photo(
        author_id=3,
        aws_url='https://highrme-pics.s3.us-east-2.amazonaws.com/pinwheel.jpg',
        caption='Pinwheel Galaxy',
        description="A little over 4 hour integration I did from a Bortle Class 4-5. The supernova is shining brilliantly at the 11 o'clock position of the Pinwheel Galaxy.",
        created_at=fake.date_between(start_date='-1y', end_date='today'),
        user_likes = sample[all_users, choice(range(0, 11))],
    )
    space5 = Photo(
        author_id=3,
        aws_url='https://highrme-pics.s3.us-east-2.amazonaws.com/wildduckcluster.jpg',
        caption='M11: the Wild Duck Cluster',
        description='The Wild Duck Cluster is one of the richest and most compact of the known open clusters. It is one of the most massive open clusters known, and it has been extensively studied. Its age has been estimated to about 316 million years.',
        created_at=fake.date_between(start_date='-1y', end_date='today'),
        user_likes = sample[all_users, choice(range(0, 11))],
    )
    space6 = Photo(
        author_id=3,
        aws_url='https://highrme-pics.s3.us-east-2.amazonaws.com/MilkyWay.jpg',
        caption='MilkyWay',
        description='Taken last summer from the Catskills in Upstate NY. ~28 min exposure processed in Sequator and Photoshop.',
        created_at=fake.date_between(start_date='-1y', end_date='today'),
        user_likes = sample[all_users, choice(range(0, 11))],
    )
    space7 = Photo(
        author_id=3,
        aws_url='https://highrme-pics.s3.us-east-2.amazonaws.com/pillarsofcreation.jpg',
        caption='Pillars of Creation',
        description='The Pillars of Creation are bathed in the blistering ultraviolet light from a grouping of young, massive stars located off the top of the image. Streamers of gas can be seen bleeding off the pillars as the intense radiation heats and evaporates it into space. Denser regions of the pillars are shadowing material beneath them from the powerful radiation. Stars are being born deep inside the pillars, which are made of cold hydrogen gas laced with dust.',
        created_at=fake.date_between(start_date='-1y', end_date='today'),
        user_likes = sample[all_users, choice(range(0, 11))],
    )
    space8 = Photo(
        author_id=3,
        aws_url='https://highrme-pics.s3.us-east-2.amazonaws.com/ngc5189.jpg',
        caption='NGC 5189',
        description="NASA's Hubble Space Telescope photographed a nearby planetary nebula called NGC 5189. The intricate structure of this bright gaseous nebula resembles a glass-blown holiday ornament with a glowing ribbon entwined. Planetary nebulae represent the final brief stage in the life of a medium-sized star like our Sun. While consuming the last of the fuel in its core, the dying star expels a large portion of its outer envelope.",
        created_at=fake.date_between(start_date='-1y', end_date='today'),
        user_likes = sample[all_users, choice(range(0, 11))],
    )
    space9 = Photo(
        author_id=3,
        aws_url='https://highrme-pics.s3.us-east-2.amazonaws.com/eagle_nebula.jpg',
        caption="Eagle Nebula",
        description='What do you get when you combine X-ray, infrared, and optical data? These gorgeous views showcase star cluster NGC 346, spiral galaxies NGC 1672 and Messier 74, and the Pillars of Creation (Eagle Nebula) in ways we could never see with just our eyes. The composite images here combine data from the Webb, Chandra, Hubble, Spitzer, XMM-Newton, and ESO telescopes.',
        created_at=fake.date_between(start_date='-1y', end_date='today'),
        user_likes = sample[all_users, choice(range(0, 11))],
    )
    space10 = Photo(
        author_id=3,
        aws_url='https://highrme-pics.s3.us-east-2.amazonaws.com/carinanebula.jpg',
        caption='Carina Nebula',
        description='You might remember this view, taken in the Carina Nebula, as part of Webb’s first images released. A deep dive into the data has newly revealed a hotbed of young stars in an elusive stage of development. This discovery may help us investigate how stars like our Sun form, as well as how radiation from nearby massive stars might affect the development of planets.',
        created_at=fake.date_between(start_date='-1y', end_date='today'),
        user_likes = sample[all_users, choice(range(0, 11))],
    )
    space11 = Photo(
        author_id=3,
        aws_url='https://highrme-pics.s3.us-east-2.amazonaws.com/cosmicreef.jpg',
        caption='Cosmic Reef',
        description='The sparkling centerpiece of NGC 2014 is a grouping of bright, hefty stars, each 10 to 20 times more massive than our Sun. The stars’ ultraviolet radiation heats the surrounding dense gas and unleash fierce winds of charged particles that blast away lower-density gas, forming the bubble-like structures seen on the right. The blue areas in NGC 2014 reveal the glow of oxygen, heated to nearly 20,000 degrees Fahrenheit by the blast of ultraviolet light.',
        created_at=fake.date_between(start_date='-1y', end_date='today'),
        user_likes = sample[all_users, choice(range(0, 11))],
    )

    cloud1 = Photo(
        author_id=5,
        aws_url="https://highrme-pics.s3.us-east-2.amazonaws.com/clouds.jpg",
        caption="Found Some Clouds",
        description="Puffy and white, they resemble cotton balls floating in the sky.",
        created_at=fake.date_between(start_date='-1y', end_date='today'),
        user_likes = sample[all_users, choice(range(0, 11))],
    )
    cloud2 = Photo(
        author_id=5,
        aws_url="https://highrme-pics.s3.us-east-2.amazonaws.com/clouds2.jpg",
        caption="Oh look, More Clouds!",
        description=" Low and featureless, they create a gray, blanket-like cover overhead.",
        created_at=fake.date_between(start_date='-1y', end_date='today'),
        user_likes = sample[all_users, choice(range(0, 11))],
    )
    cloud3 = Photo(
        author_id=5,
        aws_url="https://highrme-pics.s3.us-east-2.amazonaws.com/clouds3.jpg",
        caption="Love the Sky",
        description="Delicate and wispy, they form high in the atmosphere, resembling feathery streaks.",
        created_at=fake.date_between(start_date='-1y', end_date='today'),
        user_likes = sample[all_users, choice(range(0, 11))],
    )
    cloud4 = Photo(
        author_id=5,
        aws_url="https://highrme-pics.s3.us-east-2.amazonaws.com/clouds4.jpg",
        caption="Clouds",
        description="Dark and ominous, they bring rain or storms, casting a gloomy atmosphere.",
        created_at=fake.date_between(start_date='-1y', end_date='today'),
        user_likes = sample[all_users, choice(range(0, 11))],
    )
    cloud5 = Photo(
        author_id=5,
        aws_url="https://highrme-pics.s3.us-east-2.amazonaws.com/clouds5.jpg",
        caption="Look out!",
        description="Mid-level and lumpy, they create a mottled pattern with shades of gray and white.",
        created_at=fake.date_between(start_date='-1y', end_date='today'),
        user_likes = sample[all_users, choice(range(0, 11))],
    )
    cloud6 = Photo(
        author_id=5,
        aws_url="https://highrme-pics.s3.us-east-2.amazonaws.com/clouds6.jpg",
        caption="Lorum Ipsum",
        description="Small, high-level clouds that resemble a field of tiny cotton balls.",
        created_at=fake.date_between(start_date='-1y', end_date='today'),
        user_likes = sample[all_users, choice(range(0, 11))],
    )
    cloud7 = Photo(
        author_id=5,
        aws_url="https://highrme-pics.s3.us-east-2.amazonaws.com/clouds7.jpg",
        caption="Woah, Check out this Cloud!",
        description="Towering and majestic, they can reach great heights, producing thunderstorms and lightning.",
        created_at=fake.date_between(start_date='-1y', end_date='today'),
        user_likes = sample[all_users, choice(range(0, 11))],
    )

    moon1 = Photo(
        author_id=4,
        aws_url="https://highrme-pics.s3.us-east-2.amazonaws.com/moon_and_venus.jpg",
        caption="Moon and Venus",
        description="On the evening of April 23, 2023, in Yuzhno-Morskoy (Primorsky Krai), I photographed the conjunction of the crescent Moon and Venus. I used my camera Canon EOS 60D (with 135mm lens).",
        created_at=fake.date_between(start_date='-1y', end_date='today'),
        user_likes = sample[all_users, choice(range(0, 11))],
    )
    moon2 = Photo(
        author_id=4,
        aws_url="https://highrme-pics.s3.us-east-2.amazonaws.com/34waxinggibbous.jpg",
        caption="Waxing Gibbous",
        description="Tonight's 34 percent illuminated waxing gibbous moon",
        created_at=fake.date_between(start_date='-1y', end_date='today'),
        user_likes = sample[all_users, choice(range(0, 11))],
    )
    moon3 = Photo(
        author_id=4,
        aws_url="https://highrme-pics.s3.us-east-2.amazonaws.com/spookymoon.jpg",
        caption="Spooky Mood in the Forest",
        description="full moon between the branches",
        created_at=fake.date_between(start_date='-1y', end_date='today'),
        user_likes = sample[all_users, choice(range(0, 11))],
    )
    moon4 = Photo(
        author_id=4,
        aws_url="https://highrme-pics.s3.us-east-2.amazonaws.com/moonandpliades.jpg",
        caption="Conjunction of the Moon and The Pleiades",
        description="Captured with a Vixen VSD astrograph and a Nikon ZII, six 1250 .5 sec x 120.",
        created_at=fake.date_between(start_date='-1y', end_date='today'),
        user_likes = sample[all_users, choice(range(0, 11))],
    )
    moon5 = Photo(
        author_id=4,
        aws_url="https://highrme-pics.s3.us-east-2.amazonaws.com/waxing_crescent.jpg",
        caption="Waxing Crescent",
        description="I can't believe I finally caught one!! Yes!!!",
        created_at=fake.date_between(start_date='-1y', end_date='today'),
        user_likes = sample[all_users, choice(range(0, 11))],
    )


    all_pics = [sunset1, sunset2, sunset3, sunset4,
                sunset5, sunset6, sunset7,
                cloud1, cloud2, cloud3, cloud4,
                cloud5, cloud6, cloud7,
                moon1, moon2, moon3, moon4, moon5,
                space1, space2, space3, space4,
                space5, space6, space7, space8,
                space9, space10, space11]

    added = [db.session.add(pic) for pic in all_pics]
    db.session.commit()

    return all_pics

def undo_photos():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.photos RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM photos"))

    db.session.commit()
