const sortEntity = (data, sortBy) => {
    return [...data].sort((a, b) => {
        const valueA = a[sortBy];
        const valueB = b[sortBy];

        // Handle different types of values
        if (valueA === valueB) {
            return 0;
        }

        if (typeof valueA === 'string' && typeof valueB === 'string') {
            return valueA.localeCompare(valueB);
        }

        return valueA < valueB ? -1 : 1;
    });
};

export default sortEntity;