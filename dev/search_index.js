var documenterSearchIndex = {"docs":
[{"location":"#Interface-1","page":"Interface","title":"Interface","text":"","category":"section"},{"location":"#","page":"Interface","title":"Interface","text":"Modules = [AudioSchedulers]","category":"page"},{"location":"#","page":"Interface","title":"Interface","text":"Modules = [AudioSchedulers]","category":"page"},{"location":"#AudioSchedulers.AudioScheduler-Union{Tuple{Sink}, Tuple{Sink}} where Sink","page":"Interface","title":"AudioSchedulers.AudioScheduler","text":"AudioScheduler(sink)\n\nCreate a AudioScheduler to schedule changes to sink.\n\njulia> using AudioSchedulers\n\njulia> using Unitful: s, Hz\n\njulia> using PortAudio: PortAudioStream\n\njulia> stream = PortAudioStream(samplerate = 44100);\n\njulia> scheduler = AudioScheduler(stream.sink)\nAudioScheduler with triggers at ()\n\nAdd a synthesizer to the schedule with schedule!. You can schedule for a duration in seconds, or use an Envelope.\n\njulia> envelope = Envelope((0, 0.25, 0), (0.05s, 0.95s), (Line, Line));\n\njulia> schedule!(scheduler, Map(sin, Cycles(440Hz)), 0s, envelope)\n\njulia> schedule!(scheduler, Map(sin, Cycles(440Hz)), 1s, envelope)\n\njulia> schedule!(scheduler, Map(sin, Cycles(550Hz)), 1s, envelope)\n\nThen, you can play it with play.\n\njulia> play(scheduler)\n\nYou can only play a scheduler once.\n\njulia> play(scheduler)\nERROR: EOFError: read end of file\n[...]\n\njulia> close(stream)\n\n\n\n\n\n","category":"method"},{"location":"#AudioSchedulers.Cycles","page":"Interface","title":"AudioSchedulers.Cycles","text":"Cycles(frequency)\n\nCycles from 0 2π to repeat at a frequency in hertz.\n\n\n\n\n\n","category":"type"},{"location":"#AudioSchedulers.Envelope","page":"Interface","title":"AudioSchedulers.Envelope","text":"Envelope(levels, durations, shapes)\n\nShapes are all functions which return Synthesizers:\n\nshape(start_value, end_value, duration) -> Synthesizer\n\ndurations and levels list the time and level of the boundaries of segments of the envelope. For example,\n\nEnvelope([0.0, 1.0, 1.0, 0.0], [.05 s, 0.9 s, 0.05 s], [Line, Line, Line])\n\nwill create an envelope with three segments:\n\nLine(0.0, 1.0, 0.05 s)\nLine(1.0, 1.0, 0.9 s)\nLine(s1.0, 0.0, 0.05 s)\n\nSee the example for AudioScheduler.\n\n\n\n\n\n","category":"type"},{"location":"#AudioSchedulers.Line","page":"Interface","title":"AudioSchedulers.Line","text":"Line(start_value, end_value, duration)\n\nA line from start_value to end_value that lasts for duration.\n\n\n\n\n\n","category":"type"},{"location":"#AudioSchedulers.Map","page":"Interface","title":"AudioSchedulers.Map","text":"Map(a_function, synthesizers)\n\nMap a_function over audio synthesizers.\n\n\n\n\n\n","category":"type"},{"location":"#AudioSchedulers.Synthesizer","page":"Interface","title":"AudioSchedulers.Synthesizer","text":"abstract type Synthesizer\n\nSynthesizers need only support make_iterator.\n\n\n\n\n\n","category":"type"},{"location":"#AudioSchedulers.make_iterator-Tuple{Any,Any}","page":"Interface","title":"AudioSchedulers.make_iterator","text":"make_iterator(synthesizer, samplerate)\n\nReturn an iterator that will the synthesizer at a given samplerate\n\n\n\n\n\n","category":"method"},{"location":"#AudioSchedulers.play-Tuple{AudioScheduler}","page":"Interface","title":"AudioSchedulers.play","text":"play(scheduler::AudioScheduler)\n\nPlay an AudioScheduler. See the example for AudioScheduler.\n\n\n\n\n\n","category":"method"},{"location":"#AudioSchedulers.schedule!-Tuple{AudioScheduler,Any,Any,Any}","page":"Interface","title":"AudioSchedulers.schedule!","text":"schedule!(scheduler::AudioScheduler, synthesizer, start_time, duration)\n\nSchedule an audio synthesizer to be added to the scheduler, starting at start_time and lasting for duration. You can also pass an Envelope as a duration. See the example for AudioScheduler. Note: the scheduler will discard the first sample in the iterator during scheduling.\n\n\n\n\n\n","category":"method"}]
}
