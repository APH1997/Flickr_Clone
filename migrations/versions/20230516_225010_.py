"""empty message

Revision ID: d2e66b143bfa
Revises: 
Create Date: 2023-05-16 22:50:10.402829

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'd2e66b143bfa'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('users',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('first_name', sa.String(length=50), nullable=False),
    sa.Column('last_name', sa.String(length=50), nullable=False),
    sa.Column('bio', sa.String(), nullable=True),
    sa.Column('profile_image_url', sa.String(), nullable=True),
    sa.Column('cover_photo_url', sa.String(), nullable=True),
    sa.Column('username', sa.String(length=40), nullable=False),
    sa.Column('email', sa.String(length=255), nullable=False),
    sa.Column('hashed_password', sa.String(length=255), nullable=False),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('email'),
    sa.UniqueConstraint('username')
    )
    op.create_table('albums',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('cover_photo_url', sa.String(), nullable=True),
    sa.Column('author_id', sa.Integer(), nullable=True),
    sa.Column('title', sa.String(length=100), nullable=False),
    sa.Column('description', sa.String(length=200), nullable=True),
    sa.ForeignKeyConstraint(['author_id'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('photos',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('author_id', sa.Integer(), nullable=True),
    sa.Column('aws_url', sa.String(), nullable=False),
    sa.Column('caption', sa.String(length=100), nullable=True),
    sa.Column('description', sa.String(), nullable=True),
    sa.ForeignKeyConstraint(['author_id'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('album_photos',
    sa.Column('album_id', sa.Integer(), nullable=False),
    sa.Column('photo_id', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['album_id'], ['albums.id'], ),
    sa.ForeignKeyConstraint(['photo_id'], ['photos.id'], ),
    sa.PrimaryKeyConstraint('album_id', 'photo_id')
    )
    op.create_table('comments',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('author_id', sa.Integer(), nullable=True),
    sa.Column('photo_id', sa.Integer(), nullable=True),
    sa.Column('content', sa.String(length=200), nullable=False),
    sa.ForeignKeyConstraint(['author_id'], ['users.id'], ),
    sa.ForeignKeyConstraint(['photo_id'], ['photos.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('replies',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('author_id', sa.Integer(), nullable=True),
    sa.Column('parent_id', sa.Integer(), nullable=True),
    sa.Column('content', sa.String(length=200), nullable=False),
    sa.ForeignKeyConstraint(['author_id'], ['users.id'], ),
    sa.ForeignKeyConstraint(['parent_id'], ['comments.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('replies')
    op.drop_table('comments')
    op.drop_table('album_photos')
    op.drop_table('photos')
    op.drop_table('albums')
    op.drop_table('users')
    # ### end Alembic commands ###