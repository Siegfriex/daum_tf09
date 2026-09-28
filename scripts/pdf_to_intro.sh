#!/usr/bin/env bash
# 사용: bash scripts/pdf_to_intro.sh <소개.pdf>
# PDF 1쪽 → public/intro/intro.jpg (+ 원본 intro.pdf 복사). 필요: pdftoppm (poppler-utils)
set -euo pipefail
src="${1:?PDF 경로를 주세요}"
out="$(cd "$(dirname "$0")/.." && pwd)/public/intro"
mkdir -p "$out"
cp "$src" "$out/intro.pdf"
# 1920×1080 슬라이드 기준 2배(3840px) 로 래스터화
pdftoppm -f 1 -l 1 -singlefile -jpeg -jpegopt quality=92 -scale-to-x 3840 -scale-to-y -1 "$src" "$out/intro"
ls -la "$out/intro.jpg"
