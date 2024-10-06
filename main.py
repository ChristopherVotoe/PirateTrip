import requests
import json
#Bruno mars adele and ts
top_artist = ["Bruno Mars", "Adele", "Taylor Swift"]
with open('key.txt', 'r') as file:
    api_key = file.read()
    data = {
        "model": "gpt-4o",
        "messages":[
            {
                "role": "system",
                "content": "I will give you 3 artists that i enjoy and i would like you to send back locations i should visit based on that"
            },
            {
                "role": "user",
                "content": "tell me only the places no extra info" + ','.join(top_artist)
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
with open('output.txt', 'w') as file:
    file.write(ai_message)