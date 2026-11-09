
function validateProject(body = {}) {
    const name = typeof body.name === 'string'
      ? body.name.trim()
      : '';

    const genre = typeof body.genre === 'string'
      ? body.genre.trim()
      : '';

    const bpmText = typeof body.bpm === 'string'
      ? body.bpm.trim()
      : '';

    const bpm = Number(bpmText);

    if (
      !name ||
      !genre ||
      !bpmText ||
      !Number.isSafeInteger(bpm) ||
      bpm <= 0
    ) {
      return null;
    }

    return {
      name,
      genre,
      bpm
    };
  }

  module.exports = { validateProject };
