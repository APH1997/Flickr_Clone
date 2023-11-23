import pytest
import requests


class TestUserRoutes:
    """
    This class of tests tries every api/users endpoint.
    """
    API = 'http://127.0.0.1:5000/api/users'

    @pytest.mark.parametrize('endpoint', [
        '/',
        '/10',
        ])
    def test_get_users_no_auth(self, endpoint):
        """
        tests get/put on all users and user by id
        """
        response = requests.get(f'{self.API}{endpoint}')
        assert response.status_code == 401
    # TODO: authorized

    def test_edit_user_no_auth(self):
        """
        tests editing a user who we are not authorized as
        """
        response = requests.put(f'{self.API}/10/edit')
        assert response.status_code == 401
    # TODO: authorized with invalid data
    # TODO: authorized but not as targeted user

    def test_bio_edit_no_auth(self):
        """
        Tests editing a user bio we are not authorized for
        """
        response = requests.put(f'{self.API}/10/bio/edit')
        assert response.status_code == 401
    # TODO: authorized with invalid data
    # TODO: authorized but not as targeted user

# TODO: sign in logic to test authorized responses
class TestPhotoRoutes:
    pass

class TestAWS:
    pass
class TestCommentRoutes:
    pass

class TestReplyRoutes:
    pass
