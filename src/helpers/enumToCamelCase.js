function formatEnum(input) {
    // Check if input is a valid string
    if (typeof input !== 'string') {
        return '';
    }

    // Replace underscores with spaces, capitalize the first letter, and leave the rest in lowercase
    const replacedText = input.replace(/_/g, ' ');
    return replacedText.charAt(0).toUpperCase() + replacedText.slice(1).toLowerCase();
}

export default formatEnum;