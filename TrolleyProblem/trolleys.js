var productions = {
    "S": [["You see a trolley rushing towards ", "SOMETHING", ". Do you instead pull the lever in front of you, which redirects the trolley towards ", "SOMETHING", "?"]],
    "SOMETHING": [
        ["an empty track with nothing tied to it"],
        ["ANYTHING", " and ", "ANYTHING"],
        ["THING"],
        ["PERSON"],
        ["PERSON", " clutching ", "THING"],
        ["PERSONFROMSOMEWHERE"],
        ["PERSONFROMSOMEWHERE", " clutching ", "THING"],
        ["SPECIFIC_PERSON"]
    ],
    "ANYTHING": [
      ["THING"],
      ["PERSON"],
      ["SPECIFIC_PERSON"],
      ["PERSONFROMSOMEWHERE"]
    ],
    "THING": [
        ["a slip of paper containing the login information to Jeff Bezos's brokerage account"],
        ["the only copy of a book that explains how to correctly resolve all trolley problems"],
        ["the only existing copy of a formula to a vaccine that's 100% effective against all types of cancer"],
        ["an exact molecular-level copy of the Mona Lisa"],
        ["the only existing copy of Kant's \"Groundwork of the Metaphysic of Morals\""],
        ["the only existing copy of Bentham's \"The Principles of Morals and Legislation\""],
        ["the only existing copy of the Bible"],
        ["the only existing copy of \"The Great Gatsby\" by F. Scott Fitzgerald"],
        ["the only existing copy of the entire works of Shakespeare (you cannot use monkeys and typewriters to reproduce it)"],
        ["the only existing copy of a formula that grants immortality"],
        ["the only existing copy of the design for a machine that can artificially induce perfect happiness"],
        ["the only existing copy of a definitive proof of the existence of God"],
        ["the only existing copy of a definitive proof of the inexistence of God"],
        ["the only existing copy of definitive evidence that Epstein didn't kill himself"],
        ["the unique device that permits you to unerringly perceive the precise nature of entities potentially imperiled by trolleys"],
        ["the only existing copy of the ultimate question to the ultimate answer to life, the universe, and everything"],
        ["a million dollars in cash"]
    ],
    "PERSONFROMSOMEWHERE": [
        ["an Ohioan"],
        ["a Floridian"],
        ["a British person"],
        ["a Californian"],
        ["an American"],
        ["a French person"],
        ["a Russian person"],
        ["a Nevadan person"],
        ["a Canadian"],
        ["a Mexican person"],
        ["a Nicaraguan"],
        ["a Brazilian"],
        ["a Hawai'ian"],
        ["a Chinese person"],
        ["a Japanese person"],
        ["a Kazakh"],
        ["a German person"],
        ["a Scandanavian person"]
    ],
    "PERSON": [
        ["a random person"],
        ["a newborn baby"],
        ["a rail worker"],
        ["five rail workers"],
        ["a murderer"],
        ["a rapist"],
        ["a clone of Hitler"],
        ["an overweight person"],
        ["a homeless person"],
        ["a utilitarian"],
        ["a virtue ethicist"],
        ["a nihilist"],
        ["a person sexually aroused by the idea of being killed by a trolley"],
        ["a clone of yourself"],
        ["a kitten"],
        ["a Wall Street executive"],
        ["a person who earlier flipped another lever preventing the trolley from hitting ", "ANYTHING"]
    ],
    "SPECIFIC_PERSON": [
        ["yourself"],
        ["your mother"],
        ["your father"],
        ["a sentient trolley with feelings and a complex and beautiful inner life"],
        ["a sentient trolley with an unstillable desire to kill"],
        ["your long-lost identical twin who was separated from you at birth"],
        ["your favorite teacher from high school"],
        ["your least favorite teacher from high school"],
        ["Hitler"],
        ["Stalin"],
        ["Borat"],
        ["Barack Obama"],
        ["Al Gore"],
        ["Richard Nixon"],
        ["Ronald Reagan"],
        ["Kanye West"],
        ["Bernie Sanders"],
        ["the inventor of coleslaw"],
        ["Elon Musk"],
        ["the author of this generative grammar for trolley problems"],
        ["your ex"],
        ["a version of you that happened to make all the right decisions in their life"],
        ["Immanuel Kant"],
        ["Friedrich Nietzsche"],
        ["a cryogenically frozen person who may or may not be sentient"],
        ["the trolley safety inspector whose inattention to detail caused the runaway trolley"],
        ["the trolley safety inspector whose inattention to detail - caused by grief over the recent death of his wife - caused the runaway trolley"],
        ["the trolley manufacturer executive who decided to, as a cost-cutting measure, leave out safety interlocks that would have prevented this runaway trolley"],
        ["Nizzagrallaaf, a malicious imp that causes runaway trolleys"],
        ["the villain who set the trolley in motion with murderous intent"]
    ]
};

function initial_state() {
    return {"output": ["S"], "used_productions": []};
}

function pick(values) {
    return values[Math.floor(Math.random() * values.length)];
}

function produce(state) {
    for (var i = 0; i < state.output.length; i++) {
        if (productions[state.output[i]]) {
            var choice = null;
            while (!choice || state.used_productions.indexOf(choice) != -1) {
                choice = pick(productions[state.output[i]]);
            }
            state.output = state.output.slice(0, i).concat(choice).concat(state.output.slice(i + 1));
            state.used_productions.push(choice);
            return true;
        }
    }
    return false;
}

function generate() {
    var state = initial_state();
    while (produce(state));
    return state.output.join("");
}

function trolley(element_id) {
    document.getElementById(element_id).innerHTML = generate();
}
