export type HttpExceptionResponse = {
  statusCode: number;
  message: string | string[];
  error: string;
};

export function isHttpExceptionResponse(obj: unknown): obj is HttpExceptionResponse {
  return (
    typeof obj === 'object'
    && obj !== null
    && 'statusCode' in obj
    && 'message' in obj
    && 'error' in obj
  );
}
