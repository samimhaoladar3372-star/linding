# # Bangla AI Assistant

Eta ekta simple AI assistant project. Apni ei project diye local fallback assistant chalate parben, ebong OpenAI API key thakle OpenAI model o use korte parben.

## Setup

1. `cd ~/Documents/ai-assistant`
2. `python -m venv .venv`
3. `./.venv/Scripts/Activate.ps1`
4. `pip install -r requirements.txt`

## Run

- Browser-based assistant (no Python needed):
  1. `cd C:\Users\User\Documents\ai-assistant`
  2. Open `index.html` in your browser

- Python assistant (optional, if Python installed later):
  `python assistant.py`

- Backend Pet Store server:
  1. `cd C:\Users\User\Documents\ai-assistant`
  2. `python -m venv .venv`
  3. `./.venv/Scripts/Activate.ps1`
  4. `pip install -r requirements.txt`
  5. `python backend.py`
  6. Open `http://127.0.0.1:5000` in your browser

- OpenAI mode (optional):
  1. `setx OPENAI_API_KEY "your_api_key_here"`
  2. `python assistant.py`

### Environment file (recommended)

You can store API keys in a local `.env` file (do not commit this file).
1. Copy `.env.example` to `.env`
2. Edit `.env` and set your keys:

```
OPENAI_API_KEY=sk-...
GOOGLE_API_KEY=AIzaSy...
```

The Python assistant will automatically load `.env` if `python-dotenv` is installed.

## Use

- Proshno korben Bangla te.
- Browser version e shudhu `index.html` open korun.
- Python version e `exit`, `quit`, ba `bye` dile program bondho hobe.

## Google API usage

If you plan to use a Google API (Translate, Maps, Vision, etc.), put the key
in `.env` as `GOOGLE_API_KEY`. See `assistant.py` for an example helper
function `google_api_example()` that shows how to check the key and prepare
an HTTP request (requires `requests` package).
