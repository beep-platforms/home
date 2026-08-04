#!/usr/bin/env python3
"""Timestamped-clip extraction for the Pala Rifle guide's film room.

The same flow as the Quiet Parts documentary transcriber: pull a YouTube
video's transcript, find the moments where given topics are discussed, and
emit start/end spans ready to paste into src/data/filmRoom.ts.

Requires network access to youtube.com (run from a normal machine, not a
sandboxed CI runner):

    pip install youtube-transcript-api
    python scripts/grubby-transcriber.py clips.json > spans.json
    python scripts/grubby-transcriber.py --dump VIDEO_ID   # full script mode

clips.json shape:

    [
      {
        "videoId": "k-gCz2MLW8o",
        "title": "Planning Your Route w/ Creep Orders",
        "queries": [
          {"label": "pulling camps", "keywords": ["pull", "aggro", "camp"]},
          {"label": "route planning", "keywords": ["route", "order"]}
        ]
      }
    ]

Output: one JSON object per video with matched spans -
{videoId, title, spans: [{label, start, end, quote}]}. Spans merge adjacent
keyword hits (gap <= MERGE_GAP s), pad PAD s each side, and cap at MAX_SPAN s
so an embed stays a clip, not the whole VOD.
"""

from __future__ import annotations

import json
import sys
from dataclasses import dataclass

MERGE_GAP = 30.0  # seconds between hits that still count as one moment
PAD = 8.0  # lead-in/lead-out around a matched moment
MAX_SPAN = 240.0  # never emit a "clip" longer than 4 minutes


@dataclass
class Segment:
    start: float
    duration: float
    text: str

    @property
    def end(self) -> float:
        return self.start + self.duration


def find_spans(
    segments: list[Segment], keywords: list[str], label: str
) -> list[dict]:
    """Merge keyword-matching transcript segments into padded clip spans."""
    lowered = [k.lower() for k in keywords]
    hits = [s for s in segments if any(k in s.text.lower() for k in lowered)]
    if not hits:
        return []

    spans: list[dict] = []
    cur_start, cur_end = hits[0].start, hits[0].end
    cur_quotes = [hits[0].text]
    for seg in hits[1:]:
        if seg.start - cur_end <= MERGE_GAP and seg.end - cur_start <= MAX_SPAN:
            cur_end = max(cur_end, seg.end)
            cur_quotes.append(seg.text)
        else:
            spans.append(_pack(cur_start, cur_end, cur_quotes, label))
            cur_start, cur_end, cur_quotes = seg.start, seg.end, [seg.text]
    spans.append(_pack(cur_start, cur_end, cur_quotes, label))
    return spans


def _pack(start: float, end: float, quotes: list[str], label: str) -> dict:
    return {
        "label": label,
        "start": max(0, int(start - PAD)),
        "end": int(end + PAD),
        "quote": " ".join(quotes)[:280],
    }


def fetch_segments(video_id: str) -> list[Segment]:
    from youtube_transcript_api import YouTubeTranscriptApi

    raw = YouTubeTranscriptApi().fetch(video_id)
    return [Segment(s.start, s.duration, s.text) for s in raw]


def main(argv: list[str]) -> int:
    if len(argv) >= 2 and argv[0] == "--dump":
        for seg in fetch_segments(argv[1]):
            mins, secs = divmod(int(seg.start), 60)
            print(f"[{mins:02d}:{secs:02d}] {seg.text}")
        return 0

    if len(argv) != 1:
        print(__doc__, file=sys.stderr)
        return 2

    with open(argv[0], encoding="utf-8") as f:
        clips = json.load(f)

    out = []
    for clip in clips:
        video_id = clip["videoId"]
        try:
            segments = fetch_segments(video_id)
        except Exception as exc:  # noqa: BLE001 - report and continue the batch
            out.append({"videoId": video_id, "error": str(exc)})
            continue
        spans = []
        for query in clip.get("queries", []):
            spans.extend(find_spans(segments, query["keywords"], query["label"]))
        out.append(
            {
                "videoId": video_id,
                "title": clip.get("title", ""),
                "spans": sorted(spans, key=lambda s: s["start"]),
            }
        )

    json.dump(out, sys.stdout, indent=2)
    print()
    return 0


if __name__ == "__main__":
    raise SystemExit(main(sys.argv[1:]))
