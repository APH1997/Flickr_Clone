from app.models import db, Reply, environment, SCHEMA
from sqlalchemy.sql import text
from random import choice


def seed_replies(comments, users):

    generic_comments = [
        "Well said",
        "Darn skippy",
        "How can you be so brave, yet so controversial?",
        "It's all Greek to me!",
        "Why won't you accept my friend request",
        "Haha!",
        "Golly, you think so?",
        "I don't agree, and quite frankly, your demeanor offends me",
        "first",
        "Has anyone tested the length validations on these replies?",
        "Me too!!!!",
        "I wouldn't go THAT far...",
        "tomato tomato, let's just enjoy the views",
        "Oh, not you again...",
        "^ This.",
        "I'm calling the police",
        "I completely agree!", "You took the words right out of my mouth!", "Couldn't have said it better myself!", "I'm on the same page!", "My thoughts exactly!", "You read my mind!", "I share the same sentiment!", "You hit the nail on the head!", "Absolutely!", "You're spot on!", "I couldn't agree more!", "You've captured it perfectly!", "You're absolutely right!", "You're speaking my language!", "I'm in full agreement!", "You've summed it up perfectly!", "You've expressed it brilliantly!", "You're so right!", "I'm on board with that!", "You've got it!", "That's precisely how I feel!", "You've articulated it well!", "I'm in complete accord!", "You're absolutely on point!", "You've nailed it!", "I'm with you 100%!", "You've got my vote!", "You're singing my song!", "You've hit the mark!", "You've captured my exact thoughts!", "You've got a keen understanding!", "I couldn't have agreed more!", "You've read my mind!", "You've echoed my sentiments!", "You're absolutely correct!", "You've got it right!", "You're absolutely on the money!", "You've put it into words perfectly!", "You're speaking the truth!", "You've got a great perspective!", "You've hit the bullseye!", "You've got a fantastic grasp on it!", "You've hit the nail on the head!", "You're right on target!", "You've got the right idea!", "You've hit the mark perfectly!", "You're absolutely spot on!", "You've captured the essence of it!", "You've got a great eye for this!", "You've summed it up flawlessly!", "You've got it down pat!", "Absolutely agree with you!", "Couldn't have said it any better!", "My sentiments exactly!", "You're right on the money!", "You've hit the nail on the head!", "100% in agreement!", "You've perfectly expressed my thoughts!", "You're absolutely on point!", "You've grasped it perfectly!", "You're speaking my language!", "Couldn't agree more with you!", "You've articulated it so well!", "You've captured the essence!", "You've got a great understanding!", "You've hit the nail on the head!", "You're spot on with that!", "You've summed it up beautifully!", "You're absolutely right about it!", "You've got the perfect perspective!", "You've expressed it flawlessly!", "You're absolutely correct!", "You've got it absolutely right!", "You've put it into words perfectly!", "You're speaking the absolute truth!", "You've got a fantastic viewpoint!", "You've hit the bullseye!", "You've got a great grasp on it!", "You've got it right on target!", "You've hit the mark perfectly!", "You're absolutely spot on!", "You've captured the essence superbly!", "You've got an excellent eye for this!", "You've summed it up flawlessly!", "You've got it down to a tee!", "Couldn't agree more with your statement!", "You've perfectly conveyed my thoughts!", "You're right on the money with that!", "You've hit the nail on the head!", "I'm completely aligned with your viewpoint!", "You've nailed it with your analysis!", "You're absolutely on point with your comment!", "You've expressed it in the best possible way!", "You're speaking the absolute truth!", "You've got an amazing perspective on this!", "You've hit the bullseye with your observation!", "You've grasped the concept with utmost accuracy!", "You're spot on with your assessment!", "You've captured the essence brilliantly!", "You've got a remarkable eye for this!", "You've summed it up flawlessly!", "You've got it down to a science!", "Couldn't agree more with your assessment!", "You've eloquently stated my thoughts!", "You're right on the money with your insight!", "You've hit the nail on the head!", "I'm fully aligned with your opinion!", "You've perfectly articulated my viewpoint!", "You're absolutely on point!", "You've encapsulated it beautifully!", "You've got a profound understanding!", "You've hit the mark with your comment!", "You're absolutely spot on with your analysis!", "You've captured the essence magnificently!", "You've got an exceptional eye for this!", "You've summed it up flawlessly!", "You've mastered the concept!", "Couldn't agree more with your perspective!", "You've expressed it in the best way possible!", "You're right on the money with your observation!", "You've hit the nail on the head!", "I completely align with your viewpoint!", "You've encapsulated my thoughts perfectly!", "You're absolutely on point with your comment!", "You've articulated it superbly!", "You're speaking the absolute truth!", "You've got an excellent perspective!", "You've hit the bullseye!", "You've grasped it flawlessly!", "You're spot on!", "You've captured the essence flawlessly!", "You've got an incredible eye for this!", "You've summed it up masterfully!", "You've got it down to perfection!"
    ]

    all_replies = [Reply(
        author=choice(users),
        parent=choice(comments),
        content=comment)
        for comment in generic_comments]

    added = [db.session.add(reply) for reply in all_replies]

    db.session.commit()


def undo_replies():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.replies RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM replies"))

    db.session.commit()
