import {
    useEffect,
    useState
} from "react";

// Returns `value` only after it has stopped changing for `delay` ms, so a
// search box does not fire a request on every keystroke.
function useDebouncedValue(
    value,
    delay = 300
) {

    const [debounced, setDebounced] =
        useState(value);

    useEffect(() => {

        const timeoutId =
            setTimeout(
                () => setDebounced(value),
                delay
            );

        return () => clearTimeout(timeoutId);

    }, [value, delay]);

    return debounced;
}

export default useDebouncedValue;
