export class APIError
{
    Message : string;
    ErrorMsg : string;
    RequestMethod : string;
    RequestUri : string;
    TimeUtc? : Date
}