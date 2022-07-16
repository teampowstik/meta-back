# open users.json file
import json
import requests

users=[]
with open('users.json', 'r') as fp:
    users = json.load(fp)

#iterate through users
for user in users:
    #send a post request to the server
    response = requests.post('http://powstik-back-test.azurewebsites.net/register', json=user)
    #print the response
    print(response.text)

# add categories
categories=[]
with open('categories.json', 'r') as fp:
    categories = json.load(fp)

for category in categories:
    response = requests.post('http://powstik-back-test.azurewebsites.net/category/', json=category)
    print(response.text)

#login seller
response = requests.post('http://powstik-back-test.azurewebsites.net/login', json={"email": "rajesh@example.com", "password": "helloworld"})
access_token = response.json()['access']
headers={"Authorization": "Bearer " + access_token}

products=[]
with open('products.json', 'r') as fp:
    products = json.load(fp)

# iterate through products
for product in products:
    # send a post request to the server
    response = requests.post('http://powstik-back-test.azurewebsites.net/product/', json=product, headers=headers)
    # print the response
    print(response.text)

consultations=[]
with open('consultations.json', 'r') as fp:
    consultations = json.load(fp)
    
# iterate through consultations
for consultation in consultations:
    # send a post request to the server
    response = requests.post('http://powstik-back-test.azurewebsites.net/consultation/', json=consultation, headers=headers)
    # print the response
    print(response.text)
