export function tokenize(charStream) {
  if (!charStream) return [];
  // replace tab to space
  const replaceTab = charStream
    .toUpperCase()
    .replace(/\t/g /* regex to replace all tabs */, " ||||| "); // ||||| represents a gap, temporary
  // remove new lines
  const lineStripped = replaceTab.split("\n");
  // remove white spaces
  const spaceStripped = lineStripped.map(value => value.split(" "));
  // filter out empty array
  const emptyRemoved = spaceStripped
    .filter(arr => !(arr.length === 1 && arr[0] === ""))
    .map(arr => arr.filter(value => value !== ""));
  // filter noise
  let start = 0,
    end = emptyRemoved.length - 1;
  for (let i = 0; i < emptyRemoved.length - 1; i++) {
    const content = emptyRemoved[i];
    if (content.includes("REMARK") && content.includes("VENUE")) {
      start = i + 1;
      break;
    }
  }
  // two loops are necessary, prevent overriding start / end
  for (let i = emptyRemoved.length - 1; i >= 0; i--) {
    const content = emptyRemoved[i];
    if (content.includes("TOTAL") && content.includes("AU")) {
      end = i - 1;
      break;
    }
  }
  // remove useless part
  const noiseRemoved = emptyRemoved.slice(start, end + 1);
  // remove gap
  const gapRemoved = noiseRemoved.map(arr =>
    arr
      .join(" ")
      .split("|||||")
      .map(value => value.trim())
  );
  return gapRemoved;
}
