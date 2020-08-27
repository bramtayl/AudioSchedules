var documenterSearchIndex = {"docs":
[{"location":"#Interface","page":"Interface","title":"Interface","text":"","category":"section"},{"location":"","page":"Interface","title":"Interface","text":"warning: Performance note\nPresumably due to the limits of inference, scheduling 16 or more synthesizers simultaneously will lead you off a performance cliff. Hopefully this limitation will go away in future versions of Julia.","category":"page"},{"location":"","page":"Interface","title":"Interface","text":"Modules = [AudioSchedules]","category":"page"},{"location":"","page":"Interface","title":"Interface","text":"Modules = [AudioSchedules]","category":"page"},{"location":"#AudioSchedules.AudioSchedule-Tuple{Plan}","page":"Interface","title":"AudioSchedules.AudioSchedule","text":"AudioSchedule(plan::Plan)\n\nReturn a SampledSource from a Plan.\n\njulia> using AudioSchedules\n\n\njulia> using Unitful: s, Hz\n\n\njulia> plan = Plan(44100Hz);\n\n\njulia> add!(plan, Map(sin, Cycles(440Hz)), 0s, 0, Line => 1s, 1, Line => 1s, 0)\n\n\njulia> a_schedule = AudioSchedule(plan);\n\n\nYou can find the number of samples in an AudioSchedule with length.\n\njulia> the_length = length(a_schedule)\n88200\n\nYou can use the schedule as a source for samples.\n\njulia> read(a_schedule, the_length);\n\n\n\n\n\n","category":"method"},{"location":"#AudioSchedules.Cycles","page":"Interface","title":"AudioSchedules.Cycles","text":"Cycles(frequency)\n\nCycles from 0 to 2π to repeat at a frequency (with frequency units, like Hz). Supports make_iterator.\n\njulia> using AudioSchedules\n\n\njulia> using Unitful: Hz\n\n\njulia> first(make_iterator(Cycles(440Hz), 44100Hz))\n0.0\n\n\n\n\n\n","category":"type"},{"location":"#AudioSchedules.Grow","page":"Interface","title":"AudioSchedules.Grow","text":"Grow(start_level, rate)\n\nExponentially grow or decay from start_level (unitless), at a continuous rate (with units per time like 1/s). Supports make_iterator and segments.\n\njulia> using AudioSchedules\n\n\njulia> using Unitful: Hz, s\n\n\njulia> first(make_iterator(Grow(1, 1 / s), 44100Hz))\n1.0\n\n\n\n\n\n","category":"type"},{"location":"#AudioSchedules.Hook","page":"Interface","title":"AudioSchedules.Hook","text":"Hook(rate, slope)\n\nMake a hook shape, with an exponential curve growing at a continuous rate (with units per time like 1/s), followed by a line with slope (with units per time like  1/s). Use with add!. Supports segments. Not all hooks are solvable.\n\njulia> using AudioSchedules\n\n\njulia> using Unitful: Hz, s\n\n\njulia> plan = Plan(44100Hz);\n\n\njulia> add!(plan, Map(sin, Cycles(440Hz)), 0s, 1, Hook(1 / s, 1 / s) => 2s, ℯ + 1)\n\njulia> add!(plan, Map(sin, Cycles(440Hz)), 0s, 1, Hook(1 / s, 1 / s) => 2s, 0)\nERROR: Unsolvable hook\n[...]\n\n\n\n\n\n","category":"type"},{"location":"#AudioSchedules.Line","page":"Interface","title":"AudioSchedules.Line","text":"Line(start_level, slope)\n\nA line from start_level (unitless) with slope (with units per time like 1/s). Supports make_iterator and segments.\n\njulia> using AudioSchedules\n\n\njulia> using Unitful: Hz, s\n\n\njulia> first(make_iterator(Line(0, 1 / s), 44100Hz))\n0.0\n\n\n\n\n\n","category":"type"},{"location":"#AudioSchedules.Map","page":"Interface","title":"AudioSchedules.Map","text":"Map(a_function, synthesizers...)\n\nMap a_function over synthesizers. Supports make_iterator.\n\njulia> using AudioSchedules\n\n\njulia> using Unitful: Hz\n\n\njulia> first(make_iterator(Map(sin, Cycles(440Hz)), 44100Hz))\n0.0\n\n\n\n\n\n","category":"type"},{"location":"#AudioSchedules.Plan","page":"Interface","title":"AudioSchedules.Plan","text":"Plan(sample_rate)\n\nCreate an empty plan for an audio schedule. Use add! to add new synthesizers for plan. Specify a sample_rate with units per time, like 1/s.\n\njulia> using AudioSchedules\n\n\njulia> using Unitful: Hz\n\n\njulia> Plan(44100Hz);\n\n\n\n\n\n","category":"type"},{"location":"#AudioSchedules.SawTooth-Tuple{Any}","page":"Interface","title":"AudioSchedules.SawTooth","text":"SawTooth(overtones)\n\nBuild a saw-tooth wave from its partials, starting with the fundamental (1), up to overtones.\n\nTo increase richness but also buziness, increase overtones.\n\njulia> using AudioSchedules\n\n\njulia> SawTooth(3)(π / 4)\n1.4428090415820634\n\n\n\n\n\n","category":"method"},{"location":"#AudioSchedules.Scale","page":"Interface","title":"AudioSchedules.Scale","text":"function Scale(ratio)\n\nA simple wrapper that will multiply inputs by the ratio.\n\njulia> using AudioSchedules\n\n\njulia> Scale(3)(2)\n6\n\n\n\n\n\n","category":"type"},{"location":"#AudioSchedules.add!-Tuple{Any,Any,Any}","page":"Interface","title":"AudioSchedules.add!","text":"add!(plan::Plan, synthesizer, start_time)\n\nAdd a synthesizer to the plan, where synthesizer must support make_iterator and get_duration.\n\njulia> using AudioSchedules\n\n\njulia> using FileIO: load\n\n\njulia> using LibSndFile: LibSndFile\n\njulia> using Unitful: Hz, s\n\n\njulia> cd(joinpath(pkgdir(AudioSchedules), \"test\"))\n\njulia> plan = Plan(44100Hz);\n\njulia> add!(plan, load(\"clunk.wav\"), 0s)\n\njulia> schedule = AudioSchedule(plan);\n\njulia> read(schedule, length(schedule));\n\n\n\n\n\n","category":"method"},{"location":"#AudioSchedules.add!-Tuple{Plan,Any,Any,Any,Vararg{Any,N} where N}","page":"Interface","title":"AudioSchedules.add!","text":"add!(plan::Plan, synthesizer, start_time,\n    start_level, shape => duration, end_level, more_segments...\n)\n\nAdd a synthesizer to a Plan, where synthesizer is anything that supports make_iterator, start_time has units of time (like s), and rest of the arguments specify the shape of the envelope.\n\nFor all envelope segments, call\n\nsegments(shape, start_level, duration, end_level)\n\nduration should have units of time (like s). For example,\n\nadd!(plan, synthesizer, start_time, 0, Line => 1s, 1, Line => 1s, 0)\n\nwill call segments twice:\n\nsegments(Line, 0, 1s, 1)\nsegments(Line, 1, 1s, 0)\n\njulia> using AudioSchedules\n\n\njulia> using Unitful: Hz, s\n\n\njulia> plan = Plan(44100Hz);\n\n\njulia> add!(plan, Map(sin, Cycles(440Hz)), 0s, 0, Line => 1s, 1, Line => 1s, 0)\n\n\njulia> collect(keys(plan.triggers)) == [0.0s, 1.0s, 2.0s]\ntrue\n\njulia> AudioSchedule(Plan(44100Hz))\nERROR: ArgumentError: AudioSchedules require at least one synthesizer\n[...]\n\n\n\n\n\n","category":"method"},{"location":"#AudioSchedules.equal_loudness-Tuple{Map{var\"#s65\",Tuple{Cycles}} where var\"#s65\"}","page":"Interface","title":"AudioSchedules.equal_loudness","text":"equal_loudness(synthesizer::Map{<:Any, Tuple{Cycles}})\n\nChange the volume of a synthesizer so that sounds played at different frequencies will have the same perceived volume. Assumes that the map function has a period of 2π.\n\njulia> using AudioSchedules\n\n\njulia> using Unitful: Hz\n\n\njulia> soft = equal_loudness(Map(cos, Cycles(10000Hz)));\n\n\njulia> first(make_iterator(soft, 44100Hz)) ≈ 0.0053035474\ntrue\n\nTechnical details: uses the ISO 226:2003 curve for 40 phons. Scales output by a ratio of the equivalent sound pressure at the current frequency to the equivalent sound pressure at 20Hz (about as low as humans can hear).\n\n\n\n\n\n","category":"method"},{"location":"#AudioSchedules.get_duration-Tuple{SampledSignals.SampleBuf}","page":"Interface","title":"AudioSchedules.get_duration","text":"get_duration(synthesizer)\n\nGet the duration of a synthesizer (with units of time, like s), for synthesizers with an inherent length.\n\njulia> using AudioSchedules\n\n\njulia> using FileIO: load\n\n\njulia> using LibSndFile: LibSndFile\n\n\njulia> cd(joinpath(pkgdir(AudioSchedules), \"test\"))\n\n\njulia> get_duration(load(\"clunk.wav\"))\n0.351859410430839 s\n\n\n\n\n\n","category":"method"},{"location":"#AudioSchedules.make_iterator-Tuple{SampledSignals.SampleBuf,Any}","page":"Interface","title":"AudioSchedules.make_iterator","text":"make_iterator(synthesizer, sample_rate)\n\nReturn an iterator that will the play the synthesizer at sample_rate (with frequency units, like Hz). The iterator should yield ratios between -1 and 1. Assumes that iterators will never end while they are scheduled. In addition to supporting iterate, iterators should also support AudioSchedules.preview and AudioSchedules.skip, and iteration  should have no side effects.\n\njulia> using AudioSchedules\n\n\njulia> using Unitful: Hz\n\n\njulia> using FileIO: load\n\n\njulia> using LibSndFile: LibSndFile\n\n\njulia> cd(joinpath(pkgdir(AudioSchedules), \"test\"))\n\n\njulia> first(make_iterator(load(\"clunk.wav\"), 44100Hz))\n0.00168Q0f15\n\njulia> make_iterator(load(\"clunk.wav\"), 48000Hz)\nERROR: ArgumentError: Sample rate mismatch\n[...]\n\n\n\n\n\n","category":"method"},{"location":"#AudioSchedules.preview-Tuple{Array,Any,Any}","page":"Interface","title":"AudioSchedules.preview","text":"preview(iterator, state, ahead)\n\nahead = 1 is equivalent to getting the item from iterate(iterator, state). Increasing ahead by 1 will be as if you iterated and then discarded.\n\n\n\n\n\n","category":"method"},{"location":"#AudioSchedules.seek_peak-Tuple{AudioSchedule}","page":"Interface","title":"AudioSchedules.seek_peak","text":"seek_peek(a_schedule::AudioSchedule)\n\nFind the maximum absolute amplitude in an AudioSchedule.\n\njulia> using AudioSchedules\n\n\njulia> using Unitful: Hz, s\n\n\njulia> plan = Plan(44100Hz);\n\n\njulia> add!(plan, Map(sin, Cycles(440Hz)), 0s, 0, Line => 1s, 1, Line => 1s, 0)\n\n\njulia> seek_peak(AudioSchedule(plan))\n0.9994267666261519\n\n\n\n\n\n","category":"method"},{"location":"#AudioSchedules.segments-Tuple{Type{Line},Any,Any,Any}","page":"Interface","title":"AudioSchedules.segments","text":"segments(shape, start_level, duration, end_level)\n\nCalled by envelope. Return a tuple of pairs in the form (segment, duration), where duration has units of time (like s), with a segment of shape shape.\n\njulia> using AudioSchedules\n\n\njulia> using Unitful: s\n\n\njulia> segments(Grow, 1, 1s, ℯ)\n((Grow(1.0, 1.0 s^-1), 1 s),)\n\n\n\n\n\n","category":"method"},{"location":"#AudioSchedules.skip-Tuple{Array,Any,Any}","page":"Interface","title":"AudioSchedules.skip","text":"skip(iterator, state, ahead)\n\nahead = 1 is equivalent to getting the new state from iterate(iterator, state). Increasing ahead by 1 will be as if you iterated and then discarded.\n\n\n\n\n\n","category":"method"},{"location":"#Base.map-Union{Tuple{Iterator}, Tuple{AFunction}, Tuple{AFunction,AudioSchedule{Iterator}}} where Iterator where AFunction","page":"Interface","title":"Base.map","text":"map(a_function, schedule::AudioSchedule)\n\nMap a function over all of the synthesizers in the schedule.\n\njulia> using AudioSchedules\n\n\njulia> using Unitful: Hz, s\n\n\njulia> plan = Plan(44100Hz);\n\n\njulia> add!(plan, Map(sin, Cycles(440Hz)), 0s, 0, Line => 1s, 1, Line => 1s, 0)\n\n\njulia> schedule = AudioSchedule(plan);\n\n\njulia> seek_peak(map(Scale(2), schedule))\n1.9988535332523039\n\n\n\n\n\n","category":"method"},{"location":"#AudioSchedules.@q_str-Tuple{AbstractString}","page":"Interface","title":"AudioSchedules.@q_str","text":"q\"interval\"\n\nCreate a musical interval. You can specify a numerator (which defaults to 1) and denominator (which defaults to 1) and an octave shift (which defaults to 0).\n\njulia> using AudioSchedules\n\n\njulia> q\"1\"\n1//1\n\njulia> q\"3/2\"\n3//2\n\njulia> q\"2/3o1\"\n4//3\n\njulia> q\"2/3o-1\"\n1//3\n\njulia> q\"o2\"\n4//1\n\njulia> q\"1 + 1\"\nERROR: LoadError: Base.Meta.ParseError(\"Can't parse interval 1 + 1\")\n[...]\n\n\n\n\n\n","category":"macro"}]
}
