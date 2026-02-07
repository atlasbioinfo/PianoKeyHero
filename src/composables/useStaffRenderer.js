import { Renderer, Stave, StaveNote, Voice, Formatter, Accidental } from 'vexflow'
import { noteToVexKey, getAccidental } from '@/utils/chordUtils.js'

export function useStaffRenderer() {
  function renderChord(containerEl, chordNotes) {
    containerEl.innerHTML = ''

    const width = Math.min(containerEl.clientWidth || 350, 450)
    const height = 200

    const renderer = new Renderer(containerEl, Renderer.Backends.SVG)
    renderer.resize(width, height)
    const context = renderer.getContext()

    const staveWidth = width - 20
    const stave = new Stave(10, 30, staveWidth)
    stave.addClef('treble')
    stave.setContext(context).draw()

    const keys = chordNotes.map(n => noteToVexKey(n))

    const staveNote = new StaveNote({
      keys,
      duration: 'w',
    })

    chordNotes.forEach((note, index) => {
      const acc = getAccidental(note.name)
      if (acc) {
        staveNote.addModifier(new Accidental(acc), index)
      }
    })

    const voice = new Voice({ num_beats: 4, beat_value: 4 })
    voice.setStrict(false)
    voice.addTickables([staveNote])

    new Formatter().joinVoices([voice]).format([voice], staveWidth - 80)
    voice.draw(context, stave)
  }

  return { renderChord }
}
