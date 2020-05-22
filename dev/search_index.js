var documenterSearchIndex = {"docs":
[{"location":"#Interface-1","page":"Interface","title":"Interface","text":"","category":"section"},{"location":"#","page":"Interface","title":"Interface","text":"Modules = [AudioSchedules]","category":"page"},{"location":"#","page":"Interface","title":"Interface","text":"Modules = [AudioSchedules]","category":"page"},{"location":"#AudioSchedules.AudioSchedule-Union{Tuple{Sink}, Tuple{Sink}} where Sink","page":"Interface","title":"AudioSchedules.AudioSchedule","text":"AudioSchedule(sink)\n\nCreate a AudioSchedule to schedule changes to sink.\n\njulia> using AudioSchedules\n\njulia> using Unitful: s, Hz\n\njulia> using PortAudio: PortAudioStream\n\njulia> stream = PortAudioStream(samplerate = 44100);\n\njulia> schedule = AudioSchedule(stream.sink)\nAudioSchedule with triggers at () seconds\n\nAdd a synthesizer to the schedule with schedule!. You can schedule for a duration in seconds, or use an Envelope.\n\njulia> envelope = Envelope((0, 0.25, 0), (1s, 1s), (Line, Line));\n\njulia> schedule!(schedule, InfiniteMap(sin, Cycles(440Hz)), 0s, envelope)\n\njulia> schedule!(schedule, InfiniteMap(sin, Cycles(440Hz)), 2s, envelope)\n\njulia> schedule!(schedule, InfiniteMap(sin, Cycles(550Hz)), 2s, envelope)\n\njulia> schedule\nAudioSchedule with triggers at (0.0, 1.0, 2.0, 3.0, 4.0) seconds\n\nThen, you can play it with play.\n\njulia> play(schedule)\n\nYou can only play a schedule once. If you would like to play it again, you must explicitly restart! it.\n\njulia> play(schedule)\nERROR: EOFError: read end of file\n[...]\n\njulia> restart!(schedule)\n\njulia> play(schedule)\n\njulia> close(stream)\n\n\n\n\n\n","category":"method"},{"location":"#AudioSchedules.Cycles","page":"Interface","title":"AudioSchedules.Cycles","text":"Cycles(frequency)\n\nCycles from 0 2π to repeat at a frequency.\n\n\n\n\n\n","category":"type"},{"location":"#AudioSchedules.Envelope","page":"Interface","title":"AudioSchedules.Envelope","text":"Envelope(levels, durations, shapes)\n\nShapes are all functions which return Synthesizers:\n\nshape(start_value, end_value, duration) -> Synthesizer\n\ndurations and levels list the time and level of the boundaries of segments of the envelope. For example,\n\nEnvelope([0.0, 1.0, 1.0, 0.0], [.05 s, 0.9 s, 0.05 s], [Line, Line, Line])\n\nwill create an envelope with three segments:\n\nLine(0.0, 1.0, 0.05 s)\nLine(1.0, 1.0, 0.9 s)\nLine(s1.0, 0.0, 0.05 s)\n\nSee the example for AudioSchedule.\n\n\n\n\n\n","category":"type"},{"location":"#AudioSchedules.InfiniteMap","page":"Interface","title":"AudioSchedules.InfiniteMap","text":"InfiniteMap(a_function, synthesizers...)\n\nMap a_function over synthesizers, assuming that none of the synthesizers will end early.\n\n\n\n\n\n","category":"type"},{"location":"#AudioSchedules.Line","page":"Interface","title":"AudioSchedules.Line","text":"Line(start_value, end_value, duration)\n\nA line from start_value to end_value that lasts for duration.\n\n\n\n\n\n","category":"type"},{"location":"#AudioSchedules.Synthesizer","page":"Interface","title":"AudioSchedules.Synthesizer","text":"abstract type Synthesizer\n\nSynthesizers need only support make_iterator.\n\n\n\n\n\n","category":"type"},{"location":"#AudioSchedules.make_iterator-Tuple{Any,Any}","page":"Interface","title":"AudioSchedules.make_iterator","text":"make_iterator(synthesizer, samplerate)\n\nReturn an iterator that will the synthesizer at a given samplerate\n\n\n\n\n\n","category":"method"},{"location":"#AudioSchedules.play-Tuple{AudioSchedule}","page":"Interface","title":"AudioSchedules.play","text":"play(schedule::AudioSchedule)\n\nPlay an AudioSchedule. See the example for AudioSchedule.\n\n\n\n\n\n","category":"method"},{"location":"#AudioSchedules.restart!-Tuple{AudioSchedule}","page":"Interface","title":"AudioSchedules.restart!","text":"restart!(schedule::AudioSchedule)\n\nRestart a schedule.\n\n\n\n\n\n","category":"method"},{"location":"#AudioSchedules.schedule!-Tuple{AudioSchedule,Any,Any,Any}","page":"Interface","title":"AudioSchedules.schedule!","text":"schedule!(schedule::AudioSchedule, synthesizer, start_time, duration)\n\nSchedule an audio synthesizer to be added to the schedule, starting at start_time and lasting for duration. You can also pass an Envelope as a duration. See the example for AudioSchedule. Note: the schedule will discard the first sample in the iterator during scheduling.\n\n\n\n\n\n","category":"method"}]
}
