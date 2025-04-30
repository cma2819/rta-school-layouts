import got from 'got';
const BASE_URL = 'https://horaro.org/-/api/v1';
/**
 * Fetches a specific schedule by ID or slug.
 * @param {string} event - The ID or slug of the event.
 * @param {string} idOrSlug - The ID or slug of the schedule.
 * @returns {Promise<Schedule>} - The response containing the schedule details.
 */
export async function fetchScheduleByIdOrSlug(event, idOrSlug) {
    const url = `${BASE_URL}/events/${event}/schedules/${idOrSlug}`;
    return got(url).json();
}
