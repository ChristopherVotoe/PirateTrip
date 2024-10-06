import requests
import json
top_artist = 'Taylor Swift'
top_genre = 'Pop'

with open('key.txt', 'r') as file:
    api_key = file.read()
    data = {
        "model": "gpt-4o",
        "messages":[
            {
                "role": "system",
                "content": "You are a helpful assistant."
            },
            {
                "role": "user",
                "content": "Hello!"
            }]
    }
    headers = {'Authorization': f'Bearer {api_key}', "Content-Type": "application/json"}
    r = requests.post('https://api.openai.com/v1/chat/completions', headers = headers, data=json.dumps(data))
    #print(r.json())
    #print(api_key)
    #print(json.dumps(data))
    response = r.json()
    #print(response)
    ai_message = response['choices'][0]['message']['content']
    print(ai_message)
    #in therory this prints all we need???
