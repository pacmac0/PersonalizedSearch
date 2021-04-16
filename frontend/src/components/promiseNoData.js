import Spinner from 'react-bootstrap/Spinner';

/**
 * Returns loading spinner when promise is pending or false when it is resolved.
 * @param {Promise} promise 
 * @param {Object|Array} data 
 * @param {Object} error 
 * @returns 
 */
function promiseNoData(promise, data = null, error = null) {
    if (!promise) {
        return <span>no data</span>;
    }
    if (Array.isArray(data) && data.length === 0) {
        return <span>no results</span>;
    }
    if (!data && !error) {
        return (
            <Spinner animation="border" role="status">
                <span className="sr-only">Loading...</span>
            </Spinner>
        );
    }
    if (error) {
        return <span>{error}</span>;
    }
    return false;
}

export default promiseNoData;