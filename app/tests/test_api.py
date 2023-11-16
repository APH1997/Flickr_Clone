import pytest
import requests

APIROOT = 'http://127.0.0.1:5000/api'

class TestUnauthorized:
    """
    This class of tests tries every api endpoint.
    They should all give 401s because we have not
    authorized a user
    """
    @pytest.mark.parametrize('endpoint', [
        '/users/',
        '/users/1',
        ])
    def test_get_users(self, endpoint):
        response = requests.get(f'{APIROOT}{endpoint}')
        assert response.status_code == 401

    def test_edit_user(self):
        response = requests.put(f'{APIROOT}/users/1/edit')
        assert response.status_code == 401
