from pymongo import MongoClient
from dotenv import dotenv_values
import urllib.parse

config = dotenv_values("../.env")

username = urllib.parse.quote_plus(config['MONGO_DB_USERNAME'])
password = urllib.parse.quote_plus(config['MONGO_DB_PASSWORD'])

client = MongoClient(f"mongodb+srv://{username}:{password}@vericreds.gjtihuc.mongodb.net/vericreds-db")

db = client["vericreds-db"]
users = db["users"]
