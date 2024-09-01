import torchaudio
from audiocraft.models import MusicGen
import torch
import torch.nn as nn
from torch.utils.data import DataLoader, Dataset
from torch.optim import AdamW
import random
from audiocraft.modules.conditioners import ClassifierFreeGuidanceDropout
import os

model = MusicGen.get_pretrained('small')
device = torch.device("cpu")
print('loading2')
model.lm.load_state_dict(torch.load('D:/Music-gen/lm_final.pt', map_location=device))
model.lm = model.lm.to(torch.float32).to(device)