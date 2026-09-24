"""Generate static Heart audio. Requires kokoro-onnx and soundfile locally only."""
import json
import sys
from pathlib import Path
import numpy as np
import soundfile as sf
from kokoro_onnx import Kokoro

root = Path(__file__).resolve().parents[1]
model_dir = Path(sys.argv[1])
refresh_spelling = '--refresh-spelling' in sys.argv[2:]
engine = Kokoro(str(model_dir / 'kokoro-v1.0.onnx'), str(model_dir / 'voices-v1.0.bin'))
source = (root / 'questions.js').read_text(encoding='utf-8')
questions = json.loads(source.split('window.QUESTIONS = ', 1)[1].strip().removesuffix(';'))
jobs = [('test', 'Hello. This is your English audio test.')]
jobs += [(q['id'], q['audio']) for q in questions if q.get('audio')]
jobs += [(clip['id'], clip['text']) for q in questions for clip in q.get('audioPairs', [])]
out = root / 'assets' / 'audio'
out.mkdir(parents=True, exist_ok=True)
manifest = {'voice': 'af_heart', 'language': 'en-us', 'model': 'Kokoro v1.0', 'clips': []}
for name, text in jobs:
    # Explicit letter-name phonemes prevent initials being read as abbreviations.
    letters = {'t2-dictation': ['bˈiː', 'ˈiː', 'dˈiː'], 't2-listening': ['ˈiː', 'vˈiː', 'ˈeɪ'],
               't2-match-1': ['dʒˈeɪ', 'ˈeɪ', 'ˈɛn', 'ˈiː'],
               't2-match-2': ['ˈɛs', 'ˈeɪ', 'ˈɑːɹ', 'ˈeɪ'],
               't2-match-3': ['ˈɛm', 'ˈaɪ', 'kˈeɪ', 'ˈiː']}
    if (out / (name + '.wav')).exists() and not (refresh_spelling and name in letters):
        info = sf.info(out / (name + '.wav'))
        manifest['clips'].append({'id': name, 'text': text, 'seconds': round(info.duration, 3)})
        continue
    if name in letters:
        parts = []
        for index, phonemes in enumerate(letters[name]):
            # A sentence ending gives each isolated letter its own completed intonation.
            samples, rate = engine.create(phonemes + '.', voice='af_heart', speed=0.8, lang='en-us', is_phonemes=True)
            parts.append(samples)
            if index < len(letters[name]) - 1:
                parts.append(np.zeros(rate, dtype=np.float32))
        samples = np.concatenate(parts)
    else:
        samples, rate = engine.create(text, voice='af_heart', speed=0.9, lang='en-us')
    samples = np.concatenate([np.zeros(int(rate * .15)), samples, np.zeros(int(rate * .25))])
    assert np.isfinite(samples).all() and np.max(np.abs(samples)) > .01, name
    sf.write(out / (name + '.wav'), samples, rate, subtype='PCM_16')
    manifest['clips'].append({'id': name, 'text': text, 'seconds': round(len(samples) / rate, 3)})
    print(name, manifest['clips'][-1]['seconds'], flush=True)
(out / 'manifest.json').write_text(json.dumps(manifest, ensure_ascii=False, indent=2), encoding='utf-8')
