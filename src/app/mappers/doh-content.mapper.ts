import { DOHContent } from '../interfaces/doh';

export const getDateFromDOHContent = (content: DOHContent) =>
    new Date(content.headerPanel.title.split('as of')[1].split(';')[0]);