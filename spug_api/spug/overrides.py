
import os


DEBUG = True
ALLOWED_HOSTS = ['127.0.0.1']

SECRET_KEY = 'vk0do47)egwzz!uk49%(y3s(fpx4+ha@ugt-hcv&%&d@hwr&p7'
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))


DATABASES = {
    'default': {
        'ATOMIC_REQUESTS': True,
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': os.path.join(BASE_DIR, 'db.sqlite3'),
    }
}