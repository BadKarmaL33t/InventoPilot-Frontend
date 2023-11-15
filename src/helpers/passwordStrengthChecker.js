function passwordStrengthChecker(v) {
    const strongRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[^A-Za-z0-9';<>&|/\\]).{12,24}$/;
    const mediumRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[^A-Za-z0-9';<>&|/\\]).{10,24}$/;

    if (strongRegex.test(v)) {
        return "Strong";
    } else if (mediumRegex.test(v)) {
        return "Average";
    } else {
        return "Weak";
    }
}

export default passwordStrengthChecker;