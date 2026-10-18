"""Regenerates the Reem Kufi subset used for the أمانة signature (ADR-007).

Usage (needs Python 3 with fonttools and brotli: pip install fonttools brotli):
    python scripts/subset-arabic-font.py [TEXT]

TEXT defaults to the word أمانة. Changing it is a design decision: get approval first.
"""
import sys
from fontTools import subset

SOURCE = "assets/fonts/reem-kufi-arabic-700-normal.woff2"
OUTPUT = "src/app/fonts/reem-kufi-amanah-700.woff2"
text = sys.argv[1] if len(sys.argv) > 1 else "أمانة"

options = subset.Options()
options.flavor = "woff2"
options.layout_features = ["*"]  # keep Arabic shaping (init/medi/fina, ligatures, marks)
font = subset.load_font(SOURCE, options)
subsetter = subset.Subsetter(options)
subsetter.populate(text=text)
subsetter.subset(font)
subset.save_font(font, OUTPUT, options)
print(f"Wrote {OUTPUT} for text: {text}")
