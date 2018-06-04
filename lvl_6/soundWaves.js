function draw(waves){
  const sound = '■';
  const blank = '□';
  const highest = Math.max(...waves);
  let tempHigh = Math.max(...waves);
  let soundWave = '';

  for (let sW = 0; sW < highest; sW++) {
    for (let wave = 0; wave < waves.length; wave++) {
      const line = waves[wave];

      if (line >= tempHigh) {
        soundWave += sound;
        continue;
      }

      soundWave += blank;
    }

    tempHigh -= 1;
    if (highest > 0 && sW !== highest - 1) {
      soundWave += '\n';
    }
  }

  return soundWave;
}


draw([1,2,3,4]);
