var grammarService = {
    get: {
        tobe: {
            bySubject(subject) {
                if (subject === SUBJECT_CONST.I) {
                    return TOBE_CONST.AM;
                }
                else if (subject === SUBJECT_CONST.He || subject === SUBJECT_CONST.SHE || subject === SUBJECT_CONST.IT) {
                    return TOBE_CONST.IS;
                }
                else if (subject === SUBJECT_CONST.WE || subject === SUBJECT_CONST.YOU || subject === SUBJECT_CONST.THEY) {
                    return TOBE_CONST.ARE;
                }
                return "";
            },
            byAmount(amount) {
                if (amount === 1) {
                    return TOBE_CONST.IS;
                }
                else if (amount > 1) {
                    return TOBE_CONST.ARE;
                }
                return "";
            },
            byArticles(word) {
                var firstCharacter = word.substring(0, 1).toLowerCase();
                if (firstCharacter === VOWELS_CONST.U || firstCharacter === VOWELS_CONST.E || firstCharacter === VOWELS_CONST.A || firstCharacter === VOWELS_CONST.O || firstCharacter === VOWELS_CONST.I) {
                    return ARTICLE_CONST.AN;
                }
                else {
                    return ARTICLE_CONST.A;
                }
            },
            addTail(amount) {
                if (amount > 1) {
                    return "s";
                }
                return "";
            }
        },
        sentence: {
            what(name) {
                name = name.toLowerCase();
                return "It's " + grammarService.get.tobe.byArticles(name).toLowerCase() + " " + name;
            },
            favorite(name, type) {
                name = name.toLowerCase();
                return "My favorite " + type + " " + grammarService.get.tobe.byAmount(1) + " " + name;
            },
            howMuch(name, amount) {
                name = name.toLowerCase();
                return grammarService.get.tobe.byArticles(name) + " " + name + " costs " + amount + " dollar" + grammarService.get.tobe.addTail(amount);
            },
            howMany(name, amount) {
                name = name.toLowerCase();
                return "There " + grammarService.get.tobe.byAmount(amount) + " " + amount + name;
            }
        }
    }
}