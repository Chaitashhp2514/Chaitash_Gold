"""
Vercel serverless entry point for the FastAPI backend.

Vercel's Python runtime picks up the `app` ASGI object automatically
when it's exported at module level from a file inside the `api/` directory.
"""

import sys
import os

# Make the repo root importable so we can do `from backend.server import app`
sys.path.insert(0, os.path.join(os.path.dirname(__file__), ".."))

from backend.server import app  # noqa: F401, E402 — re-exported for Vercel
