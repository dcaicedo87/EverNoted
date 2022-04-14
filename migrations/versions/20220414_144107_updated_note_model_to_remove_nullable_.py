"""updated note model to remove nullable=false on notebook_id

Revision ID: b8887c90f93e
Revises: 81d8a43aa44b
Create Date: 2022-04-14 14:41:07.950177

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'b8887c90f93e'
down_revision = '81d8a43aa44b'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.alter_column('notes', 'notebook_id',
               existing_type=sa.INTEGER(),
               nullable=True)
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.alter_column('notes', 'notebook_id',
               existing_type=sa.INTEGER(),
               nullable=False)
    # ### end Alembic commands ###
