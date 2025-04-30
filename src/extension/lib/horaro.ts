import got from 'got';

const BASE_URL = 'https://horaro.org/-/api/v1';

type HoraroResponse<D> = {
  data: D;
};

type Schedule = {
  id: string;
  name: string;
  slug: string;
  columns: string[];
  items: ScheduleItem[];
};

type ScheduleItem = {
  length_t: number;
  data: string[];
};

/**
 * Fetches a specific schedule by ID or slug.
 * @param {string} event - The ID or slug of the event.
 * @param {string} idOrSlug - The ID or slug of the schedule.
 * @returns {Promise<HoraroResponse<Schedule>>} - The response containing the schedule details.
 */
export async function fetchScheduleByIdOrSlug(
  event: string,
  idOrSlug: string,
): Promise<HoraroResponse<Schedule>> {
  const url = `${BASE_URL}/events/${event}/schedules/${idOrSlug}`;
  return got(url).json();
}
