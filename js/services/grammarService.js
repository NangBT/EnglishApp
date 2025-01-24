const grammarService = {
    is: {
        existed(word, collections) {
            let index = collections.findIndex(e => e === word);
            return (index > -1);
        },
        vowel(word) {
            let firstCharacterFromLast = word.substring(word - 1, 1).toLowerCase();
            const vowelCollections = [VOWELS_CONST.U, VOWELS_CONST.E, VOWELS_CONST.O, VOWELS_CONST.A, VOWELS_CONST.I];
            return grammarService.is.existed(firstCharacterFromLast, vowelCollections);
        },
        thirdPersonSingular(subject) {
            const collections = [SUBJECT_CONST.HE, SUBJECT_CONST.SHE, SUBJECT_CONST.IT];
            return grammarService.is.existed(subject, collections);
        },
        sameBothSingularPlural(word) {
            const collections = ["deer", "sheep", "clownfish", "fish", "series", "species", "cut", "put", "hit", "read", "run", "aircraft", "moose"];
            return grammarService.is.existed(word, collections);
        }
    },
    add: {
        tail(info) {
            let isAdd = false;
            if (grammarService.is.sameBothSingularPlural(info.name)) {
                return info.name;
            }
            else if (grammarService.is.thirdPersonSingular(info.subject)) {
                isAdd = true;
            }
            else if (info.amount > 1) {
                isAdd = true;
            }

            if (isAdd === true) {
                info.name = info.name.toLowerCase();
                let arr = info.name.split('');
                let firstCharacterFromLast = arr[arr.length - 1];
                let secondCharacterFromLast = arr[arr.length - 2];
                let twoLastCharacter = secondCharacterFromLast + firstCharacterFromLast;
                let twoLastCharacterArr = ["ss", "sh", "ch"];
                if (twoLastCharacterArr.find(e => e === twoLastCharacter)) {
                    return info.name + TAIL_S_OR_ES_CONST.ES;
                }
                else {
                    let oneLastCharacterArr = ["s", "z", "x"];
                    if (oneLastCharacterArr.find(e => e === firstCharacterFromLast)) {
                        if (info.name === "ox") {
                            return "oxen";
                        }
                        return info.name + TAIL_S_OR_ES_CONST.ES;
                    }
                    else {
                        let isVowel = grammarService.is.vowel(twoLastCharacter);
                        if (firstCharacterFromLast === VOWELS_CONST.O) {
                            if (!isVowel) {
                                if (info.name === 'avocado') {
                                    return info.name + TAIL_S_OR_ES_CONST.S;
                                }
                                return info.name + TAIL_S_OR_ES_CONST.ES;
                            }
                        }
                        else if (firstCharacterFromLast === "y") {
                            if (!isVowel) {
                                return info.name.substring(0, info.name.length - 1) + "i" + TAIL_S_OR_ES_CONST.ES;
                            }
                        }
                        else if (firstCharacterFromLast === "f" || twoLastCharacter === "fe") {
                            const exceptionCollections = ["calf", "half", "knife", "loaf", "leaf", "life", "self", "thief", "wife", "wolf"];
                            if (grammarService.is.existed(info.name, exceptionCollections)) {
                                if (firstCharacterFromLast === "f") {
                                    return info.name.substring(0, info.name.length - 1) + "v" + TAIL_S_OR_ES_CONST.ES;
                                }
                                else {
                                    return info.name.substring(0, info.name.length - 2) + "v" + TAIL_S_OR_ES_CONST.ES;
                                }
                            }
                        }
                        return info.name + TAIL_S_OR_ES_CONST.S;
                    }
                }
            }
            return info.name;
        },
    },
    get: {
        tobeVerb: {
            bySubject(subject) {
                if (subject === SUBJECT_CONST.I) {
                    return TOBE_CONST.AM;
                }
                else if (subject === SUBJECT_CONST.HE || subject === SUBJECT_CONST.SHE || subject === SUBJECT_CONST.IT) {
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
            }
        },
        articles: {
            byWord(word) {
                let isVowel = grammarService.is.vowel(word);
                if (isVowel) {
                    return ARTICLE_CONST.AN;
                }
                else {
                    return ARTICLE_CONST.A;
                }
            },
            byAmount(info) {
                if (info.amount === 1) {
                    return grammarService.get.articles.byWord(info.name);
                }
                else {
                    return info.amount;
                }
            }
        },
        sentence: {
            what(name) {
                let result = grammarService.get.articles.byWord(name).toLowerCase() + " " + name;
                return "It's " + result.toLocaleLowerCase();
            },
            favorite(info) {
                let name = info.name.toLowerCase();
                let result = info.typeName + " " + grammarService.get.tobeVerb.byAmount(info.amount) + " " + grammarService.get.articles.byWord(name) + " " + name;
                return "My favorite " + result.toLocaleLowerCase();
            },
            howMuch(info) {
                let name = info.name.toLowerCase();
                // Ex1: One apple costs one dollar
                // Ex2: One apple costs two dollars
                // Ex3: Two apples cost one dollar
                // Ex4: Two apples cost two dollars

                let amountInfo = { name: name, amount: info.amount };
                let sentence = grammarService.get.articles.byAmount(amountInfo) + " ";

                let amountTailInfo = { subject: "", name: name, amount: info.amount };
                sentence += grammarService.add.tail(amountTailInfo) + " ";

                let costTailInfo = { subject: '', name: "cost", amount: ((info.amount > 1) ? 0 : 1) };
                sentence += grammarService.add.tail(costTailInfo) + " ";

                sentence += info.amount + " ";

                let dollarTailInfo = { subject: "", name: "dollar", amount: info.amount };
                sentence += grammarService.add.tail(dollarTailInfo);
                return sentence;
                //return grammarService.get.articles.byAmount(amountInfo) + " " + grammarService.add.tail(amountTailInfo) + " " + grammarService.add.tail(costTailInfo) + " " + info.amount + " " + grammarService.add.tail(dollarTailInfo);
            },
            howMany(name, amount, sentenceType) {
                name = name.toLowerCase();
                let costTailInfo = { subject: (info.amount === 1) ? SUBJECT_CONST.IT : "", name: "cost", amount: info.amount };
                if (sentenceType === 1) { // There are two frogs
                    return "There " + grammarService.get.tobeVerb.byAmount(amount) + " " + amount + grammarService.add.tail(costTailInfo);
                }
                else if (sentenceType === 2) { // I have three frogs
                    return "I have " + amount + " " + grammarService.add.tail(costTailInfo);
                }
                else if (sentenceType === 3) {// I have three frogs
                    return "I don't have any " + grammarService.add.tail(costTailInfo);
                }
            }
        }
    }
}