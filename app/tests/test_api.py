import pytest
import requests


class TestUserRoutes:
    """
    This class of tests tries every api/users endpoint.
    Login requirements are disabled in development.
    """
    API = 'http://127.0.0.1:5000/api/users'

    @pytest.mark.parametrize('endpoint', [
        '/',
        '/10',
        '/10000'
        ])
    def test_get_users(self, endpoint):
        """
        tests get/put on all users and user by id
        """
        response = requests.get(f'{self.API}{endpoint}')

        data = response.json()
        if endpoint == '/':
            assert response.status_code == 200

            assert 'users' in data
            assert isinstance(data['users'], list)
            firstUser = data['users'][0]
            assert 'id' in firstUser
            assert 'username' in firstUser
            assert 'email' in firstUser
            assert 'first_name' in firstUser
            assert 'last_name' in firstUser
            assert 'bio' in firstUser
            assert 'profile_picture_url' in firstUser
            assert 'cover_photo_url' in firstUser

        if endpoint == '/1':
            assert response.status_code == 200

            assert  isinstance(data, dict)
            assert 'id' == 1
            assert 'username' == 'Demo'
            assert 'email' == 'demo@aa.io'
            assert 'first_name' == 'Demo'
            assert 'last_name' == 'Lition'
            assert 'bio' in data
            assert 'profile_picture_url' in data
            assert 'cover_photo_url' in data


        if endpoint == '/10000':
            assert response.status_code == 404

            assert "error" in data




    def test_edit_user(self):
        """
        tests editing a user who we are not authorized as
        """
        pass

    def test_bio_edit(self):
        """
        Tests editing a user bio we are not authorized for
        """
        pass

# TODO: sign in logic to test authorized responses
class TestPhotoRoutes:
    pass

class TestAWS:
    pass
class TestCommentRoutes:
    pass

class TestReplyRoutes:
    pass
