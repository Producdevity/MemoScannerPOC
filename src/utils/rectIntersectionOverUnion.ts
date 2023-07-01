import type {Rect} from 'vision-camera-dynamsoft-document-normalizer'

function rectIntersectionOverUnion(rect1: Rect, rect2: Rect): number {
  let leftColumnMax = Math.max(rect1.left, rect2.left)
  let rightColumnMin = Math.min(rect1.right, rect2.right)
  let upRowMax = Math.max(rect1.top, rect2.top)
  let downRowMin = Math.min(rect1.bottom, rect2.bottom)

  if (leftColumnMax >= rightColumnMin || downRowMin <= upRowMax) {
    return 0
  }

  let s1 = rect1.width * rect1.height
  let s2 = rect2.width * rect2.height
  let sCross = (downRowMin - upRowMax) * (rightColumnMin - leftColumnMax)
  return sCross / (s1 + s2 - sCross)
}

export default rectIntersectionOverUnion
