var documenterSearchIndex = {"docs":
[{"location":"#Interface-1","page":"Interface","title":"Interface","text":"","category":"section"},{"location":"#","page":"Interface","title":"Interface","text":"Modules = [AudioSchedules]","category":"page"},{"location":"#","page":"Interface","title":"Interface","text":"Modules = [AudioSchedules]","category":"page"},{"location":"#AudioSchedules.AudioSchedule-Tuple{Any}","page":"Interface","title":"AudioSchedules.AudioSchedule","text":"AudioSchedule(the_sample_rate)\n\nCreate an AudioSchedule.\n\njulia> using AudioSchedules\n\njulia> using SampledSignals: s, Hz\n\njulia> a_schedule = AudioSchedule(44100Hz)\nAudioSchedule with triggers at () seconds\n\nAdd a synthesizer to the schedule with schedule!.\n\njulia> envelope = Envelope((0, 0.25, 0), (0.05s, 0.95s), (Line, Line));\n\njulia> schedule!(a_schedule, StrictMap(sin, Cycles(440Hz)), 0s, envelope)\n\njulia> schedule!(a_schedule, StrictMap(sin, Cycles(440Hz)), 1s, envelope)\n\njulia> schedule!(a_schedule, StrictMap(sin, Cycles(550Hz)), 1s, envelope)\n\njulia> a_schedule\nAudioSchedule with triggers at (0.0, 0.05, 1.0, 1.05, 2.0) seconds\n\nThen, you can create a SampledSource from the schedule using plan!.\n\njulia> using SampledSignals: unsafe_read!\n\njulia> a_plan = plan!(a_schedule);\n\nYou can find the number of samples in a Plan with length.\n\njulia> the_length = length(a_plan)\n88200\n\nYou can use the plan as a source for samples.\n\njulia> buf = Vector{Float64}(undef, the_length);\n\njulia> unsafe_read!(a_plan, buf, 0, the_length);\n\njulia> buf[1:4] ≈ [0.0, 7.1029846e-6, 2.8356127e-5, 6.3592327e-5]\ntrue\n\nYou can only plan! a schedule once.\n\njulia> plan!(a_schedule)\nERROR: The schedule was empty or had already been consumed\n\n\n\n\n\n","category":"method"},{"location":"#AudioSchedules.Cycles","page":"Interface","title":"AudioSchedules.Cycles","text":"Cycles(frequency)\n\nCycles from 0 2π to repeat at a frequency.\n\n\n\n\n\n","category":"type"},{"location":"#AudioSchedules.Envelope","page":"Interface","title":"AudioSchedules.Envelope","text":"Envelope(levels, durations, shapes)\n\nShapes are all functions which return Synthesizers:\n\nshape(start_value, end_value, duration) -> Synthesizer\n\ndurations and levels list the time and level of the boundaries of segments of the envelope. For example,\n\nEnvelope([0.0, 1.0, 1.0, 0.0], [.05 s, 0.9 s, 0.05 s], [Line, Line, Line])\n\nwill create an envelope with three segments:\n\nLine(0.0, 1.0, 0.05 s)\nLine(1.0, 1.0, 0.9 s)\nLine(1.0, 0.0, 0.05 s)\n\nSee the example for AudioSchedule.\n\n\n\n\n\n","category":"type"},{"location":"#AudioSchedules.Line","page":"Interface","title":"AudioSchedules.Line","text":"Line(start_value, end_value, duration)\n\nA line from start_value to end_value that lasts for duration.\n\n\n\n\n\n","category":"type"},{"location":"#AudioSchedules.StrictMap","page":"Interface","title":"AudioSchedules.StrictMap","text":"StrictMap(a_function, synthesizers...)\n\nMap a_function over synthesizers, assuming that none of the synthesizers will end before they are scheduled to.\n\n\n\n\n\n","category":"type"},{"location":"#AudioSchedules.Synthesizer","page":"Interface","title":"AudioSchedules.Synthesizer","text":"abstract type Synthesizer\n\nSynthesizers need only support make_iterator.\n\n\n\n\n\n","category":"type"},{"location":"#AudioSchedules.plan!-Tuple{AudioSchedule}","page":"Interface","title":"AudioSchedules.plan!","text":"plan!(a_schedule::AudioSchedule)\n\nReturn a SampledSource for the schedule.\n\n\n\n\n\n","category":"method"},{"location":"#AudioSchedules.schedule!-Tuple{AudioSchedule,Any,Any,Envelope}","page":"Interface","title":"AudioSchedules.schedule!","text":"schedule!(schedule::AudioSchedule, synthesizer::Synthesizer, start_time, envelope::Envelope)\n\nSchedule an audio synthesizer to be added to the schedule, starting at start_time with the duration and volume contained in an Envelope. See the example for AudioSchedule.\n\n\n\n\n\n","category":"method"},{"location":"#AudioSchedules.make_iterator","page":"Interface","title":"AudioSchedules.make_iterator","text":"make_iterator(synthesizer, the_sample_rate)\n\nReturn an iterator that will the play the synthesizer at the_sample_rate\n\n\n\n\n\n","category":"function"}]
}
