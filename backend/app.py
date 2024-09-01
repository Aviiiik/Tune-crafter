import torchaudio
from audiocraft.models import MusicGen
import torch
import torch.nn as nn
from torch.utils.data import DataLoader, Dataset
from torch.optim import AdamW
import random
from audiocraft.modules.conditioners import ClassifierFreeGuidanceDropout
import os

# Load your pretrained model
print("loading1")
model = MusicGen.get_pretrained('small')
print("loading11")
device = torch.device("cpu")
print("loading2")
model.lm.load_state_dict(torch.load('backend/lm_final.pt', map_location=device)) 
print("loading3")
model.lm = model.lm.to(torch.float32).to('cpu')  # Load on CPU for 
print("loading")

from flask import Flask, request, jsonify, send_file
from flask_cors import CORS
from io import BytesIO
app = Flask(__name__)
CORS(app)


@app.route('/', methods=['GET'])
def home():
    return "running"


@app.route('/generate_music', methods=['POST'])
def generate_music():
    print("starting generate")
    data = request.json
    print(data)
    prompt = data.get('inputText', '')
    duration = data.get('duration', 5)
    prompt = prompt + data.get('genre', '')

    # Generate music based on the input prompt and genre
    print("g1")
    model.set_generation_params(duration=int(duration))
    wav = model.generate([prompt])
    print("g2")
    # Convert the generated music to a .wav format in memory
    buffer = BytesIO()
    torchaudio.save(buffer, wav[0].cpu(), sample_rate=model.sample_rate, format="wav")
    buffer.seek(0)
    print('returing')
    return send_file(buffer, mimetype='audio/wav', as_attachment=True, download_name='generated_music.wav')


app.run(host='0.0.0.0', port=5001)
