import pytest
import requests

APIROOT = 'http://127.0.0.1:5000/api'


def test_endpoint():
    response = requests.get(f'{APIROOT}/users/1')
    assert response.status_code == 401
